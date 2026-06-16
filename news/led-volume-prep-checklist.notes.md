# Article notes — led-volume-prep-checklist

Companion file for `led-volume-prep-checklist.html`. Holds the editorial notes and the image-generation prompts for this piece. One of these accompanies every article.

## Snapshot

- **Slug:** led-volume-prep-checklist
- **Headline:** What we check before an LED volume ships
- **Published:** 2026-06-15 (byline: Cineva crew)
- **Venue:** Cineva blog / news index (own channel, soft sell allowed)
- **Audience:** producers, line producers, DPs (informed buyer, not LED techs)
- **Depth:** moderate / informed-buyer
- **Length:** ~1,050 words body
- **Status:** rewritten from the original surface-level draft to trade-pub depth

## Editorial notes

- Angle: "lit" vs "ready" are different states; prep discipline moves failure points off the floor and into the Pickering warehouse where catching them is cheap.
- Structure: cold open on the lit/ready gap, three concrete failure modes, then the fixed pass in three sections (panels/spares, processing/color, cable/build-order), closing on the production report.
- Voice checks applied: call-sheet not catalog; full first mention "Cineva by Apex Sound & Light"; the four pillars land in the close (checked, clean, labeled, reachable); closes on the tagline "On set. On time. On Budget."
- No em dashes anywhere in the copy.
- Claims kept defensible: batch-matched spares, locked firmware, camera/frame-rate color profiles, continuity-tested cable, sequential build-order loading. No invented numbers or customer evidence.

## Image prompts

Do not reuse existing assets. Generate fresh figures from these. Photographic, documentary realism, dark industrial warehouse, natural cyan/magenta LED glow, shallow depth of field. No text, no logos, no watermarks, no visible faces/branding. 3:2 landscape unless noted.

### Figure 1 — hero / intro (replaces the current ledvolumes.webp)

> Documentary photograph of a single large-format LED video wall tile held on a calibration bench in a dim equipment warehouse, the panel glowing an even neutral grey under inspection, a technician's gloved hands steadying its edge, a probe or colorimeter resting on the surface, racks of cased panels softly out of focus behind, cool cyan rim light, realistic shadows, shot on a 50mm lens, shallow depth of field, no text or logos.

- Suggested filename: `prep-uniformity-check.webp`
- Caption: "Every tile gets a uniformity check on the bench before it is cased."

### Figure 2 — processing / color section

> Documentary photograph of a road-case rack of LED processors and a small calibration monitor in a dim warehouse, the monitor showing a neutral color-bar test pattern, status LEDs glowing cyan, neatly dressed signal cabling, a technician partly visible adjusting a setting, moody industrial lighting, shallow depth of field, realistic, no text or logos.

- Suggested filename: `prep-processor-rack.webp`
- Caption: "Processors leave the shop with firmware locked and color mapped to your camera."

### Figure 3 — cable / build-order section (REPLACEMENT — old wide-floor shot read as repetitive vs Figure 1)

New direction: go tight and detail-oriented instead of another wide warehouse view. Macro on the labeling/testing itself.

> Tight macro documentary photograph of a technician's hand wrapping a printed numbered ID label around a coiled black data cable, a cable continuity tester with a small glowing readout resting just behind, neatly bundled looms tagged by length softly out of focus, dark workbench surface, cool cyan accent light catching the connector, very shallow depth of field, realistic, no readable text, no logos, no watermark.

- Suggested filename: `prep-cable-label.webp`
- Caption: "Every run is tested and tagged by length before it goes in the case."
- Note: removed from the live article for now; drop the PNG in `news/assets/` and I'll convert + place it.

## Status

- All figures in `website/news/assets/` as WebP (q82). PNG sources deleted after conversion (standing rule).
  - Figure 1 `prep-uniformity-check.webp` — top figure (replaced ledvolumes.webp). LIVE.
  - Figure 3 `prep-cable-label.webp` — macro at the cable/build-order section (replaced the repetitive wide build-order shot). LIVE.
- Figure 2 (processor rack) not yet provided. Drop a PNG in `website/news/assets/` and I'll convert + place it at the processing section.
