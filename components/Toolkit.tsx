"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { paymentsDepth, toolkit, type CapabilityId } from "@/data/site";
import { on } from "@/lib/events";
import SectionHead from "./SectionHead";

/** Columns in career order, plus the non-job sources of evidence. */
const COLUMNS = [
  { key: "Creative Awards & Rewards", short: "CAR", year: "2019" },
  { key: "Rocketium", short: "RKT", year: "2021" },
  { key: "Toddle", short: "TDL", year: "2022" },
  { key: "Sprinto", short: "SPR", year: "2023" },
  { key: "PortOne", short: "PO1", year: "2024" },
  { key: "Glomo", short: "GLM", year: "2025" },
  { key: "Unlimit", short: "UNL", year: "2026" },
  { key: "Education", short: "EDU", year: "" },
  { key: "Side projects", short: "LAB", year: "" },
];

type Cell = "proven" | "pipeline" | null;

function cell(capId: CapabilityId, company: string): Cell {
  const ev = toolkit.find((c) => c.id === capId)!.evidence.filter((e) => e.company === company);
  if (!ev.length) return null;
  return ev.some((e) => !e.pipeline) ? "proven" : "pipeline";
}

export default function Toolkit() {
  const reduce = useReducedMotion();
  const [sel, setSel] = useState<CapabilityId>("commercial");
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Journey chapters can send visitors here with a capability pre-selected
  useEffect(
    () =>
      on("toolkit:select", (id) => {
        if (id && toolkit.some((c) => c.id === id)) setSel(id as CapabilityId);
      }),
    [],
  );

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = toolkit.length;
    let j = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") j = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") j = (i - 1 + n) % n;
    if (e.key === "Home") j = 0;
    if (e.key === "End") j = n - 1;
    if (j >= 0) {
      e.preventDefault();
      setSel(toolkit[j].id);
      tabs.current[toolkit[j].id]?.focus();
    }
  };

  const cap = toolkit.find((c) => c.id === sel)!;
  const companies = Array.from(new Set(cap.evidence.map((e) => e.company)));

  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="bg-paper">
      <div className="mx-auto max-w-grid px-5 py-28 md:px-10 md:py-36">
        <SectionHead
          id="toolkit-title"
          station="toolkit"
          width={125}
          title="The toolkit"
          intro={
            <p>
              Six capabilities that travel across industries, each backed by work I&apos;ve actually done. Pick one to see the
              evidence. Dashed marks are work in progress, not results.
            </p>
          }
        />

        <div className="mt-16 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* Matrix: rows are capabilities (tabs), columns are where the evidence comes from */}
          <div className="min-w-0 lg:col-span-6">
            <div className="overflow-x-auto">
              <div className="min-w-[320px]">
                <div className="grid grid-cols-[minmax(5.75rem,1fr)_repeat(9,minmax(1.3rem,2.4rem))] items-end gap-x-1 pb-2 text-[10px] text-mute" aria-hidden>
                  <span />
                  {COLUMNS.map((c) => (
                    <span key={c.key} className="flex flex-col items-center leading-tight" title={c.key}>
                      <span className="tabular">{c.year || "\u00a0"}</span>
                      <span className="font-semibold text-char">{c.short}</span>
                    </span>
                  ))}
                </div>
                <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" className="border-t-2 border-ink">
                  {toolkit.map((c, i) => {
                    const on = c.id === sel;
                    return (
                      <button
                        key={c.id}
                        ref={(el) => {
                          tabs.current[c.id] = el;
                        }}
                        role="tab"
                        id={`tab-${c.id}`}
                        aria-selected={on}
                        aria-controls="toolkit-panel"
                        tabIndex={on ? 0 : -1}
                        onClick={() => setSel(c.id)}
                        onKeyDown={(e) => onKey(e, i)}
                        className={`grid w-full grid-cols-[minmax(5.75rem,1fr)_repeat(9,minmax(1.3rem,2.4rem))] items-center gap-x-1 border-b border-char/15 py-3 text-left transition-colors ${
                          on ? "bg-ink text-paper" : "hover:bg-bone"
                        }`}
                      >
                        <span className={`truncate pl-2 pr-1 text-[14px] md:text-[15px] ${on ? "font-bold" : "font-medium"}`} style={{ fontVariationSettings: `"wdth" ${on ? 100 : 92}` }}>
                          {c.short}
                        </span>
                        {COLUMNS.map((col) => {
                          const v = cell(c.id, col.key);
                          return (
                            <span key={col.key} className="flex justify-center" aria-hidden>
                              {v === "proven" && <span className={`block h-3.5 w-3.5 ${on ? "bg-lime" : "bg-cobalt"}`} />}
                              {v === "pipeline" && <span className={`block h-3.5 w-3.5 border border-dashed ${on ? "border-lime" : "border-char"}`} />}
                              {!v && <span className={`block h-[3px] w-[3px] ${on ? "bg-paper/30" : "bg-char/20"}`} />}
                            </span>
                          );
                        })}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-mute">
              <span className="flex items-center gap-1.5"><span className="block h-2.5 w-2.5 bg-cobalt" aria-hidden /> Evidence</span>
              <span className="flex items-center gap-1.5"><span className="block h-2.5 w-2.5 border border-dashed border-char" aria-hidden /> In pipeline only</span>
              <span>Columns run in career order, then education and side projects. Arrow keys move between rows.</span>
            </p>
          </div>

          {/* Detail */}
          <div id="toolkit-panel" role="tabpanel" aria-labelledby={`tab-${sel}`} className="min-w-0 lg:col-span-6" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={sel}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="display text-balance text-[clamp(2.2rem,4vw,3.6rem)]" style={{ fontVariationSettings: '"wdth" 92' }}>
                  {cap.name}
                </h3>
                <p className="serif mt-4 max-w-[30rem] text-[1.25rem] leading-[1.45]">{cap.summary}</p>

                <p className="mt-8 text-sm text-mute">Useful when you need</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {cap.usefulFor.map((u) => (
                    <li key={u} className="bg-lime px-3 py-1.5 text-[15px] font-medium text-ink">
                      {u}
                    </li>
                  ))}
                </ul>

                <p className="mt-9 text-sm text-mute">The evidence</p>
                <ul className="mt-2">
                  {companies.map((co) => (
                    <li key={co} className="grid gap-x-6 gap-y-1 border-t border-char/15 py-4 sm:grid-cols-[9rem_1fr]">
                      <p className="font-bold" style={{ fontVariationSettings: '"wdth" 104' }}>{co}</p>
                      <ul className="space-y-1.5">
                        {cap.evidence
                          .filter((e) => e.company === co)
                          .map((e) => (
                            <li key={e.text} className="text-[16px] leading-snug">
                              {e.text}
                              {e.pipeline && (
                                <span className="ml-2 inline-block whitespace-nowrap border border-dashed border-char px-1.5 text-[12px] font-semibold">
                                  In pipeline
                                </span>
                              )}
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Domain depth */}
        <div className="mt-24 grid gap-8 border-t-2 border-ink pt-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold" style={{ fontVariationSettings: '"wdth" 108' }}>Domain depth</h3>
            <p className="mt-2 text-[15px] text-mute">From the fintech and payments chapters at PortOne, Glomo and Unlimit.</p>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
            {paymentsDepth.map((d) => (
              <li key={d} className="border-b border-char/15 py-3 text-[1.1rem]" style={{ fontVariationSettings: '"wdth" 104' }}>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
