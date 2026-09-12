# Wektor AI - Operational Analyst & Trajectory Sandbox

Wektor is a secure, **local-first operational intelligence analyst, What-If simulator sandbox, and boardroom briefing tool** built for corporate leaders. It allows you to analyze spreadsheets or database connections, run sensitivity projections, and export corporate briefings with absolute data privacy.

---

## 📂 Repository Structure

```
├── engine.py           # Flask backend server (data analysis, LLM integrations, and sandboxed runtimes)
├── main.js             # Electron main process (subprocess spawning, shell lifecycle)
├── preload.js          # Secure IPC bridges and path extraction
├── index.html          # Desktop application GUI (Tailwind CSS, Chart.js)
├── sandbox_executor.py # Isolated exec() environment for AI-generated analysis code
├── license_manager.py  # Lifetime/Pro entitlement checks (Python-side enforcement)
├── daily_watch.py       # Scheduled Daily Watch snapshot logic
├── key_store.py         # OS-keychain-backed credential storage
├── build-engine.sh / .bat  # PyInstaller build scripts for the Python engine binary
├── start.bat            # Dev-only startup script (raw `python engine.py`, not for end users)
└── requirements.txt     # Python dependency declarations
```

The [Wektor landing page](https://wektor.vercel.app/) is maintained in a separate repository — it isn't part of this repo.

---

## 🛡️ Security & Privacy Architecture

See [`privacy.md`](./privacy.md) for the full data-retention and privacy policy.


Wektor is built under a **data isolation** framework:
- **Zero Cloud Ingestion of Raw Data**: Only column names, types, and aggregate statistics (min/max/mean, unique-value counts, date ranges) are ever sent to the cloud LLM to generate analysis code — actual row values never leave your machine. The generated code always runs locally, against your real data, inside a sandboxed process.
- **Secure Local IPC Handshake**: Communication between the Electron shell and the Python engine is signed using a cryptographically random `LOCAL_AUTH_TOKEN` generated at startup. External entities cannot inject API requests.
- **Sandboxed Python Runtime**: AI-generated code is executed via isolated namespaces inside `exec()` limits, allowing only safe operations using `pandas` and `numpy` (no system/file-modification modules exposed).
- **Bring Your Own Key (BYOK)**: Enter your own OpenRouter, OpenAI, Anthropic, or Google (Gemini) API key. Wektor currently requires a configured cloud API key to run analysis — there is no local/offline model option. Only one provider is "active" at a time — whichever key you most recently saved & validated in Settings.
- **Database Connector Safety**: Daily Watch and the Database Connector only ever run a single read-only `SELECT` query (`INSERT`/`UPDATE`/`DELETE`/`DROP`/etc. are blocked), enforce a query timeout, and cap the size of the fetched result to guard against runaway memory use.
- **Memory Sanitation**: Subprocesses are terminated cleanly via SIGTERM upon app closure, flushing all operational DataFrames from the host RAM.

---

## 🚀 Getting Started

### 1. Download the app (most people want this)
Grab the installer for your OS from the [latest release](https://github.com/Wektorhere/Wektor/releases/latest):

- **macOS (Apple Silicon)** — `Wektor-<version>-arm64.dmg`
- **macOS (Intel)** — `Wektor-<version>.dmg`
- **Windows** — `Wektor Setup <version>.exe`
- **Linux** — `Wektor-<version>.AppImage`

No Python or Node installation needed — the Python engine is bundled into the app via PyInstaller.

> **Note:** builds are currently unsigned. macOS Gatekeeper and Windows SmartScreen may show a warning on first launch — this is expected until code signing is set up. The full source is public in this repo if you'd like to verify what you're running before opening it.

Once installed, open the app and either try one of the built-in sample datasets (no API key needed) or add your own AI provider key in Settings (OpenRouter, OpenAI, Anthropic, or Google) to analyze your own files.

### 2. Run from source (for contributors / development)
```cmd
start.bat
```
*(This automatically resolves Python dependencies via `requirements.txt` and boots the Electron interface — you'll need Python and Node installed locally for this path.)*

---

## 📊 Core Features

- **Direct Database Connectors**: Load SQLite, Postgres, or MySQL data directly inside the local interface.
- **In-Memory Trajectory Sandbox**: Drag sliders to dynamically simulate Volume Adjustments and Value Multipliers over baseline metrics.
- **Slide Presentation Mode**: Navigate full-screen boards using arrow keys to review key metrics, diagnostics, and charts.
- **Corporate PDF Exports**: Compile executive briefings into vector PDF files formatted with corporate stylesheet specifications.