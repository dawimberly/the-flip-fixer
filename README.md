# The Flip Fixer (legacy estimator repo)

**Canonical app:** [dawimberly/flpfxr](https://github.com/dawimberly/flpfxr) on https://www.theflipfixer.com

Employee login: https://theflipfixer.com/login → estimator at https://www.theflipfixer.com/estimator

This repository previously hosted the standalone estimator at `the-flip-fixer-estimator.vercel.app`. That URL should redirect to the marketing site estimator. Prefer editing **flpfxr** for estimator + marketing going forward so phone and desktop stay on one codebase.

Room-by-room remodel estimates for San Antonio and the Hill Country. Xactimate-style installed prices, Northville cabinetry, contractor + customer PDFs with **By trade** and **Cost per item**.

## Run locally (archive)

```bash
npm install
npm run dev
```

Open the local URL the script prints. `npm run typecheck` checks the TypeScript.

## Notes

- Cabinets: Northville MSRP, December 2023
- Other line items: TXSA8X, September 2026
- Overhead and profit defaults to 20%, and can be switched off
