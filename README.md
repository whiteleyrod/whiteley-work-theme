# whiteley-work-theme

Static GitHub Pages rebuild scaffold for `whiteley.work`.

## Site structure

- `index.html` — homepage that auto-renders research cards from data.
- `research/areas.json` — source of truth for homepage cards.
- `research/*.html` — one page per research area.
- `research/_template.html` — copy this file for each new research area page.
- `scripts/main.js` — renders cards from `research/areas.json`.
- `.github/workflows/deploy-pages.yml` — deploys to GitHub Pages on push to `main`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In GitHub: **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Ensure your working branch is `main` (the workflow runs on `main`).
4. Push changes to `main`; deployment runs automatically.

## Drop-in content pattern (new research area)

1. Copy `research/_template.html` to `research/your-area-slug.html`.
2. Edit page title, subtitle, summary, and links in the new file.
3. Add one object to `research/areas.json`:

```json
{
	"title": "Your Area Title",
	"summary": "One-line description of the area.",
	"path": "research/your-area-slug.html",
	"status": "Live"
}
```

4. Commit and push. The homepage card appears automatically.

## Local preview

Open with any static server from repo root, for example:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.
