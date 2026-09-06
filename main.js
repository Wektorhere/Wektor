const { app, BrowserWindow, ipcMain, Tray, Menu, Notification, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// ---------------------------------------------------------------------------
// Single-instance lock — must be the very first thing that runs, before any
// other app setup. Without this, launching Wektor twice spawns two Python
// engines that both try to bind port 5005; killProcessOnPort() below would
// then kill whichever one got there first, effectively breaking the
// legitimate already-running instance. If this process didn't get the lock,
// another instance is already running — quit immediately and let that one
// keep the window/engine it already has.
const gotSingleInstanceLock = app.requestSingleInstanceLock();
if (!gotSingleInstanceLock) {
  app.quit();
}

let pythonProcess = null;
let localAuthToken = null;
let mainWindow = null;
let tray = null;
let isQuitting = false;
let pendingDailyWatchUpdate = null;

// Background-mode settings persist across restarts (separate from the
// Daily Watch config itself, which lives in Python's daily_watch.py —
// this file just tracks "should the app keep running when closed" and
// "did we already run today's scheduled check".
function backgroundSettingsPath() {
  return path.join(app.getPath('userData'), 'wektor-background-settings.json');
}

function loadBackgroundSettings() {
  try {
    return JSON.parse(fs.readFileSync(backgroundSettingsPath(), 'utf8'));
  } catch (e) {
    return { backgroundEnabled: false, lastAutoCheckDate: null };
  }
}

function saveBackgroundSettings(settings) {
  try {
    fs.writeFileSync(backgroundSettingsPath(), JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save background settings:', e);
  }
}

let backgroundSettings = { backgroundEnabled: false, lastAutoCheckDate: null };

function startPythonEngine() {
  if (pythonProcess) {
    return;
  }

  const isDev = !app.isPackaged;
  let command;
  let args;
  let cwd;

  if (isDev) {
    // Development: run straight from source with the system's Python.
    // Requires `pip install -r requirements.txt` locally.
    command = 'python';
    args = ['-u', 'engine.py'];
    cwd = __dirname;
  } else {
    // Production: run the PyInstaller-bundled binary — end users never
    // need Python installed at all. electron-builder's `extraResources`
    // config copies the compiled binary (plus its sibling .env) into
    // resources/engine/ at package time; see package.json's build block.
    const engineDir = path.join(process.resourcesPath, 'engine');
    const binaryName = process.platform === 'win32' ? 'wektor-engine.exe' : 'wektor-engine';
    command = path.join(engineDir, binaryName);
    args = [];
    cwd = engineDir;
  }

  pythonProcess = spawn(command, args, {
    cwd,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONUTF8: '1' }
  });

  pythonProcess.on('error', (err) => {
    console.error(`Failed to start engine process (${command}): ${err.message}`);
    pythonProcess = null;
    localAuthToken = null;
  });

  // Capture LOCAL_AUTH_TOKEN from engine stdout
  pythonProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`Engine: ${output}`);
    
    // Check if output contains LOCAL_AUTH_TOKEN
    if (output.includes('LOCAL_AUTH_TOKEN=')) {
      const match = output.match(/LOCAL_AUTH_TOKEN=([^\s]+)/);
      if (match && match[1]) {
        localAuthToken = match[1].trim();
        console.log('Successfully captured local auth token');
      }
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Engine Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Engine process exited with code ${code}`);
    pythonProcess = null;
    localAuthToken = null;
  });
}

// IPC handler to get auth token for renderer process
ipcMain.handle('get-local-auth-token', () => {
  return localAuthToken;
});

// ---------------------------------------------------------------------------
// Daily Watch — background scheduler + native notifications.
// The Python engine (spawned above) is kept alive independent of the
// window per the existing app.whenReady()/will-quit lifecycle, so it's
// still reachable over HTTP even when backgroundEnabled has hidden the
// window instead of closing it.
// ---------------------------------------------------------------------------
async function runDailyWatchCheckNow() {
  if (!localAuthToken) {
    throw new Error('Local engine is not ready yet — try again in a few seconds.');
  }
  const res = await fetch('http://127.0.0.1:5005/api/daily-watch/check', {
    method: 'POST',
    headers: { 'X-Local-Auth-Token': localAuthToken }
  });
  return await res.json();
}

function notifyDailyWatchResult(result) {
  if (!result || result.error) return;
  pendingDailyWatchUpdate = result;

  if (result.changed && Notification.isSupported()) {
    const notification = new Notification({
      title: `📊 Wektor — ${result.label || 'Daily Watch'}`,
      body: (result.summaryPoints || []).slice(0, 2).join('\n') || 'Your watched data changed.'
    });
    notification.on('click', () => showMainWindow());
    notification.show();
  }

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('daily-watch-update', result);
  }
}

async function maybeRunScheduledCheck() {
  if (!localAuthToken) return;
  try {
    const statusRes = await fetch('http://127.0.0.1:5005/api/daily-watch/status', {
      headers: { 'X-Local-Auth-Token': localAuthToken }
    });
    const status = await statusRes.json();
    const config = status.config;
    if (!config || !config.enabled) return;

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    if (backgroundSettings.lastAutoCheckDate === todayStr) return; // already ran today
    if (now.getHours() < (config.checkHour ?? 9)) return; // not time yet

    const result = await runDailyWatchCheckNow();
    backgroundSettings.lastAutoCheckDate = todayStr;
    saveBackgroundSettings(backgroundSettings);
    notifyDailyWatchResult(result);
  } catch (e) {
    console.error('Scheduled Daily Watch check failed:', e);
  }
}

function showMainWindow() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
}

function createTray() {
  try {
    tray = new Tray(path.join(__dirname, 'icon.png'));
  } catch (e) {
    console.error('Tray icon failed to load (icon.png missing/invalid) — background mode still works, just without a tray icon:', e);
    return;
  }
  tray.setToolTip('Wektor — running in background');
  const rebuildMenu = () => {
    tray.setContextMenu(Menu.buildFromTemplate([
      { label: 'Open Wektor', click: showMainWindow },
      {
        label: 'Check Daily Watch Now', click: async () => {
          try {
            notifyDailyWatchResult(await runDailyWatchCheckNow());
          } catch (e) {
            console.error('Manual Daily Watch check failed:', e);
          }
        }
      },
      { type: 'separator' },
      {
        label: 'Quit Wektor', click: () => {
          isQuitting = true;
          app.quit();
        }
      }
    ]));
  };
  rebuildMenu();
  tray.on('click', showMainWindow);
}

ipcMain.handle('trigger-daily-check-now', async () => {
  try {
    const result = await runDailyWatchCheckNow();
    notifyDailyWatchResult(result);
    return result;
  } catch (e) {
    return { error: e.message };
  }
});

ipcMain.handle('get-daily-watch-pending', () => {
  const pending = pendingDailyWatchUpdate;
  pendingDailyWatchUpdate = null;
  return pending;
});

ipcMain.handle('get-background-enabled', () => backgroundSettings.backgroundEnabled === true);

ipcMain.handle('set-background-enabled', (event, enabled) => {
  backgroundSettings.backgroundEnabled = !!enabled;
  saveBackgroundSettings(backgroundSettings);
  if (backgroundSettings.backgroundEnabled && !tray) {
    createTray();
  } else if (!backgroundSettings.backgroundEnabled && tray) {
    tray.destroy();
    tray = null;
  }
  return backgroundSettings.backgroundEnabled;
});

function createWindow() {
  // Hard lock DevTools in production
  const isDev = !app.isPackaged;
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 1080,
    minHeight: 720,
    title: 'Wektor',
    backgroundColor: '#0A0A0A',
    icon: path.join(__dirname, 'icon.png'),
    frame: true,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      devTools: isDev // Force devTools only in development
    }
  });

  // Any link the renderer tries to open in a new window/tab (e.g. "Get an
  // OpenRouter key" pointing at openrouter.ai/keys) should open in the
  // user's real OS browser, not inside this app's own sandboxed window --
  // Electron denies new windows by default with sandbox:true, so without
  // this handler those links would just silently do nothing.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // Additional hardening: Disable DevTools in production even if someone tries to open it
  if (!isDev) {
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Daily Watch background mode: hide instead of quitting on window close,
  // so the scheduler + Python engine keep running and can still notify.
  mainWindow.on('close', (event) => {
    if (!isQuitting && backgroundSettings.backgroundEnabled) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}
function killProcessOnPort(port, callback) {
  const { exec } = require('child_process');
  const cmd = process.platform === 'win32'
    ? `netstat -ano | findstr :${port}`
    : `lsof -i tcp:${port} -t`;

  exec(cmd, (err, stdout) => {
    if (err || !stdout) {
      return callback();
    }

    try {
      let pid;
      if (process.platform === 'win32') {
        const lines = stdout.trim().split('\n');
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          const potentialPid = parseInt(parts[parts.length - 1], 10);
          if (potentialPid && potentialPid !== process.pid) {
            pid = potentialPid;
            break;
          }
        }
      } else {
        pid = parseInt(stdout.trim(), 10);
      }

      if (pid) {
        console.log(`Killing dangling process on port ${port} with PID ${pid}...`);
        process.kill(pid, 'SIGKILL');
      }
    } catch (e) {
      console.error(`Failed to kill process on port ${port}:`, e);
    }

    setTimeout(callback, 500);
  });
}

if (gotSingleInstanceLock) {
  // Someone tried to launch a second copy — bring the existing window to
  // the front instead of letting a second Python engine spin up.
  app.on('second-instance', () => {
    showMainWindow();
  });

  app.whenReady().then(() => {
    backgroundSettings = loadBackgroundSettings();

    killProcessOnPort(5005, () => {
      startPythonEngine();
      createWindow();

      if (backgroundSettings.backgroundEnabled) {
        createTray();
      }

      // Daily Watch scheduler: check every 15 minutes whether today's
      // configured check-hour has passed and we haven't already run today.
      // Also fire one check shortly after launch in case the app was closed
      // when the scheduled hour originally passed.
      setInterval(maybeRunScheduledCheck, 15 * 60 * 1000);
      setTimeout(maybeRunScheduledCheck, 30 * 1000);
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      } else {
        showMainWindow();
      }
    });
  });

  app.on('before-quit', () => {
    isQuitting = true;
  });

  app.on('will-quit', () => {
    if (pythonProcess) {
      pythonProcess.kill();
      pythonProcess = null;
    }
  });

  app.on('window-all-closed', () => {
    // In background mode the window is hidden (not closed) via the 'close'
    // handler above, so reaching here means a real close happened even
    // though background mode is on (e.g. programmatic close) — stay alive
    // in the tray rather than quitting, so the scheduler keeps running.
    if (backgroundSettings.backgroundEnabled) {
      return;
    }
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}