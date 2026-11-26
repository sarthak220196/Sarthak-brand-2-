"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stages, type Stage, type StageId, type Status } from "@/data/site";
import { scrollToId } from "@/lib/events";
import SectionHead from "./SectionHead";
import StageVisual, { caption, type Palette } from "./StageVisual";

/**
 * One design system, five temperatures. Each chapter gets its own ground colour,
 * moving from light to dark as the work gets more complex, and its own type width:
 * the verbs literally widen from Build to Connect.
 */
interface Theme {
  band: string;
  text: string;
  muted: string;
  rule: string;
  figure: string;
  bullet: string;
  chipClosed: string;
  chipPipe: string;
  wdth: number;
  blueprint?: boolean;
  svg: Palette;
}

const themes: Record<StageId, Theme> = {
  build: {
    band: "bg-bone", text: "text-char", muted: "text-mute", rule: "border-char/20", figure: "text-cobalt", bullet: "bg-cobalt",
    chipClosed: "", chipPipe: "", wdth: 62, blueprint: true,
    svg: { fg: "#2B2B2E", accent: "#1E3FD8", soft: "rgba(30,63,216,0.55)", bg: "#E6E0D1" },
  },
  grow: {
    band: "bg-lime", text: "text-ink", muted: "text-ink/60", rule: "border-ink/20", figure: "text-ink", bullet: "bg-ink",
    chipClosed: "", chipPipe: "", wdth: 78,
    svg: { fg: "#000000", accent: "#1E3FD8", soft: "rgba(0,0,0,0.4)", bg: "#C8F135" },
  },
  lead: {
    band: "bg-char", text: "text-paper", muted: "text-paper/60", rule: "border-paper/15", figure: "text-lime", bullet: "bg-lime",
    chipClosed: "", chipPipe: "", wdth: 94,
    svg: { fg: "#F1EDE2", accent: "#C8F135", soft: "rgba(241,237,226,0.35)", bg: "#2B2B2E" },
  },
  sell: {
    band: "bg-cobalt", text: "text-paper", muted: "text-paper/70", rule: "border-paper/25", figure: "text-paper", bullet: "bg-lime",
    chipClosed: "", chipPipe: "", wdth: 110,
    svg: { fg: "#F1EDE2", accent: "#C8F135", soft: "rgba(241,237,226,0.45)", bg: "#1E3FD8" },
  },
  connect: {
    band: "bg-ink", text: "text-paper", muted: "text-paper/55", rule: "border-paper/15", figure: "text-lime", bullet: "bg-lime",
    chipClosed: "bg-lime text-ink", chipPipe: "border border-dashed border-paper/50 text-paper/85", wdth: 125,
    svg: { fg: "#F1EDE2", accent: "#C8F135", soft: "rgba(241,237,226,0.4)", bg: "#000000" },
  },
};

const statusLabel: Record<Status, string> = { closed: "Closed", pipeline: "In pipeline" };

export default function CareerEvolution() {
  const [active, setActive] = useState<StageId>("build");
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const rail = useRef<HTMLOListElement>(null);

  // on small screens, keep the active chapter visible in the scrolling rail
  useEffect(() => {
    const ol = rail.current;
    const btn = ol?.querySelector<HTMLElement>(`[data-rail="${active}"]`);
    if (!ol || !btn || ol.scrollWidth <= ol.clientWidth) return;
    ol.scrollTo({ left: btn.offsetLeft - 20, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.getAttribute("data-stage") as StageId)),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" aria-labelledby="work-title">
      <div className="mx-auto max-w-grid px-5 pb-20 pt-28 md:px-10 md:pt-36">
        <SectionHead
          id="work-title"
          station="work"
          title={stages.map((s) => (
            <span key={s.id} className="inline-block pr-[0.22em]" style={{ fontVariationSettings: `"wdth" ${themes[s.id].wdth}` }}>
              {s.verb}.
            </span>
          ))}
          intro={
            <p>
              Five chapters across seven companies. I&apos;ve changed companies more than once, and every date is here. What
              stayed constant is the direction: each move added a capability the next chapter needed.
            </p>
          }
        />
      </div>

      {/* Sticky chapter rail */}
      <nav aria-label="Career chapters" className="sticky top-16 z-40 border-y border-char/15 bg-paper/[0.95] backdrop-blur-md">
        <ol ref={rail} className="mx-auto flex max-w-grid overflow-x-auto px-5 md:px-10">
          {stages.map((s, i) => {
            const on = s.id === active;
            return (
              <li key={s.id} className="relative flex-1">
                <button
                  data-rail={s.id}
                  onClick={() => scrollToId(`ch-${s.id}`)}
                  aria-current={on ? "step" : undefined}
                  className={`flex w-full min-w-[6.5rem] items-baseline gap-2 py-3.5 pr-4 text-left transition-colors ${on ? "text-ink" : "text-mute hover:text-ink"}`}
                >
                  <span className="tabular text-xs">{i + 1}</span>
                  <span className={`text-[15px] ${on ? "font-bold" : "font-medium"}`} style={{ fontVariationSettings: `"wdth" ${themes[s.id].wdth}` }}>
                    {s.verb}
                  </span>
                  <span className="tabular hidden text-xs xl:inline">{s.years}</span>
                </button>
                {on && <motion.span layoutId="chapter-mark" className="absolute inset-x-0 -bottom-px h-[3px] bg-cobalt" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>

      {stages.map((s, i) => (
        <Chapter
          key={s.id}
          stage={s}
          index={i}
          theme={themes[s.id]}
          refCb={(el) => {
            refs.current[s.id] = el;
          }}
        />
      ))}
    </section>
  );
}

function Chapter({
  stage: s,
  index,
  theme: t,
  refCb,
}: {
  stage: Stage;
  index: number;
  theme: Theme;
  refCb: (el: HTMLElement | null) => void;
}) {
  const next = stages[index + 1];
  return (
    <article
      id={`ch-${s.id}`}
      data-stage={s.id}
      ref={refCb}
      aria-labelledby={`stage-${s.id}`}
      className={`relative scroll-mt-[52px] overflow-hidden ${t.band} ${t.text}`}
    >
      {t.blueprint && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(30,63,216,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,63,216,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      )}

      <div className="relative mx-auto grid max-w-grid gap-x-12 gap-y-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12">
        {/* The chapter */}
        <div className="lg:col-span-5">
          <p className={`tabular text-sm ${t.muted}`}>
            Chapter {index + 1} of {stages.length}, {s.years}
          </p>
          <h3
            id={`stage-${s.id}`}
            className="display mt-3 whitespace-nowrap"
            style={{
              fontVariationSettings: `"wdth" ${t.wdth}`,
              // wider cuts get a smaller size so every verb fills the same column
              fontSize: `clamp(3.2rem, ${(10.4 * Math.min(1, 74 / t.wdth)).toFixed(2)}vw, ${(9.5 * Math.min(1, 74 / t.wdth)).toFixed(2)}rem)`,
            }}
          >
            {s.verb}
          </h3>
          <p className="mt-5 text-lg font-semibold">{s.chapter}</p>
          <p className="serif mt-2 max-w-[26rem] text-[1.35rem] leading-[1.4]">{s.lesson}</p>

          <figure className="mt-10 max-w-[20rem]">
            <div className="aspect-square">
              <StageVisual stage={s.id} p={t.svg} />
            </div>
            <figcaption className={`mt-2 text-sm leading-snug ${t.muted}`}>{caption[s.id]}</figcaption>
          </figure>
        </div>

        {/* The evidence */}
        <div className="space-y-16 lg:col-span-7 lg:pt-9">
          {s.roles.map((r) => (
            <div key={r.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-current pb-4">
                <p className="text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-none tracking-tight" style={{ fontVariationSettings: '"wdth" 108' }}>
                  {r.company}
                </p>
                <p className="tabular text-[15px] font-medium">{r.dates}</p>
              </div>
              <p className="mt-4 font-semibold">{r.role}</p>
              {r.context && <p className={`text-sm ${t.muted}`}>{r.context}</p>}

              {r.figures && (
                <dl className={`mt-8 grid gap-x-8 gap-y-7 ${r.figures.length > 1 ? "sm:grid-cols-3" : ""}`}>
                  {r.figures.map((f) => (
                    <div key={f.value + f.label} className={`flex flex-col border-t pt-3 ${t.rule}`}>
                      <dt className={`order-2 mt-2 block text-[15px] leading-snug ${t.muted}`}>{f.label}</dt>
                      <dd
                        className={`display tabular -order-1 whitespace-nowrap ${(r.figures?.length ?? 0) > 1 ? "text-[clamp(2.4rem,3.3vw,3.2rem)]" : "text-[clamp(3rem,5.4vw,5rem)]"} ${t.figure}`}
                        style={{ fontVariationSettings: '"wdth" 76' }}
                      >
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {r.points.length > 0 && (
                <ul className="mt-8 space-y-2.5">
                  {r.points.map((pt) => (
                    <li key={pt} className="flex gap-3.5 text-[17px] leading-snug">
                      <span aria-hidden className={`mt-[0.6em] h-[2px] w-3.5 shrink-0 ${t.bullet}`} />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}

              {r.ledger && (
                <table className="mt-8 w-full text-left">
                  <caption className={`mb-3 text-left text-sm ${t.muted}`}>What&apos;s closed and what&apos;s still in progress</caption>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.ledger.map((l) => (
                      <tr key={l.text} className={`border-t ${t.rule}`}>
                        <td className="py-3.5 pr-4 text-[17px]">{l.text}</td>
                        <td className="py-3.5 text-right">
                          <span className={`inline-block whitespace-nowrap px-2.5 py-1 text-[13px] font-semibold ${l.status === "closed" ? t.chipClosed : t.chipPipe}`}>
                            {statusLabel[l.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {r.note && <p className={`serif mt-6 text-lg italic ${t.muted}`}>{r.note}</p>}
            </div>
          ))}

          <p className={`border-t pt-5 text-[15px] ${t.rule}`}>
            <span className={t.muted}>{next ? `Carried into ${next.verb}: ` : "Where it's heading: "}</span>
            <span className="font-semibold">{s.carriedForward}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
