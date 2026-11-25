# Caprine

Marketing site for **Caprine**, a company builder that partners with resilient founders to build for meaningful, lasting value.

A single, scroll-driven landing page built with React, TypeScript and Vite, animated with GSAP. This document covers both how the project is built and the design language behind it.

---

## Contents

- [Getting started](#getting-started)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Page anatomy](#page-anatomy)
- [Design language](#design-language)
  - [Principles](#principles)
  - [Colour](#colour)
  - [Typography](#typography)
  - [Grid & layout](#grid--layout)
  - [Surfaces & components](#surfaces--components)
  - [Linework](#linework)
  - [Imagery](#imagery)
- [Motion](#motion)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Conventions](#conventions)
- [Content](#content)
- [Fonts & licensing](#fonts--licensing)

---

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check and production build into dist/
npm run preview    # serve the production build
npm run lint       # oxlint
```

To pin the dev server to a specific port:

```bash
npx vite --port 5199 --strictPort
```

---

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Animation | GSAP 3 with ScrollTrigger, SplitText, CustomEase and `@gsap/react` (`useGSAP`) |
| Styling | Plain CSS, one file per component, global design tokens as CSS custom properties |
| Linting | oxlint |

There is no CSS framework, router or state library. The site is one page, and every section is a self-contained component.

---

## Project structure

```
src/
├── main.tsx                 entry point
├── App.tsx
├── pages/
│   └── Home/                page composition, scroll reveals, serif slant, hero cursor drift
├── components/
│   ├── Loader/              intro animation: logo tilts, lines draw, wipe into the hero
│   ├── Header/              hero logo and brand line
│   ├── Navbar/              fixed bar: docking goat, menu button, progressive blur
│   ├── Menu/                full-screen menu with upright → Turbo hover morph
│   ├── Hero/
│   ├── About/
│   ├── Featured/            "Our model": mountain photo with route steps as glass pills
│   ├── Model/               "Portfolio": dark card featuring AGORA SecureWare
│   ├── Testimonials/        two-column marquee with drag, momentum and keyboard control
│   ├── TestimonialCard/
│   ├── Panorama/
│   ├── Founder/
│   ├── Footer/              contact section and the CAPRINE wordmark
│   ├── Contour/             animated dashed contour line
│   ├── SectionLabel/        the filled-dot section indicator
│   ├── GlassButton/
│   ├── StepPill/
│   ├── Goat/  Logo/  MenuIcon/
├── data/
│   └── testimonials.ts      testimonial content
├── lib/
│   ├── gsap.ts              plugin registration and the shared `EASE_OUT` curve
│   └── parallax.ts          shared parallax helper and reduced-motion query
├── styles/
│   └── global.css           fonts, design tokens, reset, type classes
└── assets/
    ├── fonts/
    ├── icons/
    └── images/
```

> Naming note: `Featured` renders the **Our model** section and `Model` renders the **Portfolio** section. The content was swapped late in the project while the layouts stayed in place.

---

## Page anatomy

| # | Section | id | Navbar theme |
| --- | --- | --- | --- |
| 1 | Loader → Hero | `top` | dark |
| 2 | About | `about` | dark |
| 3 | Our model | `model` | light, dark over the photo |
| 4 | Portfolio (AGORA SecureWare) | `portfolio` | light, dark over the card |
| 5 | Testimonials | `testimonials` | light |
| 6 | Panorama | — | — |
| 7 | Founder | `founder` | light |
| 8 | Contact / Footer | `contact` | light |

Each section declares `data-nav-theme`. The navbar samples the theme under each of its icons, so the goat and the menu button switch between ink and white on their own as they cross section edges.

---

## Design language

### Principles

- **Altitude.** The brand story is a climb. Mountains, contour lines and a step-by-step route turn "building a company" into "reaching a summit together".
- **Quiet confidence.** The palette is restrained, type is set at generous sizes, and there is plenty of negative space. Nothing shouts.
- **Two voices.** A precise grotesk carries information. An expressive italic serif carries the brand's personality.
- **Motion with weight.** Everything eases out on one shared curve and settles softly. Motion reveals content; it never decorates for its own sake.
- **Glass over landscape.** Interface elements float on photography as translucent, blurred surfaces, so the landscape always shows through.

### Colour

All colours are tokens in `src/styles/global.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--color-ink` | `#212121` | Primary dark: text, dark sections, menu |
| `--color-ink-deep` | `#1e1e1e` | Deeper dark for layered surfaces |
| `--color-white` | `#ffffff` | Text on dark and imagery, light backgrounds |
| `--color-surface` | `#f7f7f7` | Soft light surface |
| `--color-grey` | `#9a9a9a` | Secondary text, hairlines, dashed lines |
| `--color-mist` | `#d4d4d4` | Muted light tone |
| `--color-fog` | `#d8d8d8` | Muted light tone |
| `--color-steel` | `#315572` | Sky-blue depth; menu gradient end |
| `--color-sky` | `#3c79aa` | Brighter sky blue |
| `--color-sand` | `#dfb38d` | Warm dusk; top of the footer gradient |
| `--color-earth` | `#714c32` | Warm rock; footer gradient middle |
| `--color-line` | `rgba(154,154,154,.5)` | Faint dividers |
| `--color-glass` | `rgba(0,0,0,.15)` | Tinted glass fill |
| `--color-glass-soft` | `rgba(0,0,0,.12)` | Softer glass fill |
| `--color-glass-faint` | `rgba(0,0,0,.02)` | Barely-there glass fill |

The palette comes straight from the landscape: **ink** for rock and night, **steel and sky** for altitude, and **sand and earth** for dusk light at the base of the mountain. The page moves from cool at the top (hero, menu) to warm at the end (footer), as if the day ends on the summit.

Gradients used:

- **Menu:** ink → ink (35%) → steel (135%)
- **Footer:** sand → earth (70%) → ink

### Typography

There are two families with three faces.

| Family | Use |
| --- | --- |
| **ABC Monument Grotesk** (variable) | Body copy, captions, UI, highlight paragraphs |
| **ABC Synt** italic | Titles and sub-titles: the brand voice |
| **ABC Synt Turbo** | Display moments: the footer wordmark, menu hover state, favicon "C" |

Type scale (fluid, calibrated to a 1280px frame):

| Class | Font | Size (min → max) | Line height | Notes |
| --- | --- | --- | --- | --- |
| `.title` | Synt italic | 36 → 61px | 1 | Hero headline, section headings, menu links |
| `.sub-title` | Synt italic | 18 → 24px | 1.125 | Uppercase statements |
| `.highlight-paragraph` | Monument | 18 → 26px | 1.115 | Lead paragraphs, auto-hyphenated |
| `.paragraph` | Monument | 14 → 15px | 1.2 | Body copy |
| `.caption` | Monument Medium | 12 → 13px | 1.23 | Uppercase labels and metadata |

Sizes use `clamp()` so type scales smoothly between phone and desktop. Above 1441px the root font size grows gradually, capped at 118.75%, so large displays keep the same proportions instead of looking empty.

Typographic details:

- **Serif text is always italic.** On scroll, serif words start upright and slant into italic just after they reveal. This is the signature typographic gesture.
- **Upright → Turbo morph.** Menu links swap from Synt into Synt Turbo on hover with a skew, echoing the loader.
- **First-line indent.** Lead paragraphs indent by one grid column instead of using a paragraph space.
- **Balanced wrapping** (`text-wrap: balance`) on headlines and hero copy to avoid widows.

### Grid & layout

A 12-column grid, based on the 1280px design frame:

| Token | Value |
| --- | --- |
| Columns | 12 |
| Margin | 20px → 50px (`--grid-margin`) |
| Gutter | 12px → 20px (`--grid-gutter`) |

Use the `.grid` utility class. The recurring layout is:

- **Label** in columns 1–4, top-aligned
- **Content** in columns 5–12

On phones (≤767px) everything collapses to full width and stacks label → content. The hero fills the viewport (`100svh`). Photo sections bleed edge to edge.

### Surfaces & components

**Section label** (`SectionLabel`). An 11px filled circle followed by an uppercase caption. It marks the start of each section and comes in light and dark tones.

**Glass** (`GlassButton`, `StepPill`, AGORA badge). These use a translucent black fill, a hairline grey border (`--border-glass`), and a 15px backdrop blur (`--glass-blur`). Radii:

| Token | Value |
| --- | --- |
| `--radius-sm` | 9px |
| `--radius-md` | 12px |
| `--radius-lg` | 16px |
| `--radius-xl` | 20px |

Glass buttons come in `faint`, `tinted` and `bare` variants, optionally with a leading dot.

**Navbar.** A fixed bar with a progressive blur built from four stacked `backdrop-filter` layers with staggered masks. The blur fades in with scroll. The goat docks into the bar once the hero logo scrolls away.

**Menu.** A full-screen overlay with a cool gradient. Links are numbered and spaced by hairlines. Hovering one dims the others.

**Goat.** The brand mark: a mountain goat. It appears in the loader, the navbar, the menu and the footer.

### Linework

Thin grey lines run across the whole site as contour lines, flight paths and grid overlays.

- **Dashed contours** (`Contour`) cross the hero, about and menu at a shallow ~15° angle and march slowly. Different lines move at different speeds to suggest depth.
- **Grid overlays** on the mountain photo and the Portfolio card. Each is split into a static layer and a dashed layer.
- **Hairlines** at 0.5px in grey divide menu items and outline glass surfaces.

### Imagery

- Large mountain photography, shown edge to edge, often with sky and summit separated into layers for parallax.
- Formats: WebP, with JPG/PNG fallbacks in `src/assets/images`.
- Interface elements float over the photos as glass, never as solid blocks.

---

## Motion

All motion uses GSAP. One shared curve keeps everything coherent:

```
caprine-out = cubic-bezier(0.16, 1, 0.3, 1)
```

It is available as `EASE_OUT` in JS and `--ease-out` in CSS.

| Moment | Behaviour |
| --- | --- |
| **Loader** | The logo tilts, then travels into its header position while the brand lines draw. A clip-path wipe hands over to the hero. |
| **Text reveal** | Blocks rise 40px while a clip-path opens from the bottom, staggered 0.08s, 1.1s duration, triggered at 90% of the viewport. |
| **Serif slant** | After the reveal, serif words skew from upright into italic (0.7s). |
| **Hero cursor drift** | The hero gently follows the pointer, staggered across layers. |
| **Parallax** | A shared helper in `lib/parallax.ts` drives subtle scrubbed depth on media, line art and the Portfolio content. It runs on desktop only. |
| **Dashed lines** | Compositor-only CSS animations that translate repeating gradients. |
| **Navbar** | The goat slides up into the bar. The blur intensity is tied to scroll. Icons recolour per section. |
| **Testimonials** | A slow continuous marquee you can drag, with momentum and arrow-key control. |

To add parallax:

```ts
import { MOTION_OK, parallax } from '../../lib/parallax'

mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
  parallax(element, { trigger: section, from: 0.05, to: -0.05 })
})
```

`from` and `to` are fractions of the viewport height, capped by width, so depth feels the same on any screen.

---

## Accessibility

- Every animation sits behind `prefers-reduced-motion: no-preference`. With reduced motion on, content shows immediately and nothing drifts.
- Semantic landmarks are used. Sections are labelled by their section labels (`aria-labelledby`).
- The menu is a real dialog: `aria-expanded` and `aria-controls` on the toggle, focus handling, and scroll lock while it is open.
- Visible focus rings (1px white outline) are provided on interactive elements.
- SplitText is created with `aria: 'none'`, and the original text stays readable for screen readers.
- Scrollbars are visually hidden, but scrolling still works with keyboard, wheel and touch.

---

## Performance

- Dashed lines are CSS gradient strips moved with `transform`. Animating SVG `stroke-dashoffset` inside `<img>` caused heavy repaints, especially in Firefox, and was replaced.
- Line art is split into static and animated layers, so only the dashes repaint.
- Parallax uses scrubbed transforms with `will-change`. It is disabled on smaller screens.
- The navbar recolours using a single `requestAnimationFrame` per scroll.
- Images are served as WebP.

---

## Conventions

- **One folder per component or page**, each containing its `.tsx` and its own `.css`.
- **Design tokens live in `src/styles/global.css`.** Use tokens; do not hard-code colours, radii or type sizes.
- **Shared type classes** are `.title`, `.sub-title`, `.highlight-paragraph`, `.paragraph` and `.caption`.
- **No code comments.** Names carry the meaning.
- **BEM-style class names** (`block__element--modifier`).
- New reveal targets must be added to `REVEAL_TARGETS` in `src/pages/Home/Home.tsx`.
- New sections need an `id`, a `data-nav-theme`, and a link in `Menu.tsx` if they belong in the menu.

---

## Content

- **Testimonials** live in `src/data/testimonials.ts`, split into two columns. Each entry has `firstName`, `lastName`, an optional `title` and an optional `quote`. Entries without a quote are hidden automatically.
- **Contact:** info@caprine.io
- **Portfolio link:** https://www.agora-secureware.com/

---

## Fonts & licensing

The repository currently ships **trial** versions of ABC Monument Grotesk and ABC Synt (Dinamo). Trial fonts are not licensed for production use. Buy the licences and replace the files in `src/assets/fonts/` before launch.

---

© Caprine. All rights reserved.
