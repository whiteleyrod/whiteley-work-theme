# whiteley-work-theme

Static GitHub Pages rebuild scaffold for `whiteley.work`.

## Site structure

- `index.html` — homepage that auto-renders research cards from data.
- `research/areas.json` — source of truth for homepage cards.
- `research/*.html` — one page per research area.
- `research/_template.html` — copy this file for each new research area page.
- `scripts/main.js` — renders cards from `research/areas.json`.
- `.github/workflows/deploy-pages.yml` — deploys to GitHub Pages on push to `main` or `master`.

## Current published topics

APA SPEX Shoulder Course — `education/apa-spex-shoulder-course/`

### Shoulder
| Topic | Slug |
|---|---|
| ACJ Injury | `acj-injury` |
| Anterior Instability | `anterior-instability` |
| Calcifying Tendinopathy | `calcifying-tendinopathy` |
| Clavicle Fractures | `clavicle-fractures` |
| Distal Clavicular Osteolysis | `distal-clavicular-osteolysis` |
| Frozen Shoulder | `frozen-shoulder` |
| Glenohumeral Osteoarthritis | `glenohumeral-osteoarthritis` |
| SLAP / Labral Injury | `slap-labral-injury` |
| Subacromial Impingement | `subacromial-impingement` |
| Swimmer's Shoulder | `swimmers-shoulder-NEW` |
| Throwing Shoulder | `throwing-shoulder` |

### Elbow
| Topic | Slug |
|---|---|
| Elbow | `elbow` |

### Hip & Groin
| Topic | Slug |
|---|---|
| Hip and Groin | `hip-groin` |
| Hip Pain in Children and Adolescents | `hip-pain-children-adolescents` |
| Lateral Hip Pain (Adults) | `lateral-hip-pain` |

### Knee
| Topic | Slug |
|---|---|
| Knee (overview) | `knee` |
| Knee Cartilage and Meniscal Injury | `knee/knee-cartilage-and-meniscal-injury` |
| Patellar Tendinopathy | `knee/patellar-tendinopathy` |
| Patellofemoral Pain | `knee/patellofemoral-pain` |

### Foot & Ankle
| Topic | Slug |
|---|---|
| Foot & Ankle Overview | `foot-ankle-overview` |
| Lateral Ankle Sprain | `lateral-ankle-sprain` |
| Plantar Fasciopathy | `plantar-fasciopathy` |
| Syndesmosis | `syndesmosis` |

### Other / General
| Topic | Slug |
|---|---|
| Achilles Tendinopathy | `achilles-tendinopathy` |
| Posterior Instability | `posterior-instability` |
| Tendon Basic Science | `tendon-basic-science` |
| Thoracic Outlet | `thoracic-outlet` |

Full topic → reference folder mapping: `education/apa-spex-shoulder-course/topic-mapping-template.csv`

---

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

The folder **Word Documents** is treated as the source/reference set for education content pages.

### Source of truth

- Source docs: `Word Documents` (your working reference documents per topic/page).
- Published site: `education/apa-spex-shoulder-course/`.
- Page-linked references: `education/apa-spex-shoulder-course/references/`.
- Published Word-doc archive page: `education/apa-spex-shoulder-course/source-documents/`.

### Recommended update cycle

1. Add or update files in **Word Documents** for a topic.
2. Copy new/updated references into the matching topic folder under `education/apa-spex-shoulder-course/references/`.
3. Copy new/updated Word docs into `education/apa-spex-shoulder-course/source-documents/files/`.
4. Update `education/apa-spex-shoulder-course/source-documents/index.html` so the file list and notes stay accurate.
5. Update the associated education page (`.../<topic>/index.html`) so links and summary content reflect the latest references.
	- if the page is a hand-authored/static HTML page rather than an exported MkDocs page, include the Material palette support used by `source-documents/index.html` so the page respects saved light/dark theme selection.
	- set the palette storage scope to the education-course root (matching the existing `__md_scope` pattern) so users set dark/light mode once and the preference carries across all course pages and manual subpages.
	- if the change adds a brand-new top-level module (for example `elbow/`), also update the visible course entry points you maintain: home summary text, edited manual-page tab bars, and sitemap.
6. Update `education/apa-spex-shoulder-course/references/index.html` for the new/updated topic:
	- add a **content section** (`<h2 id="...">`) with a link to the topic reference folder index,
	- add the same topic link in **both** right-side Table of Contents blocks (`md-nav--secondary` appears twice in this file),
	- keep ordering consistent with existing sections (alphabetical by section title unless intentionally grouped).
7. Run a local preview (`python -m http.server 8080`) and verify:
	- page renders correctly,
	- all new links open,
	- source Word documents page shows the expected files,
	- dark/light theme toggle applies on `source-documents/` as well as module/reference pages,
	- topic appears in `references/` page content and right-side TOC,
	- no stale/removed references remain on the page.
8. Commit and push to deploy.

### Critical checklist for adding a new section

When creating a new topic/section page, include all of the following in the same commit:

1. Topic page created/updated (for example `education/apa-spex-shoulder-course/<topic>/index.html`).
2. Topic references folder created/updated under `education/apa-spex-shoulder-course/references/`.
3. Source Word doc copied to `education/apa-spex-shoulder-course/source-documents/files/` and listed on `source-documents/index.html`.
4. Topic entry added to `education/apa-spex-shoulder-course/references/index.html`:
	- section heading + link to folder index,
	- TOC entry in both `md-nav--secondary` TOC blocks,
	- correct relative links and ordering.
5. Mapping row added/updated in `education/apa-spex-shoulder-course/topic-mapping-template.csv`.
6. Local QA confirms no missing links and no duplicate/misplaced TOC items.
7. For any manually created HTML page, confirm it includes the site palette script + toggle controls so saved dark/light mode carries across pages.
8. If this is a new top-level module rather than a subsection, confirm the home page, sitemap, and edited manual-page tab bars expose the new module.

### Best-practice conventions

- Keep topic folder names stable and URL-safe (for example: `frozen-shoulder`, `anterior-instability`).
- Prefer replacing existing files in-place when a paper is revised (stable links), unless you need version history in filename.
- If filename changes are required, update page links in the same commit.
- Keep one page ↔ one references folder mapping to make maintenance predictable.
- When creating manual HTML pages, copy the palette/state snippet from `education/apa-spex-shoulder-course/source-documents/index.html` or another theme-compliant manual page so the page inherits the user's saved light/dark theme and still exposes the toggle.
- Apply the same pattern to manual reference-folder `index.html` pages, not only teaching/module pages.

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

## Updating the EDA Explorer tool

The EDA Explorer hosted at `research/eda/` is a pre-built React/Vite app. Its source lives in a separate repository:

- **GitHub:** https://github.com/whiteleyrod/exploratory-data-analysis-explorer
- **Local source:** `C:\Users\rod_w\OneDrive - aspirezone.qa\Python_Stuff\ExploratoryDataAnalysis`

After making and committing changes to the EDA tool source, update the website copy:

1. Open a terminal in the EDA source directory:

```powershell
cd "C:\Users\rod_w\OneDrive - aspirezone.qa\Python_Stuff\ExploratoryDataAnalysis"
```

2. Build the tool:

```powershell
npm run build
```

3. Copy the output over the old build (overwrite everything):

```powershell
Copy-Item -Path "dist\*" -Destination "C:\Users\rod_w\OneDrive\PythonStuff\Whiteley-Work-Theme\whiteley-work-theme\research\eda" -Recurse -Force
```

4. Commit and push the website repo. The updated tool goes live automatically via GitHub Actions.

**Notes:**
- The Vite config in the EDA source already sets `base: '/research/eda/'`, so no path changes are needed after copying.
- The JS bundle filename is content-hashed and will change with each build — this is normal and intentional (cache busting). The `index.html` always references the correct filename.
- Do not edit any files inside `research/eda/` by hand — they are generated output and will be overwritten on the next update.

---

## Local preview

Open with any static server from repo root, for example:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.
