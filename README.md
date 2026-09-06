# Wektor AI - Operational Analyst & Trajectory Sandbox

Wektor is a secure, **local-first operational intelligence analyst, What-If simulator sandbox, and boardroom briefing tool** built for corporate leaders. It allows you to analyze spreadsheets or database connections, run sensitivity projections, and export corporate briefings with absolute data privacy.

---

## 📂 Repository Structure

This repository is set up as a monorepo containing both the core desktop application and the product landing page website:

```
├── landing-page/      # Next.js 16 + Tailwind CSS marketing & compliance site
├── engine.py          # Flask backend server (data analysis, LLM integrations, and sandboxed runtimes)
├── main.js            # Electron main process (subprocess spawning, shell lifecycle)
├── preload.js         # Secure IPC bridges and path extraction
├── index.html         # Desktop application GUI (Tailwind CSS, Chart.js)
├── start.bat          # Startup scripts (automation for local setups)
└── requirements.txt   # Python dependency declarations
```

---

## 🛡️ Security & Privacy Architecture

See [`PRIVACY.md`](./PRIVACY.md) for the full data-retention and privacy policy.


Wektor is built under a **data isolation** framework:
- **Zero Cloud Ingestion of Raw Data**: Only column names, types, and aggregate statistics (min/max/mean, unique-value counts, date ranges) are ever sent to the cloud LLM to generate analysis code — actual row values never leave your machine. The generated code always runs locally, against your real data, inside a sandboxed process.
- **Secure Local IPC Handshake**: Communication between the Electron shell and the Python engine is signed using a cryptographically random `LOCAL_AUTH_TOKEN` generated at startup. External entities cannot inject API requests.
- **Sandboxed Python Runtime**: AI-generated code is executed via isolated namespaces inside `exec()` limits, allowing only safe operations using `pandas` and `numpy` (no system/file-modification modules exposed).
- **Bring Your Own Key (BYOK)**: Enter your own OpenRouter, OpenAI, Anthropic, or Google (Gemini) API key. Wektor currently requires a configured cloud API key to run analysis — there is no local/offline model option. Only one provider is "active" at a time — whichever key you most recently saved & validated in Settings.
- **Database Connector Safety**: Daily Watch and the Database Connector only ever run a single read-only `SELECT` query (`INSERT`/`UPDATE`/`DELETE`/`DROP`/etc. are blocked), enforce a query timeout, and cap the size of the fetched result to guard against runaway memory use.
- **Memory Sanitation**: Subprocesses are terminated cleanly via SIGTERM upon app closure, flushing all operational DataFrames from the host RAM.

---

## 🚀 Getting Started

### 1. Launching the Desktop App
To run the desktop application, run the automated script in the root directory:
```cmd
start.bat
```
*(This automatically resolves Python dependencies via `requirements.txt` and boots the Electron interface).*

### 2. Launching the Product Website
To run the Next.js landing page server locally:
```cmd
cd landing-page
npm install
npm run dev
```

---

## 📊 Core Features

- **Direct Database Connectors**: Load SQLite, Postgres, or MySQL data directly inside the local interface.
- **In-Memory Trajectory Sandbox**: Drag sliders to dynamically simulate Volume Adjustments and Value Multipliers over baseline metrics.
- **Slide Presentation Mode**: Navigate full-screen boards using arrow keys to review key metrics, diagnostics, and charts.
- **Corporate PDF Exports**: Compile executive briefings into vector PDF files formatted with corporate stylesheet specifications.