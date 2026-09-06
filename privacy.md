# Wektor AI — Privacy & Data Retention Policy

This document describes what Wektor actually does with your data, as of this
build. It's written to match the real behavior of the code, not aspirational
marketing language — if this file and the app's behavior ever diverge, treat
that as a bug and report it.

## What stays on your machine, always
- Your uploaded CSV/XLSX files, and the full contents of any database query
  you run, are processed entirely locally by the Python engine on your
  computer. They are never uploaded anywhere by Wektor.
- All chart data, computed metrics, and generated reports/PDFs/slides are
  produced locally and stay on your machine unless you choose to share them
  yourself.
- Your AI provider API key is stored using your OS's native credential store
  (Windows Credential Manager / macOS Keychain / Linux Secret Service) via
  the `keyring` library, or, if none is available, in a locally
  Fernet-encrypted file. It is never logged, and the UI only ever shows a
  masked version (e.g. `sk-a****...***wxyz`).

## What is sent to your chosen AI provider (OpenRouter, OpenAI, Anthropic, or Google)
Wektor is Bring-Your-Own-Key: you provide your own API key, and requests go
directly from your machine to that provider using your key — Wektor's own
servers are never in this path (Wektor doesn't operate a server at all).

For each analysis or chat request, the following is sent to the model you've
configured:
- **Column names, coarse data types, and aggregate statistics** — e.g. a
  numeric column's min/max/mean, a categorical column's number of unique
  values, a date column's date range, and the % of missing values. These are
  derived from your data but are not raw records.
- **Your natural-language question**, when you use the chat feature.
- The row count of your dataset (a plain integer).

**Actual row-level data is never sent to the AI model.** The model only ever
writes Python analysis code based on the schema/stats above; that code is
then executed locally, against your real DataFrame, inside a sandboxed
process (see `sandbox_executor.py`) — so the results are computed from your
real data without your real data ever leaving your machine.

What Wektor does not control: your AI provider's own data retention and
model-training policies for API traffic. Check your provider's terms
directly if that matters to you (as of this writing, OpenRouter, OpenAI,
Anthropic, and Google API traffic is generally excluded from model training by default,
but policies can change — verify with the provider, not this document).

## Database Connector & Daily Watch
- Only a single read-only `SELECT` (or `WITH ... SELECT`) query is ever
  executed — `INSERT`/`UPDATE`/`DELETE`/`DROP`/etc. are blocked before the
  query reaches your database.
- Queries are subject to a timeout and a result-size cap, enforced locally.
- Query results are exported to a temporary local CSV so they can flow
  through the same analysis pipeline as an uploaded file. These temp files
  are automatically cleaned up (anything older than 24 hours is deleted on
  the next app startup) and are never sent anywhere.
- Your database password is stored the same way as your AI provider API key
  (OS credential store / encrypted file) — never in plain text.

## Local storage summary
| What | Where | Retention |
|---|---|---|
| AI provider API key | OS keychain or encrypted local file | Until you remove it in Settings |
| DB Connector / Daily Watch password | OS keychain or encrypted local file | Until you delete the Daily Watch config |
| Daily Watch snapshots (aggregated metrics only, not raw data) | Local app-data folder | Last 14 checks, then oldest is dropped |
| Run history (aggregated metrics only) | Browser `localStorage` inside the app | Last 5 runs |
| DB Connector / Merge temp CSV exports | OS temp folder | Auto-deleted after 24 hours |
| Branding settings (logo, accent color, footer text) | Browser `localStorage` inside the app | Until you clear it |

## Telemetry
Wektor does not currently collect or transmit any usage analytics,
crash reports, or telemetry of any kind. There is nothing to opt in or out
of because nothing is being sent.

## Questions or discrepancies
If anything in this document doesn't match what you observe the app doing,
please treat it as a bug report — the intent is for this file to always be
an accurate description of real behavior, not a compliance-checkbox exercise.