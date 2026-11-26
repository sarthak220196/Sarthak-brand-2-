"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/site";
import SectionHead from "./SectionHead";

// Clearly labelled sample data for the timeline demo. Not real location history.
const SAMPLE = [
  { time: "08:10", place: "Home", x: 40, y: 120 },
  { time: "09:05", place: "Café", x: 120, y: 70 },
  { time: "10:00", place: "Office", x: 220, y: 92 },
  { time: "13:30", place: "Lunch", x: 290, y: 40 },
  { time: "19:45", place: "Gig", x: 380, y: 112 },
  { time: "23:50", place: "Home", x: 460, y: 62 },
];

function TimelineDemo() {
  const [i, setI] = useState(2);
  const pts = SAMPLE.slice(0, i + 1);
  const toPath = (arr: typeof SAMPLE) => arr.map((p, k) => `${k ? "L" : "M"}${p.x},${p.y}`).join(" ");
  return (
    <div className="bg-ink p-5 text-paper md:p-7">
      <svg viewBox="0 0 500 160" className="w-full" role="img" aria-label={`Sample day at ${SAMPLE[i].time}: ${SAMPLE[i].place}`}>
        <path d={toPath(SAMPLE)} fill="none" stroke="#F1EDE2" strokeOpacity={0.25} strokeWidth={1.5} strokeDasharray="3 6" />
        <path d={toPath(pts)} fill="none" stroke="#C8F135" strokeWidth={3} />
        {SAMPLE.map((p, k) => (
          <circle key={k} cx={p.x} cy={p.y} r={k === i ? 8 : 4.5} fill={k <= i ? (k === i ? "#C8F135" : "#F1EDE2") : "transparent"} stroke="#F1EDE2" strokeWidth={1.5} />
        ))}
      </svg>
      <label className="mt-3 block text-paper">
        <span className="flex justify-between text-sm">
          <span className="text-paper/60">Scrub a sample day</span>
          <span className="tabular font-semibold">
            {SAMPLE[i].time}, {SAMPLE[i].place}
          </span>
        </span>
        <input
          type="range"
          className="fader"
          min={0}
          max={SAMPLE.length - 1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-valuetext={`${SAMPLE[i].time}, ${SAMPLE[i].place}`}
        />
      </label>
      <p className="text-xs text-paper/45">Sample data for illustration. Not real location history.</p>
    </div>
  );
}

/** Abstract only: no invented features, users or claims. */
function BubblesArt() {
  return (
    <div className="grid aspect-[16/9] place-items-center bg-cobalt" aria-hidden>
      <svg viewBox="0 0 320 180" className="w-3/4">
        <rect x="20" y="24" width="150" height="44" rx="22" fill="#F1EDE2" />
        <rect x="150" y="80" width="150" height="44" rx="22" fill="#C8F135" />
        <rect x="40" y="136" width="96" height="30" rx="15" fill="none" stroke="#F1EDE2" strokeWidth="2" strokeDasharray="5 5" />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={64 + k * 22} cy={151} r="4" fill="#F1EDE2" />
        ))}
      </svg>
    </div>
  );
}

export default function Builds() {
  return (
    <section id="builds" aria-labelledby="builds-title" className="border-t border-char/15 bg-paper">
      <div className="mx-auto max-w-grid px-5 py-28 md:px-10 md:py-36">
        <SectionHead
          id="builds-title"
          station="builds"
          width={118}
          title="Built on the side"
          intro={<p>Experiments and concepts, not finished companies. I build to understand how things work.</p>}
        />

        <div className="mt-16">
          {projects.map((p, idx) => (
            <article key={p.name} className="grid gap-x-12 gap-y-8 border-t-2 border-ink py-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-sm">
                  <span className={`inline-block px-2 py-0.5 font-semibold ${p.kind === "Experiment" ? "bg-ink text-lime" : "border border-dashed border-char"}`}>
                    {p.kind}
                  </span>
                </p>
                <h3 className="mt-4 text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold leading-[1.02] tracking-tight" style={{ fontVariationSettings: '"wdth" 100' }}>
                  {p.name}
                </h3>
                <p className="serif mt-4 text-[1.15rem] leading-[1.55]">{p.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Built with">
                  {p.stack.map((s) => (
                    <li key={s} className="border border-char/25 px-2.5 py-1 text-[13px]">
                      {s}
                    </li>
                  ))}
                </ul>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 font-semibold underline decoration-cobalt decoration-2 underline-offset-4">
                    See the project <ArrowUpRight size={16} aria-hidden />
                  </a>
                )}
              </div>
              <div className="lg:col-span-6 lg:col-start-7">{idx === 0 ? <TimelineDemo /> : <BubblesArt />}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
