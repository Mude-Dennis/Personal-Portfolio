# Dennis Kyule Muli — Personal Portfolio

A static personal portfolio website built with plain HTML, CSS, and vanilla
JavaScript — no frameworks, build tools, or dependencies required.

## Running it

Open `index.html` directly in any web browser. That's it — there's no build
step and nothing to install.

If you'd rather serve it locally (recommended for testing on mobile devices
on the same network), you can use any simple static server, for example:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000` in your browser.

## Project structure

```
personal-portfolio/
│
├── index.html        All page content and structure
├── style.css          All styling and design system (CSS variables at the top)
├── script.js          Mobile menu, scroll effects, and the project modal
│
├── images/            All images used on the site
│   ├── profile.svg
│   ├── project-farmers-help.svg
│   ├── project-chargeagain.svg
│   ├── project-greenhouse.svg
│   └── project-bornelabs.svg
│
└── README.md
```

## Design direction

This version uses a dark, editorial "engineering spec-sheet" look:

- A warm brass/gold accent (`#CDA05B`) on a near-black background, instead of
  boxed cards everywhere — most sections use numbered rows, thin dividing
  lines, and dotted "directory" leaders rather than heavy card surfaces.
- A serif display face (**Fraunces**) for headings and project names, paired
  with **Inter** for body copy and **JetBrains Mono** for technical labels,
  categories, dates, and tags.
- The hero and about portraits use an offset "frame behind frame" treatment
  instead of a plain bordered box.
- Projects are shown as large alternating feature rows (image/text swapping
  sides) rather than a grid of cards.
- Skills are laid out like a spec sheet: a category label on the left, pill
  tags on the right.

## Things you still need to fill in

Everything below was intentionally left as a clearly marked placeholder
rather than invented. Search the files for these and replace them:

**Images** (`/images` folder)
- `profile.svg` — replace with a real photo of yourself (e.g. `profile.jpg`),
  and update the `src` in `index.html` (there are two references: hero and
  about section).
- `project-*.svg` — replace with real project photos or renders. Update the
  matching `src` attributes in `index.html` and the `image` fields inside
  `projectData` in `script.js` (used by the project modal).

**Contact details** — search `index.html` for square-bracket placeholders:
- `[add email address]`
- `[add LinkedIn URL]` / `[add LinkedIn profile]`
- `[add GitHub URL]` / `[add GitHub profile]`
- `[add WhatsApp link]` / `[add WhatsApp number]`
- `[add city]`

**Dates** — in the Experience section, `[Add dates]` marks where your actual
attendance/attachment dates should go.

## Customizing the design

All design tokens (colors, fonts, spacing, radius) live at the top of
`style.css` inside `:root`. Changing a value there updates it everywhere:

```css
:root {
  --bg: #0B0C0F;         /* page background (near-black) */
  --surface: #16171C;    /* elevated surface (portrait frame, skill tags) */
  --ink: #F3F1EA;        /* primary text */
  --muted: #8E8B81;      /* secondary text */
  --accent: #CDA05B;     /* the one accent color used throughout */
  ...
}
```

Fonts are loaded from Google Fonts in the `<head>` of `index.html`:
- **Fraunces** — headings, project names, the hero title, the about "lead" line
- **Inter** — body copy
- **JetBrains Mono** — small technical labels, categories, dates, and tags

## Adding a new project

1. Add a project row inside `<div class="project-rows">` in `index.html`,
   following the existing `.project-row` markup pattern (rows alternate
   image/text sides automatically via `:nth-child(even)` in the CSS).
2. Add a matching entry to the `projectData` object near the top of
   `script.js` (the key must match the `data-open-project` /
   `data-project` attribute you used in the HTML) — this powers the
   "View project" modal with full details.
3. Add the project image to `/images`.

## Browser support

Built with standard, widely supported HTML5, CSS3 (including CSS custom
properties, `aspect-ratio`, and `backdrop-filter`), and ES5-compatible
vanilla JavaScript. Works in all current versions of Chrome, Firefox,
Safari, and Edge.
