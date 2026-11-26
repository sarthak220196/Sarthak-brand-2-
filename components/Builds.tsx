"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projects, type ProjectStatus } from "@/data/site";
import SectionHead from "./SectionHead";

// Clearly labelled sample data for the timeline demo. Not real location history.
const SAMPLE = [
  { time: "08:10", place: "Home", x: 40, y: 120 },
  { time: "09:05", place: "Café", x: 120, y: 70 },
  { time: "10:00", place: "Office", x: 220, y: 92 },
  { time: "13:30", place: "Lunch", x: 290, y: 40 },
  { time: "19:45", place: "Dinner", x: 380, y: 112 },
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

/** Abstract: an AI answer where one cited source rises to the top. No real brands or data. */
function BubblesArt() {
  return (
    <div className="grid aspect-[16/9] place-items-center bg-cobalt p-6" aria-hidden>
      <svg viewBox="0 0 320 180" className="w-full max-w-md">
        <rect x="10" y="8" width="300" height="30" rx="15" fill="none" stroke="#F1EDE2" strokeWidth="1.5" />
        <circle cx="28" cy="23" r="5" fill="none" stroke="#F1EDE2" strokeWidth="1.5" />
        <rect x="42" y="20" width="120" height="6" fill="#F1EDE2" opacity="0.6" />
        <rect x="10" y="54" width="230" height="64" rx="18" fill="#F1EDE2" />
        {[0, 1, 2].map((k) => (
          <rect key={k} x="26" y={70 + k * 14} width={[190, 160, 120][k]} height="6" fill="#2B2B2E" opacity={0.75} />
        ))}
        <rect x="10" y="130" width="96" height="38" fill="#C8F135" />
        <text x="22" y="153" fontSize="13" fontWeight="700" fill="#000" style={{ fontFamily: "'Archivo Variable', Archivo, sans-serif" }}>
          Source 1
        </text>
        <rect x="114" y="130" width="96" height="38" fill="none" stroke="#F1EDE2" strokeOpacity="0.5" />
        <rect x="218" y="130" width="92" height="38" fill="none" stroke="#F1EDE2" strokeOpacity="0.3" />
      </svg>
    </div>
  );
}

const statusStyle: Record<ProjectStatus, string> = {
  Concept: "border border-dashed border-char",
  Experiment: "border border-char",
  Prototype: "bg-cobalt text-paper",
  Deployed: "bg-ink text-lime",
  "Shut down": "bg-char text-paper",
};
const statusMeaning: Record<ProjectStatus, string> = {
  Concept: "Explored on paper: positioning, use cases, go-to-market. No product built.",
  Experiment: "Built to learn how something works.",
  Prototype: "Built and demonstrable to others.",
  Deployed: "Live for real users.",
  "Shut down": "Built and run with real businesses, then closed.",
};

export default function Builds() {
  return (
    <section id="builds" aria-labelledby="builds-title" className="bg-bone">
      <div className="mx-auto max-w-grid px-5 py-28 md:px-10 md:py-36">
        <SectionHead
          id="builds-title"
          station="builds"
          width={118}
          title="The builder"
          intro={<p>Things I&apos;ve built outside my day job, from a curiosity experiment to a bootstrapped venture. Each one is labelled honestly, including the one we shut down.</p>}
        />

        <div className="mt-16">
          {projects.map((p, idx) => (
            <article key={p.name} className="grid gap-x-12 gap-y-8 border-t-2 border-ink py-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                  <span className={`inline-block px-2 py-0.5 font-semibold ${statusStyle[p.status]}`}>{p.status}</span>
                  <span className="text-mute">{statusMeaning[p.status]}</span>
                </p>
                <h3 className="mt-4 text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold leading-[1.02] tracking-tight" style={{ fontVariationSettings: '"wdth" 100' }}>
                  {p.name}
                </h3>
                <p className="serif mt-4 text-[1.15rem] leading-[1.55]">{p.summary}</p>
                {p.note && <p className="mt-4 border-l-2 border-cobalt pl-3 text-[16px] font-medium leading-snug">{p.note}</p>}
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
