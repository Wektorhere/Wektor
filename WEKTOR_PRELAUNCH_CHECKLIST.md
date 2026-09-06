# Wektor AI — Pre-Launch Checklist & Brief
**Compiled July 2026 — use alongside `WEKTOR_PROJECT_SUMMARY.md` (that file covers engineering history; this one covers what's left before shipping v1 to real users)**

---

## 1. Fix immediately — blocking bugs found during review

**✅ All three fixed 2026-07-26 (this pass).**

These will break things for real users if untouched:

- [x] **`requirements.txt` has a broken line.** Currently:
  ```
  keyring cryptography
  ```
  This is two package names on one line with no separator — `pip install -r requirements.txt` will fail to parse this correctly. Fix to:
  ```
  keyring
  cryptography
  ```
- [x] **`.env`'s `OPENROUTER_MODELS`** still lists `qwen/qwen3-coder:free`, which is confirmed dead (404s in your own logs, per the terminal screenshot). Remove it from the fallback list so every single `/api/chat` and `/api/analyze` call doesn't waste a retry attempt on a model that will never succeed.
- [x] **`package.json` vs `package-lock.json` electron version mismatch** — `package.json` declares `"electron": "^31.0.0"` but `package-lock.json` resolved `42.4.0`. Align these before packaging (`npm install electron@latest --save-dev` and commit the updated lockfile) so a fresh `npm install` on another machine doesn't silently diverge from what you've been testing against.

---

## 2. Confirm before touching anything else — standing blocker

**⚠️ Note: this 2026-07-26 pass touched both marker files (rename sweep, Section 5), so the markers below are now newer than what you may have last confirmed. Re-confirm with these exact strings:**

- [ ] **Full quit-and-relaunch** (not just window close — macOS's `window-all-closed` only calls `app.quit()` on non-Darwin per `main.js`).
- [ ] Confirm **both build markers** appear:
  - Python console: `[Wektor] sandbox_executor.py loaded — BUILD 2026-07-26-a`
  - DevTools console: `[Wektor] index.html loaded — BUILD 2026-07-26-a`
- [ ] If markers are present → re-test Presentation Mode (slides 2/3) and the chat timeout live with DevTools open before assuming either is still broken.
- [ ] If markers are absent → the stale-process theory is confirmed; fix process lifecycle (see item in Section 4 — single-instance lock — this is related).

---

## 3. Demo Mode — 3 datasets, no API key required

**✅ Done 2026-07-26.** Used TelcoCustomerChurn.csv, NHANES_Weight_and_Height.csv, and a London Bike Share (Aug 2023) export in place of Anshika's picks — swap in her files later using the same recipe below if they differ.

**Goal:** let a first-time user see a full, polished analysis (Overview, Trends, Deep Dive, Presentation Mode, PDF export) in ~10 seconds, with zero setup — no API key, no upload, works offline.

- [x] Sourced 3 real datasets (Customer Churn, Population Health, London Bike Share) — swap for Anshika's picks later if different.
- [x] Computed real, internally-consistent numbers by running pandas aggregations directly against each CSV (same contract as `generate_fallback_data`/`generate_deep_dive_data`, but with business-relevant column choices instead of the naive first-column fallback — e.g. churn by contract type, not `customerID`). Nothing fabricated.
- [x] Narrative text (margin signal, executive summary, risk, opportunity, what/why changed, action playbook) hand-written to match the real computed stats for all 3 datasets.
- [x] Baked into a separate `demo-data.js` file (not inline in `index.html`) — no live API call, works with zero internet.
- [x] Added "▶ Try Sample Data" section on onboarding with 3 selectable cards: **Customer Churn**, **Population Health**, **London Bike Share**.
- [x] Wired selection to `showWorkspace()` → `populateMetrics(demoData)` directly, `appState.pendingFile = { name: '<Dataset> (Sample)', path: '' }` — reused the History-restore pattern exactly as specified.
- [x] Added the persistent banner: *"📊 Sample data — upload your own file to analyze real data."* — backed by an `appState.isDemo` flag that correctly clears on any real upload/DB query/merge/history-restore.
- [x] Decided yes on Presentation Mode / PDF export — works automatically since both just read from `appState.chartData`/`hasResults`, no extra code needed.

---

## 4. Distribution readiness

- [ ] **Bundle Python via PyInstaller.** Currently `main.js` does `spawn('python', ['-u', 'engine.py'], ...)`, which assumes the end user has Python + all of `requirements.txt` already installed — true for ~nobody outside your own dev machine. Freeze with:
  ```
  pyinstaller --onefile --name wektor-engine engine.py
  ```
  Then update `main.js` to spawn that compiled binary instead of raw `python engine.py`. **Do this before any packaging work** — everything downstream (electron-builder config, testing) should target the bundled binary, not the dev workflow.
- [ ] **Package with `electron-builder`**, not raw `electron .` / `start.bat`. Add as devDependency, configure a `build` block in `package.json` (icon, app id, per-platform targets) to produce real `.dmg`/`.exe`/`.AppImage` installers.
- [ ] **App icons** — need proper `.icns` (macOS) and `.ico` (Windows) formats; currently only `icon.png` exists, referenced in `main.js` but not in platform-native formats electron-builder needs.
- [ ] **Single-instance lock** — `main.js` doesn't call `app.requestSingleInstanceLock()`. Combined with the existing stale-process issue (Section 2), a user accidentally launching the app twice will get two Python engines fighting over port 5005, and `killProcessOnPort` will kill the *other* legitimate instance. Small fix, real support-ticket prevention.
- [ ] **Code signing / notarization** — macOS Gatekeeper will hard-block unsigned apps for most users ("app is damaged"); needs an Apple Developer account ($99/yr) + notarization before any public macOS release. Windows SmartScreen warns but doesn't hard-block, so this can be lower priority for a Windows-only early release if budget is tight.
- [ ] **First-run failure messaging** — if the bundled engine fails to start, current UX is a generic timeout message. Add something clearer like "Local analysis engine failed to start — try reinstalling," since you won't be present to debug a stranger's machine.

---

## 5. Rename sweep (Vektor → Wektor)

**✅ Codebase done 2026-07-26** (main.js, index.html, package.json/package-lock.json, README.md, engine.py, key_store.py, key_validation.py, sandbox_executor.py, start.bat, and localStorage keys `vektor_*` → `wektor_*`). Landing page still pending — it's gitignored (`landing-page/`) and wasn't in the files provided to this pass.

Do this **before** packaging, not after, so the first real installer already ships with the right name/paths — renaming after users have local data in `%APPDATA%\Vektor\` becomes a migration problem later.

- [x] `main.js` — `title: 'Wektor AI'`
- [x] `index.html` — logo wordmark, onboarding tagline, workspace header, Presentation Mode footer, all UI text now says "WEKTOR"/"Wektor" (also renamed the linked CSS classes `vektor-toast`/`vektor-loader-bar`→`wektor-*`, chat role id `vektorThinkingBubble`→`wektorThinkingBubble`, and `localStorage` keys `vektor_history`/`vektor_logo`/`vektor_accent`/`vektor_footer`→`wektor_*`)
- [x] `package.json` — `name: "wektor-desktop"` (and `package-lock.json`'s `name` field updated to match, otherwise `npm install` would flag a mismatch)
- [x] `README.md` — title and body copy renamed; PDF report header/footer text in `index.html` renamed too
- [ ] Landing page (Next.js site) — not touched, not in this repo pass (gitignored, not provided)
- [x] Local app-data folder path convention — `key_store.py`'s `SERVICE_NAME = "Wektor"` is now the only reference and matches everywhere else; removed the stale "update if final product name differs" comment since the rename is final
- [ ] Landing page tagline **"Instant answers. No formulas. Zero data leaks."** is inaccurate (a 3-row schema sample does leave the machine) — reword to something like *"Zero raw data leaves your machine."* while touching this copy anyway for the free-beta messaging update (Section 0). Still pending — landing page not accessible from this pass.

**Note:** this pass also bumped both build markers (Section 2) to `2026-07-26-a` since the rename touched the exact lines those markers live on. Re-confirm Section 2 with the new marker strings before relying on them.

---

## 6. Older unresolved items (from prior sessions, still open)

- [ ] "Success but empty analysis" edge case — sandbox ran clean, returned empty results (expected variable names not set by AI). Not touched recently; worth a dedicated pass if still reproducible.
- [ ] History button placement/behavior — should already be resolved per last session's fix, but worth a final visual check post-rename.

---

## Suggested execution order

1. Fix the 3 blocking bugs (Section 1) — quick, prevents real breakage.
2. Confirm build markers (Section 2) — unblocks trusting any further Presentation Mode/chat-timeout work.
3. Demo Mode with the 3 datasets (Section 3) — highest leverage for first impressions, no dependency on anything else.
4. PyInstaller bundle (Section 4) — foundational for distribution, do before packaging config.
5. Rename sweep (Section 5) — do before the first real installer exists.
6. electron-builder packaging + icon + single-instance lock (Section 4).
7. Code signing (Section 4) — at minimum macOS notarization before public Mac release.

