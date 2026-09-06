#!/bin/bash
# Builds the Python engine into a standalone binary via PyInstaller, so end
# users never need Python installed. Output matches what main.js expects at
# runtime: resources/engine/wektor-engine (prod) — see startPythonEngine()
# in main.js for the exact path it spawns.
set -e

echo "Installing build + runtime dependencies..."
pip install -r requirements.txt
pip install pyinstaller

echo "Cleaning previous build artifacts..."
rm -rf build dist wektor-engine.spec

echo "Building wektor-engine..."
# --hidden-import flags below are defensive: keyring loads its OS-specific
# backend (Windows Credential Manager / macOS Keychain / Secret Service) via
# importlib.metadata entry_points at runtime, which PyInstaller's static
# analysis can miss depending on platform/version. Including all three
# explicitly costs nothing (unused ones are simply never imported) and
# avoids a "no keyring backend found, falling back to encrypted file" bug
# that would otherwise only show up on a packaged build, not a dev run.
pyinstaller --onefile --name wektor-engine \
  --hidden-import keyring.backends.Windows \
  --hidden-import keyring.backends.macOS \
  --hidden-import keyring.backends.SecretService \
  engine.py

echo "Copying .env alongside the compiled binary..."
mkdir -p dist/engine
mv dist/wektor-engine* dist/engine/ 2>/dev/null || true
cp .env dist/engine/.env

echo ""
echo "Build complete: dist/engine/"
ls -la dist/engine/
echo ""
echo "Next step: electron-builder's extraResources config needs to copy"
echo "dist/engine/ into resources/engine/ inside the packaged app — not"
echo "wired up yet, that's the next phase (electron-builder packaging)."