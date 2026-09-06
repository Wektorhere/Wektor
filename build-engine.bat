@echo off
REM Builds the Python engine into a standalone .exe via PyInstaller, so end
REM users never need Python installed. Output matches what main.js expects
REM at runtime: resources\engine\wektor-engine.exe (prod) — see
REM startPythonEngine() in main.js for the exact path it spawns.

echo Installing build + runtime dependencies...
pip install -r requirements.txt
pip install pyinstaller

echo Cleaning previous build artifacts...
rmdir /s /q build 2>nul
rmdir /s /q dist 2>nul
del /q wektor-engine.spec 2>nul

echo Building wektor-engine.exe...
REM --hidden-import flags are defensive: keyring loads its OS backend
REM (Windows Credential Manager here) via entry_points at runtime, which
REM PyInstaller's static analysis can miss. Including all three costs
REM nothing (unused ones are simply never imported) and avoids a silent
REM "no keyring backend found" bug that would otherwise only show up on a
REM packaged build, not a dev run.
pyinstaller --onefile --name wektor-engine ^
  --hidden-import keyring.backends.Windows ^
  --hidden-import keyring.backends.macOS ^
  --hidden-import keyring.backends.SecretService ^
  engine.py

echo Copying .env alongside the compiled binary...
mkdir dist\engine 2>nul
move dist\wektor-engine.exe dist\engine\ >nul
copy .env dist\engine\.env >nul

echo.
echo Build complete: dist\engine\
dir dist\engine
echo.
echo Next step: electron-builder's extraResources config needs to copy
echo dist\engine\ into resources\engine\ inside the packaged app — not
echo wired up yet, that's the next phase (electron-builder packaging).
pause