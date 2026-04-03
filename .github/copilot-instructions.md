# Project Guidelines

## Code Style
- Keep this project framework-free and static-first: plain HTML, CSS, and vanilla JavaScript.
- Preserve the existing formatting style in touched files (for example, semicolon usage and indentation in JS files).
- Prefer small, surgical edits; avoid broad refactors in legacy files unless explicitly requested.

## Architecture
- Primary entry page is `index.html`.
- Static assets live under `assets/`:
  - `assets/css/` for styles
  - `assets/js/` for scripts
  - `assets/json/images.json` for Bing wallpaper data consumed by JSONP
- Bing wallpaper data pipeline:
  - Generator script: `assets/js/bing.js`
  - Output file: `assets/json/images.json` (JSONP format: `getBingImages([...])`)
  - Automation: `.github/workflows/auto-bing.yml`

## Build And Test
- There are currently no npm scripts in `package.json`.
- To refresh wallpaper data locally, run:
  - `node ./assets/js/bing.js`
- CI auto-refreshes `assets/json/images.json` daily via GitHub Actions.

## Conventions
- Treat `assets/json/images.json` as generated data. Prefer updating `assets/js/bing.js` or workflow logic instead of manual edits.
- `index.html` currently loads key runtime assets from UNPKG:
  - `https://unpkg.com/dmego-home-page@latest/assets/js/main.js`
  - related CSS files from the same CDN
- Because of CDN loading, edits to local `assets/js/main.js` may not affect production behavior unless script references are switched to local paths.
- Keep deployment assumptions aligned with GitHub Pages and `CNAME` usage.

## Documentation
- Project overview and operation notes: `README.md`
- GitHub token/secrets setup details: `ActionNotes.md`
- Link to these docs instead of duplicating long setup steps in code comments or new instruction files.
