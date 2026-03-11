# whiteley-work-theme

Static GitHub Pages rebuild scaffold for `whiteley.work`.

## Site structure

- `index.html` — homepage that auto-renders research cards from data.
- `research/areas.json` — source of truth for homepage cards.
- `research/*.html` — one page per research area.
- `research/_template.html` — copy this file for each new research area page.
- `scripts/main.js` — renders cards from `research/areas.json`.
- `.github/workflows/deploy-pages.yml` — deploys to GitHub Pages on push to `main` or `master`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In GitHub: **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push changes to `main` or `master`; deployment runs automatically.

## Publish to www.whiteley.work

1. Create a file named `CNAME` in the repo root with this single line:

```text
www.whiteley.work
```

2. Commit and push `CNAME`.
3. In your DNS provider, set `www` as a **CNAME** to `whiteleyrod.github.io`.
4. For apex `whiteley.work`, either:
	- set a redirect to `https://www.whiteley.work`, or
	- configure apex records per GitHub Pages guidance.
5. In GitHub Pages settings, confirm the custom domain is `www.whiteley.work` and HTTPS is enabled.

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
