# Currency Data Audit

## Current implementation status

The app is **not** using a local or hosted database for currency rates.

It now calls the Fawaz Ahmed Currency API directly from the frontend (`fetchRates` in `src/services/currency.js`), requesting:

- `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`

This source is open source and frequently refreshed, but still **not true realtime/tick-level FX**.

## Selected open-source source

- **Fawaz Ahmed Currency API**
- Repo: `https://github.com/fawazahmed0/currency-api`

Reasons for selection:

- Open-source and public repo.
- Designed for free/public consumption.
- Commonly used for lightweight frontend conversion use cases.
- Provides broad currency coverage and regularly refreshed published data.

> Note: if you need strict financial-grade realtime rates (seconds-level), you usually need a paid market data provider (not purely open-source-only).
