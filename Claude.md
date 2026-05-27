# Whiteley Work Theme — Claude Automation Rules

## System & Architecture Constraints
- **Stack:** Strict Vanilla HTML5, Vanilla CSS3, and native ES6+ JavaScript.
- **Dependencies:** No Node.js, npm, Webpack, Vite, or external compilation steps. The site must remain 100% statically deployable to GitHub Pages out of the box.
- **Pathing:** Never use absolute URLs or hardcoded local system paths (`C:\...`). Use strictly relative paths (`../`) or root-relative paths (`/`).

## Core Source of Truth Files
1. `research/areas.json` — Governs homepage research cards. Schema at `scripts/schemas/areas.schema.json`.
2. `education/apa-spex-shoulder-course/topic-mapping-template.csv` — Map of all training modules, source word documents, and reference folders.

## Critical Code Style Rules
- **Theme Sync:** Any new or modified `.html` page under `education/` or `research/` MUST include the Material palette script and initialization snippet. Copy the `<script>` block that initialises `__md_scope`, `__md_get`, `__md_set`, and the colour-scheme toggle from an existing course page such as `education/apa-spex-shoulder-course/index.html`. Ensure `__md_scope` matches the global education-course root so light/dark mode choices persist globally.
- **Double TOC Entry Requirement:** Every page under `education/apa-spex-shoulder-course/` contains TWO identical `<nav class="md-nav md-nav--secondary">` blocks (left sidebar and right sidebar share the same markup). When adding or updating navigation on any course page, BOTH blocks must be changed identically. Editing only one leaves the other panel stale.
- **Slugs:** Folder names, file names, and URL paths must strictly use lowercase `kebab-case` (e.g., `calcifying-tendinopathy`).

## Adding a New Course Topic
1. Create `education/apa-spex-shoulder-course/[topic-slug]/index.html` from a similar existing topic page.
2. Update the left-nav section (`__nav_*`) in `education/apa-spex-shoulder-course/index.html` — remember the Double TOC rule above.
3. Update `topic-mapping-template.csv` with the new row.

## Adding a New Homepage Card
1. Add an entry to `research/areas.json` — the schema at `scripts/schemas/areas.schema.json` will validate it in VS Code.