"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { dj } from "@/data/site";
import { djLinks } from "@/lib/config";
import SectionHead from "./SectionHead";

/**
 * A teaser, not the full artist experience (that's a separate future site).
 * One small toy: a crossfader that blends the two worlds the mashups come from.
 */
export default function DjTeaser() {
  const [x, setX] = useState(50);
  // the letter swap happens in the middle of the fader, like a real transition
  const b = Math.min(1, Math.max(0, (x - 35) / 30));
  const a = 1 - b;
  const links = [
    djLinks.artistSite && { href: djLinks.artistSite, label: "Visit the artist site" },
    djLinks.mixes && { href: djLinks.mixes, label: "Listen to mixes" },
    djLinks.instagram && { href: djLinks.instagram, label: "Instagram" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <section id="dj" aria-labelledby="dj-title" className="bg-paper">
      <div className="mx-auto max-w-grid px-5 py-28 md:px-10 md:py-36">
        <SectionHead
          id="dj-title"
          station="dj"
          width={72}
          title="Things that shouldn't work together, but do."
          intro={<p>The other frequency. I DJ, with a particular interest in {dj.focus}.</p>}
        />

        {/* The blend */}
        <div className="mt-16 border-y-2 border-ink py-10 md:py-14">
          {/* Bollywood and Hollywood differ by one letter. The fader swaps it. */}
          <p
            aria-hidden
            className="display flex justify-center whitespace-nowrap text-[clamp(3.4rem,13vw,12rem)] text-ink"
            style={{ fontVariationSettings: `"wdth" ${Math.round(70 + Math.abs(x - 50) * 0.9)}` }}
          >
            {/* split-flap: B rolls up and out as H rolls in */}
            <span className="relative inline-grid overflow-hidden" style={{ lineHeight: 1.04 }}>
              <span className="col-start-1 row-start-1 text-cobalt" style={{ transform: `translateY(${-b * 100}%)` }}>B</span>
              <span className="col-start-1 row-start-1" style={{ transform: `translateY(${a * 100}%)` }}>H</span>
            </span>
            <span style={{ lineHeight: 1.04 }}>ollywood</span>
          </p>
          <p className="tabular mt-6 text-center text-sm text-mute" aria-hidden>
            {100 - x}% Bollywood, {x}% Hollywood
          </p>
          <label className="mx-auto mt-8 block max-w-xl text-ink">
            <span className="flex justify-between text-sm">
              <span>Bollywood</span>
              <span className="text-mute">Drag to blend</span>
              <span>Hollywood</span>
            </span>
            <input
              type="range"
              className="fader"
              min={0}
              max={100}
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              aria-label="Crossfader between Bollywood and Hollywood"
              aria-valuetext={`${100 - x}% Bollywood, ${x}% Hollywood`}
            />
          </label>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-3">
            <h3 className="text-sm text-mute">The story so far</h3>
            <ol className="mt-3">
              {dj.history.map((h, i) => (
                <li key={h} className="flex gap-5 border-b border-char/15 py-3.5 text-lg">
                  <span className="tabular w-5 shrink-0 text-cobalt">{i + 1}</span>
                  {h}
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className="text-sm text-mute">Setup</h3>
            <ul className="mt-3">
              {dj.setup.map((s) => (
                <li key={s} className="border-b border-char/15 py-3.5 text-lg font-semibold">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3">
              {links.length ? (
                links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border-2 border-ink px-4 py-3 font-semibold transition hover:bg-ink hover:text-paper"
                  >
                    {l.label} <ArrowUpRight size={17} aria-hidden />
                  </a>
                ))
              ) : (
                <p className="text-mute">The full artist site is in the works.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
