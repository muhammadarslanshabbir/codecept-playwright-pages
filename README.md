# Task Pilot (CodeceptJS + Playwright)

A small Vite + TypeScript app deployed to GitHub Pages with end-to-end coverage via CodeceptJS and Playwright.

## Local dev

- `npm install`
- `npm run dev` (opens the UI)

## End-to-end tests

- `npm run test:e2e`  
  Builds the app, runs `vite preview` on port 4173, and executes CodeceptJS + Playwright scenarios.
- Browsers are installed via `npx playwright install --with-deps` (handled in CI).

## GitHub Actions

- `.github/workflows/ci.yml` — installs deps, installs Playwright browsers, runs E2E tests on push/PR.
- `.github/workflows/pages.yml` — builds and deploys the `dist` folder to GitHub Pages on `main` (and via manual dispatch).

`vite.config.ts` sets `base` to `/codecept-playwright-pages/` so assets resolve correctly on Pages. Update that value if you rename the repo.

CI status: ![CI](https://github.com/muhammadarslanshabbir/codecept-playwright-pages/actions/workflows/ci.yml/badge.svg)

## Pushing to GitHub

```bash
git init -b main
git add .
git commit -m "chore: scaffold app with CodeceptJS e2e and Pages deploy"
git remote add origin git@github.com:muhammadarslanshabbir/codecept-playwright-pages.git
git push -u origin main
```

After the first push, enable GitHub Pages with the "GitHub Actions" source. The `pages.yml` workflow will publish the site and surface the live URL in the workflow output.
