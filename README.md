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

## Research paper PDFs for educational content

This site will also host a folder of PDF research papers that support upcoming educational content.

- Store PDFs in `papers/` at repo root.
- Use clear filenames (for example: `author-year-topic.pdf`).
- Link these PDFs from relevant research pages or future education pages.

## Education pages update workflow (Word Documnets)

The folder **Word Documnets** is treated as the source/reference set for education content pages.

### Source of truth

- Source docs: `Word Documnets` (your working reference documents per topic/page).
- Published site: `education/apa-spex-shoulder-course/`.
- Page-linked references: `education/apa-spex-shoulder-course/references/`.

### Recommended update cycle

1. Add or update files in **Word Documnets** for a topic.
2. Copy new/updated references into the matching topic folder under `education/apa-spex-shoulder-course/references/`.
3. Update the associated education page (`.../<topic>/index.html`) so links and summary content reflect the latest references.
4. Run a local preview (`python -m http.server 8080`) and verify:
	- page renders correctly,
	- all new links open,
	- no stale/removed references remain on the page.
5. Commit and push to deploy.

### Best-practice conventions

- Keep topic folder names stable and URL-safe (for example: `frozen-shoulder`, `anterior-instability`).
- Prefer replacing existing files in-place when a paper is revised (stable links), unless you need version history in filename.
- If filename changes are required, update page links in the same commit.
- Keep one page ↔ one references folder mapping to make maintenance predictable.

### Suggested scaling approach

As the number of documents grows, maintain a simple mapping table (CSV or Markdown) with:

- `topic-slug`
- `page-path`
- `source-doc-folder` (inside Word Documnets)
- `published-reference-folder`

This makes future updates, delegation, and QA checks much easier.

Pre-populated starter file:

- `education/apa-spex-shoulder-course/topic-mapping-template.csv`

### How to update the CSV during any change

Update `education/apa-spex-shoulder-course/topic-mapping-template.csv` in the **same commit** as your page/reference changes.

For each changed topic row, update these columns:

1. `topic_slug` — keep stable unless the page URL slug changed.
2. `page_path` — update if page location changed.
3. `source_doc_folder` — point to the current source folder in **Word Documnets**.
4. `published_reference_folder` — point to the live references folder used by the page.
5. `status` — use:
	- `linked` for direct 1:1 mapping,
	- `mapped` when page maps to a broader/different reference folder,
	- `needs-mapping` when unresolved.
6. `notes` — briefly explain non-obvious mappings or pending tasks.

When adding a new education topic:

1. Add the new page/folder.
2. Add references folder (or map to an existing one).
3. Add a new row to the CSV.
4. Verify links locally.
5. Commit page + references + CSV together.

When removing/renaming a topic:

1. Rename/remove page and references folders.
2. Update or remove the matching CSV row.
3. Confirm no stale links remain.

## Local preview

Open with any static server from repo root, for example:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.
