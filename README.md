# Sarthak Sighat: personal site

Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lucide. Fonts are self-hosted.

## Where to edit things

| What | File |
|---|---|
| Email, LinkedIn, CV, booking link, site address | `site.config.ts` |
| Photos, education, your own bio | `site.config.ts` |
| Career, metrics, toolkit evidence, projects, interests, travel | `data/site.ts` |

Empty fields (`""`) are hidden. The CV button and photos only appear if the file really exists in `/public`. This is checked when the site builds, so a typo can't produce a broken link.

**Adding a photo:** upload it to `public/photos/` on GitHub, then set e.g. `portrait: { src: "/photos/portrait.jpg", alt: "Sarthak at ..." }`.
**Adding your CV:** upload the PDF to `public/`, then set `cv: "/sarthak-sighat-cv.pdf"`.

## Sections

| Station | Section | What it does |
|---|---|---|
| 88.0 | Intro | The statement tunes in word by word; four channels lock on |
| 92.4 | Journey | Five chapters, Build to Connect. Three are case studies (Creative Awards, Sprinto, PortOne). Each chapter links to the capabilities it proves |
| 96.1 | Markets | Dot-matrix world map; play the journey or explore a market |
| 99.9 | Toolkit | Six capabilities × where the evidence comes from. Dashed = pipeline only |
| 103.1 | Builder | Projects, labelled Concept / Experiment / Prototype / Deployed |
| 105.7 | Person | Portrait, bio, education, how I work, interests, the comeback, field notes |
| 108.0 | Let's talk | Email, LinkedIn, CV download |

## Keyboard

Ctrl/⌘ + K opens the quick menu. Arrow keys move through the toolkit and menus. Every control is reachable with Tab. There's one hidden word to type.

## Checks

`CONTENT_AUDIT.md` lists every date and metric checked against the brief, plus what's still needed.


## Motion polish (Version 4.1)

This iteration preserves the Version 4 content and design system while adding a restrained motion layer:

- A slim, spring-smoothed reading progress indicator at the top of the viewport.
- A subtle pointer-following light on fine-pointer desktop devices only.
- A light grain overlay for a more tactile editorial finish.
- Scroll-triggered section entrances with a small lift, focus and opacity transition.
- A quiet orbital composition behind the hero typography.
- Reduced-motion preferences are respected; decorative pointer effects are disabled when reduced motion is requested.

The new motion is intentionally atmospheric. It should support the content, not compete with it.
