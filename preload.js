const { contextBridge, webUtils, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getFilePath: (file) => {
    try {
      return webUtils.getPathForFile(file);
    } catch (e) {
      console.error('Preload bridge path extraction failed:', e);
      return file.path || undefined;
    }
  },
  getLocalAuthToken: async () => {
    return await ipcRenderer.invoke('get-local-auth-token');
  },
  // Daily Watch — floating reminder feature
  triggerDailyCheckNow: async () => {
    return await ipcRenderer.invoke('trigger-daily-check-now');
  },
  getDailyWatchPending: async () => {
    return await ipcRenderer.invoke('get-daily-watch-pending');
  },
  getBackgroundEnabled: async () => {
    return await ipcRenderer.invoke('get-background-enabled');
  },
  setBackgroundEnabled: async (enabled) => {
    return await ipcRenderer.invoke('set-background-enabled', enabled);
  },
  onDailyWatchUpdate: (callback) => {
    ipcRenderer.on('daily-watch-update', (event, result) => callback(result));
  }
});
