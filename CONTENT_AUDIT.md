# Content audit

Every date and metric on the site, checked against the creative brief. Last checked before this release.

## Dates

| Company | On site | Brief | Match |
|---|---|---|---|
| Creative Awards & Rewards | 2019–2021 | 2019–2021 | Yes |
| Rocketium | Jan 2021 – Apr 2022 | January 2021 – April 2022 | Yes |
| Toddle | Apr 2022 – Mar 2023 | April 2022 – March 2023 | Yes |
| Sprinto | Mar 2023 – Apr 2024 | March 2023 – April 2024 | Yes |
| PortOne | Apr 2024 – Sep 2025 | April 2024 – September 2025 | Yes |
| Glomo | Sep 2025 – Feb 2026 | September 2025 – February 2026 | Yes |
| Unlimit | Apr 2026 – present | April 2026 – Present | Yes |

## Metrics

| Where | On site | Brief | Match |
|---|---|---|---|
| Creative Awards | $300K+ revenue, hospitals and airlines | Same | Yes |
| Rocketium | 190%+ of quota | 190%+ quota | Yes |
| Toddle | $300K+ outbound pipeline | Same | Yes |
| Toddle | 145%+ of quota, two consecutive quarters | Same | Yes |
| Toddle | +25% SQLs | Increased SQLs by 25% | Yes |
| Sprinto | 4 SDRs led and coached | Four SDRs | Yes |
| Sprinto | $300K+ qualified pipeline, APAC and USA | Same | Yes |
| Sprinto | +35% lead-to-meeting conversion | Improved by 35% | Yes |
| PortOne | $500K+ qualified pipeline, SEA, EU, USA | Same | Yes |
| PortOne | 90–104% of quarterly quota | Same | Yes |
| PortOne | $30K–$60K ARR contracts | Same | Yes |
| Glomo | 3 customers closed and onboarded | Three customers | Yes |
| Unlimit | 2 strategic partners closed | Two strategic partners | Yes |
| Unlimit | 2 enterprise merchants closed | Two enterprise merchants | Yes |
| Unlimit | Insurance, fashion and e-commerce, Mswipe, ecosystem relationships | All marked "In pipeline" | Yes |

## Direction 3.0 changes

- All DJ and music content removed: 19 references across 14 files, including the tagline, the DJ section, settings, the menu item, the "drop" easter egg and its sound, and the "Gig" stop in the sample timeline. A source search for dj, music, deck, mixer, gig, dance, Bollywood, Hollywood, artist and mashup now returns nothing.
- The case studies (Creative Awards, Sprinto, PortOne) use only lines from the brief. Their Outcome column shows the same verified figures as above.
- Every Toolkit evidence line maps to a fact in the brief. Pipeline items are marked "In pipeline" there too.
- "How I work" principles each cite a specific, supplied fact.
- The bio is built only from supplied facts until you write your own in `site.config.ts`.

## Still needed from Sarthak

1. **Photos:** a portrait, plus optionally one at work, one travelling and one of Mumbai. Real photos only.
2. **Education:** degree, institution and years.
3. **CV:** a PDF. Email and LinkedIn are now added.
4. **Job titles:** exact titles for Creative Awards & Rewards, Rocketium, Toddle, PortOne and Unlimit. The site currently describes the work instead.
5. **Chatterbubble details (optional):** your role (for example co-founder), the dates it ran, and whether "Nagent AI" was part of it. RememberMe is now confirmed as an Experiment with an MVP, and Chatterbubble as a venture that was shut down.
6. **Your own bio (optional):** a few lines in your voice, plus any personal background you'd like included (for example where you grew up or studied).
7. **Travel:** real places with a photo and a line each. The Field notes block stays hidden until there's at least one.

## Please confirm

1. **Overlap:** Creative Awards & Rewards ends in 2021 and Rocketium starts in January 2021. If Creative Awards ended in January 2021 or earlier, consider adding the month.
2. **Job titles:** only Sprinto ("SDR Manager") and Glomo ("Global Account Executive") came with titles. The others show a description of the work instead. Replace these with your exact titles in `data/site.ts`.
3. **Unlimit markets:** none were named, so the map shows Unlimit as global without plotting specific markets.
4. **Rocketium regions:** "new regions" weren't named, so Rocketium isn't on the map. The map notes this.
5. **Unlimit status:** when a pipeline item closes, change `"pipeline"` to `"closed"` in `data/site.ts`. Never before it's signed.

