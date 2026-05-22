# Cineva by Apex Sound & Light — Changelog

**Version:** 1.0 Draft  
**Date:** May 22, 2026  
**Designer:** Claude / directed by Alex Oliveira

---

## Design decisions

### Direction chosen
Mixed elements from wireframe Directions A ("The Manifest") and C ("The Volume") — type-dominant hero on ink, restrained visual density, editorial confidence. The site reads like a call sheet, not a brochure.

### Navigation
- **Lockup:** Full Cineva lockup PNG (tight variant, white) at 72px height in an 88px nav bar. Image-based rather than text to match the exact brand lockup.
- **Dropdown:** "What We Do" has a hover-triggered dropdown listing all six services, anticipating future individual service pages.
- **CTA:** "Contact" styled as the cyan accent button (moved from "Get a quote" per Alex's direction).
- No utility bar — simpler than the parent Apex site. Cineva is a tighter, more focused brand surface.

### Hero
- Type-only on ink. No hero image — matches the "road case, not brochure" mood. Photography can be added when available.
- H1 uses `--t-hero` (clamp 64px–160px) for maximum impact.
- Cyan period accent on "Budget." — brand signature.
- CTAs: "Who we are →" (cyan) + "What we do" (ghost). Changed from "Get a quote" per Alex's direction.

### Eyebrows
- Section eyebrows use Archivo 700, 0.2em tracking, uppercase — per brand spec.
- **Departed from brief:** Removed the numbered eyebrow pattern (`01 ──── LABEL`) per Alex's direction. Numbers and hairline rules were inherited from the brand guide but felt wrong on the website.

### Service architecture
- Homepage shows a 3×2 teaser grid linking to what-we-do.html.
- What We Do page has full service blocks (2-column: description + spec list).
- Service blocks structured with IDs for future individual service pages (Alex confirmed each service will be its own page).

### Our Work page
- **Departed from brief:** Restructured from a networks grid + credits list to a demo reel + case studies format. Hero demo reel slot at top, 2×2 project case study grid below, prominent 3×2 network name grid at bottom.
- All placeholder slots — ready for video embeds and project details.

### Four pillars
- Homepage: 4-column row with cyan top border (compact).
- About page: Full expanded blocks with left-aligned title + border accent, paragraph-length "why this matters" copy.

### Footer
- Minimal as specified: aperture mark SVG (inlined, currentColor) + "Cineva · by Apex Sound & Light" + © line.

### Typography
- Archivo for everything (display 900, headings 800, body 400/500).
- JetBrains Mono for specs, eyebrows, metadata, contact labels.
- No Bebas Neue on this site (reserved for parent Apex wordmark only).

### Colors
- Dark-only. Ink canvas, bone/mist/fog text hierarchy, cyan accent.
- Cyan used for CTAs, pillar top borders, period accents. Stage magenta not used in v1 — reserved for future "live/rolling" states.
- All values via CSS custom properties. No hard-coded hex in HTML.

---

## Departures from the brand kit

| What | Brief says | What we did | Why |
|---|---|---|---|
| Eyebrow numbers | `01 ──── LABEL` on every section | Removed numbers and hairline | Alex's direction — felt wrong on website |
| Hero CTA | "Get a quote →" | "Who we are →" | Alex's direction |
| Nav CTA | "Get a quote" button | "Contact" button | Alex's direction |
| Nav link | "Work" | "Our Work" | Alex's direction |
| Work page structure | Networks grid + credits placeholder | Demo reel + case studies + network grid | Alex's direction — future demo reels |
| Nav brand | Inline SVG mark + text | Lockup PNG image | Better fidelity to actual brand lockup |

---

## Files delivered

| File | Description |
|---|---|
| `styles.css` | Shared stylesheet — all tokens, components, responsive |
| `index.html` | Homepage — hero, services teaser, pillars, trusted-by, CTA |
| `what-we-do.html` | Six services with expanded copy and spec lists |
| `about.html` | Story, stats, prep bay placeholder, four pillars expanded |
| `work.html` | Demo reel slot, case study grid, network grid |
| `contact.html` | Phone, email, address, hours |
| `assets/` | Cineva mark, lockup, wordmark (SVG + PNG variants) |

---

## What's next

- Individual service pages (LED Volumes, Driving Plates, etc.)
- Real photography for hero, prep bay, case studies
- Demo reel video embeds
- Project case study content
- Network logo lockups (when client clearance is sorted)
- Favicon (aperture mark at 16px)
