# Project Setup

This repo ships with a reusable Shopify Dawn-fork skill set (`.claude/skills/`, `.claude/agents/qa.md`) and project doc templates (`docs/*.md`) meant to be dropped into any new client project as-is.

## First-run intake (do this before anything else)

Check `docs/figma-brief.md`'s project header. If it still contains placeholder text (`<client name>`, `<figma-file-key>`, etc.) — meaning this is a fresh copy of the skill set, not yet wired to a real project — stop and ask the user for:

1. **Client name** and **project name**
2. **Figma file** — URL and/or file key
3. **Dev store** (`<store>.myshopify.com`)
4. **Templates in scope** (homepage, specific pages, etc.)

Do not guess or invent these. Do not proceed to any Figma/build work until they're provided.

Once given, fill in `docs/figma-brief.md`'s project header (Client / Figma file / File key / Dev store / Templates in scope) immediately.

## Once Figma access is confirmed

As soon as the Figma link/file key works (MCP can fetch it), set up everything else the project needs, without waiting for the user to ask section-by-section:

1. Run **Phase 1 (Analyze)** and **Phase 2 (Document)** from the `figma-to-shopify` skill — walk the whole file, populate `docs/figma-brief.md` in full: global design tokens, color schemes, typography, spacing scale, page hierarchy, status table, one brief entry per section.
2. Register the discovered colors/fonts/spacing as tokens in `docs/tailwind-cheatsheet.md` (sections 1–2) — replace the placeholder rows with the real project values.
3. Confirm/set `page_width` in `config/settings_data.json` against the Figma canvas width + gutters (raise `config/settings_schema.json`'s range first if needed).
4. Leave `docs/file-edit-reference.md` and `docs/site-speed-optimizations.md` as running logs — they fill in naturally as sections get built and perf passes run; no need to pre-populate them from Figma.
5. Do **not** start Phase 3 (Build) of any section until the user asks for it — intake/setup and building are separate steps, same as build vs QA are separate (see the `figma-to-shopify` skill).

## Two modes

Development (building/fixing sections) and QA (auditing a finished page/feature) are separate and never run together. QA only runs when the user explicitly asks for it, via the `qa` agent — never automatically after a build or a change.
