# The Flip Fixer

Room-by-room remodel estimates for San Antonio and the Hill Country.

**This repository is the house.** Phone Grok and desktop Grok both edit `dawimberly/the-flip-fixer` on `main`. If it is not committed here, the other device does not have it.

Xactimate-style installed prices for finishes. Northville cabinetry by SKU, with $75 install per box ($125 for pantries and refrigerator panels). Contractor PDF and customer copy.

## Phone and computer

1. Open this repo: [github.com/dawimberly/the-flip-fixer](https://github.com/dawimberly/the-flip-fixer)
2. Edit on the phone. Commit to `main`.
3. Sit down at the computer. Pull `main`. Edit. Commit.
4. Do not keep a second copy of the estimator in another folder and hope it stays in sync.

The Grok project folder (`Flip-Fixer-*.pdf`, Northville price book, Nextdoor calendar) lives next to this chat and on the linked Drive. Those are office files. The estimator source is this repo.

## What does not travel

Saved jobs in the app sit in **that browser on that device** (`localStorage`). A kitchen you priced on the phone is not waiting on the laptop unless you:

- Download the contractor or customer PDF, or
- Re-enter the job, or
- We later add a signed-in cloud log

The sample house in the app is in the code. That one is shared.

## Run it

```bash
npm install
npm run dev
```

Open the local URL the script prints. `npm run typecheck` checks the TypeScript.

## Notes

- Cabinets: Northville MSRP, December 2023
- Other line items: TXSA8X, September 2026
- Overhead and profit defaults to 20%, and can be switched off
- A category can hold more than one line (baseboard and the paint on it; a full roof stack)
