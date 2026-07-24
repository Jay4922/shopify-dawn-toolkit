# Tailwind + Design System Cheatsheet

**Purpose:** single source of truth for building/converting sections. Use Tailwind utilities + project helper classes FIRST. Fall back to scoped CSS in `{% style %}` only when no utility exists.

Sources: `css/application.css` (theme tokens), `css/base.css` (typography + helpers), `css/components.css` (button + popup + filter), `css/layout.css` (header + footer), `css/utilities.css` (rich-text overrides).

---

## 1. Design tokens (from `@theme` in `application.css`)

All tokens auto-generate Tailwind utilities. Use utility name, not raw `var()`.

### Colors

| Token | Hex | Tailwind utilities |
|---|---|---|
| `--color-<name>` | `<hex>` | `bg-<name>` `text-<name>` `border-<name>` |

_(fill in per-project during intake — one row per Figma color style, see `.claude/skills/figma-to-shopify/references/design-tokens.md`)_

**Rule:** never write a raw hex inline (`text-[#000000]`). Use the token utility. If a Figma color isn't in this list, ask before adding a new token.

### Fonts

| Token | Value | Tailwind |
|---|---|---|
| `--font-heading` | `<font>, <fallback>` | `font-heading` |
| `--font-body` | `<font>, <fallback>` | `font-body` |

_(project may use 2–3 font tokens depending on the Figma type system — fill in during intake)_

Default: `body` = <default font token>. Headings default to <heading token(s)> — see typography rules.

### Custom utilities

Defined in `application.css` — **any pixel size works dynamically**:

- `text-{n}` → `font-size: {n}px` (e.g. `text-18`, `text-24`, `text-48`)
- `rounded-{n}` → `border-radius: {n}px` (e.g. `rounded-10`, `rounded-100`)

Spacing scale is `1px per unit` (`--spacing: 1px`), so `gap-20` = 20px, `px-32` = 32px, `py-8` = 8px, `mt-40` = 40px. Any integer works — no restricted scale.

### Breakpoints (min-width, mobile-first)

| Utility prefix | Min-width |
|---|---|
| `375:` | 376px |
| `425:` | 426px |
| `480:` | 480px |
| `576:` | 577px |
| `640:` | 641px |
| `750:` | 750px |
| `768:` | 769px |
| `990:` | 990px |
| `992:` | 993px |
| `1024:` | 1025px |
| `1199:` | 1200px |
| `1366:` | 1367px |
| `1440:` | 1441px |
| `1512:` | 1513px |
| `1600:` | 1601px |
| `1920:` | 1921px |

**Max-width variants:** prefix with `max-` (e.g. `max-990:hidden` = hide below 990px). Common: `max-990:` for mobile-only, `max-1440:` for tablet-down.

**Golden breakpoint:** 990px separates mobile ↔ desktop everywhere. Use `990:` and `max-990:` unless design demands otherwise.

---

## 2. Typography (base.css) — DEFAULTS ARE FREE

Bare HTML elements already have styles applied. Just write `<h2>Heading</h2>` — no classes needed, once the table below is filled in for this project.

### Bare element defaults

| Element | Font | Weight | Sizes (mobile → widest) | Line height | Color |
|---|---|---|---|---|---|
| `h1` | | | | | |
| `h2` | | | | | |
| `h3` | | | | | |
| `h4` | | | | | |
| `h5` | | | | | |
| `h6` | | | | | |
| `p` | | | | | |
| `a` | | | | | |

_(fill in from the project's Figma type scale during intake)_

**Consequence:** these bare-element rules have `layer(base)` `!important` in some cases → they beat unlayered classes. If overriding a heading `font-family` / `font-size` from a `{% style %}` block, use inline `style=""` on the element instead.

### Helper text classes (use on any element)

| Class | Purpose | Spec |
|---|---|---|
| _(fill in per-project helper classes as they're added to `base.css`/`components.css`)_ | | |

### Richtext wrapper classes

Wrap merchant richtext output to style its `<p>`, `<a>`, `<ol>`, `<ul>`:

- `.content` — base scope
- `.content.content-white p` — white text
- `.content.content-black p` — black text
- `.content.content-grey p` — grey text
- `.content.content-large p` — larger body scale above the golden breakpoint

**Rule:** for any `{{ richtext_setting }}` output, wrap with `<div class="content ...">` — do NOT write scoped `.wrapper p { font-family: ... }` (bare `p` rules win by specificity).

### Section title color helpers

- `.title-black h1..h6` → force black
- `.title-white h1..h6` → force white

### Containers (max-width + responsive horizontal padding)

| Class | Desktop padding | Tablet | Mobile |
|---|---|---|---|
| `.container-55` | 55px | 55px | 30px |
| `.container-80` | 80px | 55px | 30px |
| `.container-100` | 100px | 55px | 30px |

All are `max-w-full`. Use `.container-80` as default for full-bleed sections that need horizontal breathing room. `.container-100` for wide hero-style. `.container-55` for tighter cards.

_(confirm these container widths still match this project's Figma canvas/gutters during intake — adjust if not)_

---

## 3. Reusable component classes

### Buttons (`components.css`)

Base: `.button` (or project-prefixed equivalent) — inline-flex, rounded, uppercase, bold, standard padding desktop/mobile.

Variants (compose with `.button`):

| Class | Style |
|---|---|
| `.btn-<variant>` | _(fill in per-project button variants — primary, outline, text-only, etc.)_ |

**Usage:** `<a class="button btn-<variant>">Add to Cart</a>` — never re-write button styles per section.

### Header nav (`layout.css`)

_(document the project's header component class namespace here once built — wrapper, logo, links, dropdown, mobile toggle, etc. Don't reinvent nav markup per section.)_

### Footer (`layout.css`)

_(document the project's footer component class namespace here once built.)_

### Policy pages / rich-text (`utilities.css`)

_(document any policy/terms page wrapper classes here once built.)_

---

## 4. Section conversion recipe (Figma → Liquid)

**Goal:** every new section uses ≥ 90% Tailwind utilities + design-system helpers. Scoped `{% style %}` only for what utilities can't express.

### Step-by-step

1. **Read Figma frame.** Get spec — colors, font family, sizes, spacing, breakpoints, radius.
2. **Map colors to tokens.** Every hex must match a `--color-*` token. If Figma uses new hex, ASK before adding token.
3. **Map fonts to tokens.** Use only the font tokens defined in section 1 — no other font-family class allowed.
4. **Map typography.** Prefer bare `<h1>..<h6>` + `<p>` (defaults are correct once section 2's table is filled in). If Figma differs from defaults, use a helper class. Only if NO helper matches, add utilities (`class="text-24 leading-32 font-body font-bold text-blue"`).
5. **Layout with utilities.** `flex`/`grid`/`gap-X`/`px-X`/`py-X`/`max-w-*`/`w-full`. Use responsive prefixes (`990:` / `max-990:`).
6. **Container.** Wrap outer content in `.container-80` (default), `.container-100` (wide), or `.container-55` (tight). Do NOT hand-code `max-width + padding`.
7. **Buttons.** `<a class="button btn-<variant>">`. Never restyle a button in the section.
8. **Richtext output.** Wrap in `<div class="content">` (add `content-white`, `content-large`, etc. as needed). Never target `<p>` with a section-scoped selector.
9. **Merchant settings still needed?** Add ONLY color pickers or image pickers that the merchant needs to override — do NOT expose font-size/font-family/spacing as settings (they should come from the design system).
10. **Fallback CSS.** If a utility genuinely doesn't exist (e.g. custom `background: linear-gradient(...)` with 3 stops, or a `mask-image`, or a `:has()` selector), put it in `{% style %}` scoped to the section id: `.myblock-{{ section.id }} { ... }`. Comment why the utility isn't enough. Never write section-scoped CSS for anything already available as a utility.

### When scoped CSS IS acceptable

- Complex gradients / mask-image / clip-path
- CSS Grid `grid-template-areas` with named regions
- `@container` queries
- Swiper / third-party lib overrides
- `!important` overrides for Dawn's or this project's layered rules (rare)
- Dynamic values driven by section settings (e.g. `--sep-cols: {{ section.settings.columns_desktop }}`)

### When scoped CSS is NOT acceptable

- Font family (use a font token utility)
- Font size (use `text-{n}` utility — any px works)
- Color (use token utility — never inline hex)
- Padding / margin / gap (utility)
- Border radius (`rounded-{n}` utility)
- Flexbox / grid layout that has utility equivalents
- Button appearance (`.button` + variant)
- Container widths (`.container-80` etc.)

### Example (before / after)

**Bad — everything scoped:**
```liquid
<div class="my-section-{{ section.id }}">
  <h2 class="my-title-{{ section.id }}">{{ section.settings.heading }}</h2>
  <p class="my-text-{{ section.id }}">{{ section.settings.body }}</p>
  <a class="my-btn-{{ section.id }}" href="{{ section.settings.url }}">Click</a>
</div>
{% style %}
  .my-section-{{ section.id }} { max-width: 1440px; margin: 0 auto; padding: 0 80px; }
  .my-title-{{ section.id }} { font-family: serif; font-size: 48px; color: #000; }
  .my-text-{{ section.id }} { font-family: sans-serif; font-size: 18px; color: #333; }
  .my-btn-{{ section.id }} { background: #000; color: #fff; padding: 8px 32px; border-radius: 100px; text-transform: uppercase; }
{% endstyle %}
```

**Good — utility-first + helpers:**
```liquid
<div class="container-80 flex flex-col gap-20 py-40 max-990:py-24">
  <h2>{{ section.settings.heading }}</h2>
  <div class="content">{{ section.settings.body }}</div>
  <a class="button btn-primary" href="{{ section.settings.url }}">Click</a>
</div>
```

**Best — semantic class + `@apply` in project CSS (preferred):**

Markup — clean semantic classes, zero utility soup:
```liquid
<div class="my-section">
  <h2 class="my-section__title">{{ section.settings.heading }}</h2>
  <div class="my-section__content">{{ section.settings.body }}</div>
  <a class="my-section__cta button btn-primary" href="{{ section.settings.url }}">Click</a>
</div>
```

CSS — add to `css/components/*.css` (or the section's own component file), Tailwind v4 processes `@apply`:
```css
.my-section        { @apply container-80 flex flex-col gap-20 py-40 max-990:py-24; }
.my-section__title { @apply text-48 font-heading; }
.my-section__content { @apply text-18 font-body; }
```

Why preferred: markup stays readable, class names describe intent (not appearance), utilities still drive the values, one place to change the visual language. Merchant-controllable colors still added via schema + inline `style="color: {{ ... }}"` when needed.

Never put `@apply` inside a Liquid `{% style %}` block — those aren't processed by Tailwind. `@apply` must live in a real `.css` file in `css/`.

---

## 5. Quick reference — common section patterns

### Two-column split
```liquid
<div class="container-80 flex flex-col gap-40 990:flex-row 990:gap-60">
  <div class="990:flex-1">{{ image }}</div>
  <div class="990:flex-1 flex flex-col gap-20 justify-center">
    <h2>{{ heading }}</h2>
    <div class="content">{{ body }}</div>
    <a class="button btn-primary">CTA</a>
  </div>
</div>
```

### Card grid (responsive columns)
```liquid
<div class="container-80">
  <div class="grid grid-cols-1 gap-20 640:grid-cols-2 990:grid-cols-3">
    {%- for block in section.blocks -%}
      <article class="flex flex-col gap-15 p-20 rounded-10 bg-light-grey">
        <h4>{{ block.settings.title }}</h4>
        <p>{{ block.settings.body }}</p>
      </article>
    {%- endfor -%}
  </div>
</div>
```

### Centered eyebrow + heading + CTA
```liquid
<div class="container-80 flex flex-col gap-20 items-center text-center">
  <span class="label-heading">{{ section.settings.eyebrow }}</span>
  <h2>{{ section.settings.heading }}</h2>
  <div class="content"><p>{{ section.settings.body }}</p></div>
  <a class="button btn-outline">Learn more</a>
</div>
```

---

## 6. Rules recap

1. **Colors → tokens only.** No inline hex.
2. **Fonts → project tokens only.** No other font-family class.
3. **Sizes → utility.** `text-{n}` / `rounded-{n}` — any px value works.
4. **Spacing → utility.** `gap-X` / `px-X` / `py-X` — 1 unit = 1px.
5. **Layout → utility.** `flex` / `grid` / `container-80`.
6. **Bare `<h1>..<h6>` and `<p>` already styled** — use directly once section 2's table is filled in and defaults match Figma.
7. **Buttons → `.button` + variant.** No section-level button restyling.
8. **Richtext → `.content` wrapper.** Never scoped `p` selectors.
9. **`{% style %}` = last resort.** Comment WHY a utility can't do it.
10. **Merchant settings = color pickers + images + text + URLs.** Not font-size / spacing / font-family.

---

## 7. Figma → conversion workflow (with this cheatsheet)

When you share a Figma link + node ID, the process:

1. Fetch Figma → get spec (colors, fonts, sizes, layout).
2. Map every value to a token/utility from this cheatsheet.
3. If Figma introduces a new color/font not in tokens → ASK before adding.
4. Draft schema (only merchant-relevant settings — see rule #10).
5. Get schema approval.
6. Write Liquid with utility-first approach; scoped CSS only when justified.
7. Report which tokens/helpers used, and any scoped-CSS blocks + why.
