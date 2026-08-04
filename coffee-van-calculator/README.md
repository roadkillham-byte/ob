# Coffee van cash flow calculator

Single-page React (Vite + TypeScript) app that models weekly cash flow for a
mobile coffee van business, from build-cost financing through to personal
take-home. No backend, no persistence — state lives only for the browser
session.

This is a standalone app inside the `ob` repo, unrelated to the Next.js HSC
Vault storefront at the repo root. It has its own `package.json` and does
not affect the root site's build.

```bash
cd coffee-van-calculator
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run lint      # tsc --noEmit
```

## Structure

- `src/calculations.ts` — pure calculation functions (loan amortisation,
  weekly revenue/profit, breakeven cups/day). No React, no UI.
- `src/format.ts` — currency/percentage/cups formatting; every currency
  value is rounded before display.
- `src/components/Slider.tsx` — reusable labeled range input with a live
  numeric readout.
- `src/App.tsx` — the five input sections plus the sticky output block.

## Notes on defaults

Every slider defaults to either a stated assumption (price per cup $5.50,
90 cups/day — called out because they're a concrete starting point, not a
claim about what's "realistic") or to zero/the low end of its range.
Personal cost sliders default to zero on load, deliberately, because
personal costs aren't universal to every user of this calculator.
