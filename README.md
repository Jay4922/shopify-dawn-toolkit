# Shopify Dawn-Fork Skill Kit

Reusable Claude Code skill set + doc templates for building Shopify Dawn-fork theme projects from Figma. Drop into any new client repo as-is.

## What's inside

```
claude/
  skills/
    figma-to-shopify/     Figma → theme section workflow (analyze → document → build)
    shopify-liquid/       Liquid, schema, sections/snippets/blocks standard
    shopify-javascript/   Theme JS standard (custom.js, sliders, cart AJAX)
    tailwind-css/         Tailwind v4 conventions for Dawn-fork projects
    ada-accessibility/    WCAG 2.1 AA build-time standard
    performance/          Core Web Vitals / lazy-load / bundle-size standard
    seo/                  Headings, structured data, metadata standard
  agents/
    qa.md                 On-demand full-page audit agent (manual only)
docs/
  figma-brief.md              Project header + design tokens + section briefs
  tailwind-cheatsheet.md       Project color/font/spacing token reference
  file-edit-reference.md       Running log of files touched per section
  site-speed-optimizations.md  Running log of perf passes
```

## Workflow

**1. Intake.** On first use, `docs/figma-brief.md` still has placeholder values. Claude asks for client name, project name, Figma file/key, dev store, and templates in scope before doing anything else.

**2. Setup.** Once Figma access is confirmed, Claude runs Phase 1 (Analyze) and Phase 2 (Document) of `figma-to-shopify`: fills in `docs/figma-brief.md` in full, registers real design tokens in `docs/tailwind-cheatsheet.md`, and checks `page_width` against the Figma canvas.

**3. Build.** Phase 3 of `figma-to-shopify` builds sections one at a time, using the domain skills (Liquid, JS, Tailwind, accessibility, performance, SEO) as build-time standards. Build only starts when the user asks for it.

**4. QA.** The `qa` agent runs a full audit (visual parity, responsiveness, accessibility, Lighthouse, SEO, console errors) against a finished page or feature. Runs only on explicit request — never automatically after a build.

Development and QA are always separate steps.

## Usage

Copy this repo's contents into a new client project, then open it in Claude Code. Claude will detect the placeholder project header in `docs/figma-brief.md` and start the intake questions automatically.

Check This Document For More Information - https://docs.google.com/document/d/1sQk7E7yUn1NQ_MH9rSwOsAbJq8CfP2zYis75QehhDIw/edit?tab=t.0#heading=h.nqk17tkh8bq3
