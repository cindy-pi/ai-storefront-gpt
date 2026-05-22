# Fizban's Wands

Fantasy-themed static e-commerce storefront built with React and Vite for GitHub Pages.

Live demo: https://cindy-pi.github.io/ai-storefront-gpt/

## Running Locally

Install dependencies:

```bash
npm install
```

Start the Vite dev server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Live Demo

The app is configured for GitHub Pages at `https://cindy-pi.github.io/ai-storefront-gpt/`.

The Vite `base` path is `/ai-storefront-gpt/` so built assets resolve correctly when deployed from this repository path.

## About the Shop

Fizban's Wands is a polished static storefront for magical implements. It includes:

- A hero home page with featured legendary wands.
- A complete catalog of 36 wands.
- Alignment categories for Good, Neutral, and Evil.
- Product detail modals with wood, core, length, temperament, rarity, price, and magical effect.
- A fantasy UI designed for desktop and mobile screens.

## Seed Data

The catalog data lives in `src/data/wands.js` and includes 12 Good wands, 12 Neutral wands, and 12 Evil wands.

Each wand has a generated SVG image embedded as a data URL so the static site does not depend on remote image hosting.

## Customer Credits

Each browser profile starts with `1,000gp`. The current balance is stored in localStorage under `fizbans-wands-balance`.

To reset demo state, clear site data for the page or remove these localStorage keys:

- `fizbans-wands-cart`
- `fizbans-wands-balance`
- `fizbans-wands-orders`

## Cart

The cart supports multiple wands and quantity updates. Cart state persists in localStorage under `fizbans-wands-cart`.

Cart totals are calculated in gold pieces using the helper functions in `src/lib/cart.js`.

## Checkout

Checkout blocks empty carts and carts that exceed the current gold balance. Successful checkout deducts the total from the balance, clears the cart, and creates a persisted order record.

## Simulated Email Receipt

After checkout, the Receipts page shows the latest magical delivery receipt with purchased wand images, quantities, total paid, and remaining balance.

Purchase history persists in localStorage under `fizbans-wands-orders`.

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatches. It installs dependencies with `npm ci`, builds with `npm run build`, uploads the `dist` artifact, and deploys through GitHub Pages.

Repository Pages must be configured to deploy from GitHub Actions.
