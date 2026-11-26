# Several Frequencies: the Sarthak Sighat site

Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lucide. Fonts are self-hosted (Archivo variable width, Newsreader), so nothing loads from Google.

## Where to edit things

| What | File |
|---|---|
| Email, LinkedIn, CV, booking link, DJ links, site address | `site.config.ts` |
| Career, metrics, projects, travel, all other copy | `data/site.ts` |

Any field left as `""` in `site.config.ts` is hidden. Nothing broken or fake is ever shown.

On GitHub: open the file, click the pencil icon, edit, then click "Commit changes". Vercel updates the site in a minute or two.

## Run locally (optional)

```bash
npm install
npm run dev
```

## What's on the page

- **Hello:** the tagline tunes in, with each line stretching from condensed to wide.
- **Work:** five chapters, each with its own colour, getting darker as the work gets more complex. The verbs widen from Build to Connect. A sticky chapter rail lets you jump between them.
- **Network:** a dot-matrix world map. "Play the journey" lights markets up company by company. Every market can be selected by mouse, keyboard or the list.
- **Comeback:** a three-part scroll story (Pause, Rebuild, Play) over a waveform that flatlines and returns unevenly.
- **DJ:** a teaser with a Bollywood/Hollywood fader. The full artist experience is planned as a separate site; link it in `site.config.ts` when it exists.
- **Builds, Field notes, Say hi.**

## Keyboard

- Ctrl or ⌘ + K: quick menu
- Arrow keys, Enter, Esc inside menus
- Tab reaches every control, including the markets on the map
- Type "drop" anywhere for the easter egg

See `CONTENT_AUDIT.md` for the date and metric checks.
