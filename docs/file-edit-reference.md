# File Edit Reference

Quick lookup: before editing/searching for any file, check its status and description here first. Full-repo snapshot, taken <date>.

## ⚠️ Maintenance rule — keep this file current

**Whenever a new file is created anywhere in this repo (new section, new snippet, new asset, new template), add one line for it to this file in the same edit session — same format, same section of this doc.** Whenever an existing file's purpose changes significantly (rebuilt from scratch, repurposed), update its description line too. Don't let this file go stale — it exists so future edits/searches don't need to re-read every file from scratch.

## Legend

- 🟢 **EDITABLE** — project's own file, safe to edit freely.
- 🟡 **EDIT WITH CAUTION** — editable, but a specific rule applies (append-only, merchant data risk, range-setting limits, etc.) — read the note before touching.
- 🔴 **DAWN ORIGINAL — DO NOT EDIT** — never modify. If it needs new behavior, extend via a `custom-*` file/setting instead.

---

## sections/ — 🟢 EDITABLE (project-authored)

| File | What it renders |
|---|---|
| _(none yet — add a row per custom-\* section as it's built)_ | |

## sections/ — 🔴 DAWN ORIGINAL — DO NOT EDIT

Standard Dawn theme sections — extend via a new `custom-*` file instead of touching these. List them out once the theme is scaffolded (`announcement-bar.liquid`, `header.liquid`, `footer.liquid`, `main-product.liquid`, etc.).

🟡 **EDIT WITH CAUTION** — `header-group.json`, `footer-group.json`: real saved merchant customizer data, not source code. Don't hand-edit content; check saved range-setting values before changing schema min/max/step.

## snippets/ — 🟢 EDITABLE (project-authored)

| File | What it renders |
|---|---|
| _(none yet)_ | |

## snippets/ — 🔴 DAWN ORIGINAL — DO NOT EDIT

List Dawn's stock snippets here once identified for this project (`card-product.liquid`, `facets.liquid`, `price.liquid`, etc.) — reuse via `render`, don't rebuild.

## assets/

🟢 **EDITABLE**:
- `custom.js` — the ONE shared file for all team-authored JS (sliders, accordions, popups, cart interactions for every `custom-*` section). Never create per-section JS files.

🟡 **EDIT WITH CAUTION**:
- `application.css.liquid` — BUILD OUTPUT (Tailwind-compiled from `css/application.css`). Never hand-edit; edit the source and let the watcher regenerate this.

🔴 **DAWN ORIGINAL — DO NOT EDIT** — all Dawn component JS (`cart.js`, `global.js`, `product-form.js`, `facets.js`, `predictive-search.js`, `theme-editor.js`, `media-gallery.js`, `product-modal.js`, `quick-order-list.js`, `search-form.js`, `share.js`, etc.), all Dawn component/section CSS (`component-*.css`, `section-*.css`), all Dawn icon SVGs, and other stock assets.

## css/ — 🟢 EDITABLE (project's own Tailwind v4 source)

| File | What it contains |
|---|---|
| `application.css` | Entry point — `@import`s the other files, compiles to `assets/application.css.liquid` |
| `base.css` | Base element rules (typography defaults, `h1`–`h6`, `p`, etc.) |
| `components.css` | Reusable component classes shared across custom sections |
| `layout.css` | Page-level layout/grid utilities |
| `utilities.css` | Custom utility classes beyond Tailwind's defaults |

Tailwind watcher (`npm run build`) must be running for changes here to reach the compiled output.

## layout/

🟡 **EDIT WITH CAUTION**:
- `theme.liquid` — Dawn's original layout shell (`<head>`, global scripts, font preloads). Sitewide performance concerns (preload/preconnect/font-display, new global tags) are legitimately edited here per the performance skill — don't restructure Dawn's existing logic, only add/adjust head-level tags and global hooks.
- `password.liquid` — Dawn's password-page layout, same caution as above.

## config/

🟡 **EDIT WITH CAUTION**:
- `settings_schema.json` — theme-wide settings (colors, typography, layout). Adding a new setting is fine; changing/removing an existing one risks breaking a merchant's saved value — review existing client settings first.
- `settings_data.json` — real live merchant configuration. Never commit client-specific live data.

## templates/

🟡 **EDIT WITH CAUTION** — all `*.json` templates (`index.json` = homepage section order, every `page.*.json`, `customers/*.json`, `product.json`, `collection.json`, `cart.json`, `search.json`, `blog.json`, `article.json`, `list-collections.json`, `404.json`, `password.json`) are merchant-authored page layouts/content. Reordering/adding a section reference in `"order"` is fine; never hand-write block content/settings values into these (merchant adds blocks via customizer).

🔴 **DAWN ORIGINAL — DO NOT EDIT** — `gift_card.liquid` (Dawn's stock gift card template).

## locales/

🟡 **EDIT WITH CAUTION** — `en.default.json` / `en.default.schema.json`: append new translation keys whenever a section adds a new `{{ 'key' | t }}` string (required for every user-facing string). Never delete/rename an existing Dawn key.

🔴 **DAWN ORIGINAL — DO NOT EDIT** — every other locale file, unless the project is multi-locale.

## docs/ — 🟢 EDITABLE (project documentation)

| File | What it contains |
|---|---|
| `figma-brief.md` | Section-by-section implementation brief derived from Figma (Phase 2 of the build workflow) |
| `site-speed-optimizations.md` | Log of performance changes made, what was checked-and-skipped, and why |
| `file-edit-reference.md` | This file — repo-wide edit-safety map + one-line description per file |

---

## Quick decision rule

1. Filename starts with `custom-` (or is one of the named project-authored exceptions above) → 🟢 edit freely.
2. It's `css/*.css`, `assets/custom.js`, or a `docs/*.md` → 🟢 edit freely.
3. It's a settings/template JSON, `theme.liquid`, or a locale default file → 🟡 edit is allowed but read the specific caution note first.
4. Anything else under `sections/`, `snippets/`, or `assets/` → 🔴 it's Dawn's original — don't touch it. Build the new behavior as a `custom-*` file instead.
5. **New file created?** Add its row to the matching table/list in this doc before ending the task.
