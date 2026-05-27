#!/usr/bin/env python3
"""
validate_site.py -- Consistency checks for whiteley-work-theme.

Run from the repo root:
    python scripts/validate_site.py

Exit code 0 = no errors (warnings are OK).
Exit code 1 = one or more errors.
"""

import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent

# Subdirectories inside the course that are not topic pages
COURSE_INFRA = {
    "assets", "javascripts", "stylesheets",
    "media", "search", "source-documents",
}
COURSE_DIR = REPO_ROOT / "education" / "apa-spex-shoulder-course"

errors = []
warnings = []


def err(msg) -> None:
    errors.append(msg)


def warn(msg) -> None:
    warnings.append(msg)


# ── 1. areas.json: paths resolve to real files ────────────────────────────────
areas_file = REPO_ROOT / "research" / "areas.json"
try:
    with areas_file.open(encoding="utf-8") as f:
        areas = json.load(f)
    for item in areas:
        target = REPO_ROOT / item["path"]
        if not target.exists():
            err(f"areas.json path not found: {item['path']}")
except FileNotFoundError:
    err(f"areas.json missing at {areas_file.relative_to(REPO_ROOT)}")
except json.JSONDecodeError as exc:
    err(f"areas.json invalid JSON: {exc}")


# ── 2. Topic folders under the course each have an index.html ────────────────
for entry in sorted(COURSE_DIR.iterdir()):
    if not entry.is_dir() or entry.name in COURSE_INFRA:
        continue
    if not (entry / "index.html").exists():
        warn(f"Topic folder missing index.html: {entry.relative_to(REPO_ROOT)}")


# ── 3. Double TOC: every course index.html must have exactly 2
#       md-nav--secondary blocks (left + right sidebar mirrors). ───────────────
for html_file in sorted(COURSE_DIR.rglob("index.html")):
    content = html_file.read_text(encoding="utf-8")
    count = content.count('class="md-nav md-nav--secondary"')
    if count == 1:
        err(
            f"Only 1 md-nav--secondary block (expected 2, both sidebars must match): "
            f"{html_file.relative_to(REPO_ROOT)}"
        )


# ── 4. Kebab-case naming under education/ and research/ ──────────────────────
# Scope: directories and web file types only. PDFs, docx, etc. are reference
# materials and intentionally use academic citation formats.
# Excluded trees: references/ (document storage), search/ (MkDocs-generated).
# Excluded prefix: _ (template convention).
WEB_EXTENSIONS = {".html", ".css", ".js", ".json", ".csv", ".xml"}
KEBAB_SKIP_TREES = {"references", "search", "source-documents"}
kebab_re = re.compile(r"^[a-z0-9][a-z0-9-]*(\.[a-z0-9.]+)?$")
for folder in (REPO_ROOT / "education", REPO_ROOT / "research"):
    for path in sorted(folder.rglob("*")):
        # Skip hidden files and intentional underscore-prefix templates
        if path.name.startswith(".") or path.name.startswith("_"):
            continue
        # Skip document-storage and generated trees
        if any(part in KEBAB_SKIP_TREES for part in path.parts):
            continue
        if path.is_file() and path.suffix.lower() not in WEB_EXTENSIONS:
            continue
        if not kebab_re.match(path.name):
            warn(f"Non-kebab-case name: {path.relative_to(REPO_ROOT)}")


# ── Report ────────────────────────────────────────────────────────────────────
if errors:
    print(f"\n[ERROR] {len(errors)} error(s):")
    for e in errors:
        print(f"  - {e}")

if warnings:
    print(f"\n[WARN]  {len(warnings)} warning(s):")
    for w in warnings:
        print(f"  - {w}")

if not errors and not warnings:
    print("[OK] All checks passed.")
elif not errors:
    print("\n[OK] No errors (warnings above are advisory).")

sys.exit(1 if errors else 0)
