"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp, Radio, Volume2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { stations, type StationId } from "@/data/site";
import { scrollToId } from "@/lib/events";

/** A tactile little tuner: every detent is a real section of the site. */
export default function FrequencyRotor() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<StationId>("top");
  const [expanded, setExpanded] = useState(false);
  const index = Math.max(0, stations.findIndex((s) => s.id === active));
  const current = stations[index] ?? stations[0];
  const angle = -132 + (index / Math.max(1, stations.length - 1)) * 264;

  useEffect(() => {
    const elements = stations
      .map((station) => document.getElementById(station.id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id as StationId);
      },
      { rootMargin: "-32% 0px -52% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const tune = useCallback((nextIndex: number) => {
    const safeIndex = Math.min(stations.length - 1, Math.max(0, nextIndex));
    const station = stations[safeIndex];
    if (!station) return;
    setActive(station.id);
    scrollToId(station.id);
  }, []);

  const tickAngles = useMemo(() => Array.from({ length: 27 }, (_, i) => -132 + i * 10), []);

  return (
    <>
    <div className="frequency-rotor fixed bottom-5 right-5 z-[65] hidden sm:block" aria-label="Interactive frequency tuner">
      <motion.div
        layout
        className="w-[286px] overflow-hidden border border-paper/15 bg-char text-paper shadow-[0_18px_60px_rgba(0,0,0,.22)]"
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between border-b border-paper/10 px-4 py-3">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-paper/55">
            <Radio size={13} className="text-lime" /> Personal frequency
          </div>
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[.16em] text-lime"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> On air</span>
        </div>

        <div className="flex items-center gap-4 px-4 py-3">
          <div className="relative h-[118px] w-[118px] shrink-0" role="group" aria-label="Frequency dial">
            <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
              <circle cx="60" cy="60" r="49" fill="#202023" stroke="rgba(241,237,226,.16)" strokeWidth="1" />
              <circle cx="60" cy="60" r="39" fill="none" stroke="rgba(241,237,226,.09)" strokeWidth="1" />
              {tickAngles.map((tick, i) => {
                const rad = (tick * Math.PI) / 180;
                const major = i % 3 === 0;
                const x1 = 60 + Math.cos(rad) * 43;
                const y1 = 60 + Math.sin(rad) * 43;
                const x2 = 60 + Math.cos(rad) * (major ? 35 : 38);
                const y2 = 60 + Math.sin(rad) * (major ? 35 : 38);
                return <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2} stroke={major ? "#c8f135" : "rgba(241,237,226,.42)"} strokeWidth={major ? 1.8 : 1} strokeLinecap="round" />;
              })}
              <g transform={`rotate(${angle} 60 60)`}>
                <path d="M60 18 L55 60 L65 60 Z" fill="#c8f135" />
                <circle cx="60" cy="60" r="5" fill="#c8f135" stroke="#202023" strokeWidth="2" />
              </g>
              <circle cx="60" cy="60" r="29" fill="#2b2b2e" stroke="rgba(241,237,226,.18)" />
              <circle cx="60" cy="60" r="23" fill="url(#rotorGlow)" />
              <defs><radialGradient id="rotorGlow"><stop stopColor="#45454a"/><stop offset="1" stopColor="#252528"/></radialGradient></defs>
            </svg>
            <button
              type="button"
              onClick={() => tune((index + 1) % stations.length)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowDown") { event.preventDefault(); tune(index - 1); }
                if (event.key === "ArrowRight" || event.key === "ArrowUp") { event.preventDefault(); tune(index + 1); }
              }}
              className="absolute inset-[28%] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
              aria-label={`Tune next station. Currently ${current.freq} megahertz, ${current.label}`}
              title="Click to tune to the next station"
            />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] tracking-[.18em] text-paper/35">TURN TO TUNE</span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="tabular text-[10px] tracking-[.22em] text-paper/45">NOW PLAYING</div>
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial={reduce ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.22 }}>
                <p className="tabular mt-1 text-[29px] font-semibold leading-none tracking-[-.06em] text-lime">{current.freq}</p>
                <p className="mt-1 truncate text-[15px] font-semibold">{current.label}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-3 flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 16 }, (_, i) => <span key={i} className="w-[3px] rounded-full bg-lime/80" style={{ height: `${5 + ((i * 7 + index * 3) % 13)}px`, opacity: i < 11 ? 0.9 : 0.35 }} />)}
              <Volume2 size={12} className="ml-1 text-paper/35" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-paper/10 px-4 py-2.5">
          <button type="button" onClick={() => tune(index - 1)} disabled={index === 0} className="flex items-center gap-1 text-[10px] uppercase tracking-[.14em] text-paper/60 transition hover:text-lime disabled:opacity-25"><ChevronDown size={13} /> Previous</button>
          <button type="button" onClick={() => setExpanded((value) => !value)} className="text-[10px] uppercase tracking-[.14em] text-paper/45 transition hover:text-lime" aria-expanded={expanded}>{expanded ? "Close stations" : "All stations"}</button>
          <button type="button" onClick={() => tune(index + 1)} disabled={index === stations.length - 1} className="flex items-center gap-1 text-[10px] uppercase tracking-[.14em] text-paper/60 transition hover:text-lime disabled:opacity-25">Next <ChevronUp size={13} /></button>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.ol initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-paper/10">
              {stations.map((station, stationIndex) => (
                <li key={station.id}>
                  <button type="button" onClick={() => { tune(stationIndex); setExpanded(false); }} className={`flex w-full items-center gap-3 px-4 py-2 text-left text-xs transition hover:bg-paper/5 ${station.id === active ? "text-lime" : "text-paper/65"}`}>
                    <span className="tabular w-10">{station.freq}</span><span>{station.label}</span>{station.id === active && <span className="ml-auto text-[9px] uppercase tracking-widest">Tuned</span>}
                  </button>
                </li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
      </motion.div>
    </div>

    <div className="fixed inset-x-3 bottom-3 z-[65] flex items-center justify-between gap-3 border border-paper/15 bg-char px-3 py-2.5 text-paper shadow-[0_12px_40px_rgba(0,0,0,.22)] sm:hidden" aria-label="Frequency tuner">
      <button type="button" onClick={() => tune(index - 1)} disabled={index === 0} aria-label="Previous frequency" className="rounded-full p-2 text-paper/65 disabled:opacity-25"><ChevronDown size={17} /></button>
      <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} className="min-w-0 flex-1 text-left">
        <span className="block text-[9px] uppercase tracking-[.18em] text-paper/40">Tuned in · {current.freq} MHz</span>
        <span className="block truncate text-sm font-semibold text-lime">{current.label}</span>
      </button>
      <span className="flex items-end gap-[3px]" aria-hidden="true">{[7, 12, 9, 15, 8].map((height, i) => <i key={i} className="w-[3px] rounded-full bg-lime/80" style={{ height }} />)}</span>
      <button type="button" onClick={() => tune(index + 1)} disabled={index === stations.length - 1} aria-label="Next frequency" className="rounded-full p-2 text-paper/65 disabled:opacity-25"><ChevronUp size={17} /></button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="absolute bottom-[calc(100%+8px)] inset-x-0 max-h-[55svh] overflow-y-auto border border-paper/15 bg-char py-2 shadow-xl">
            {stations.map((station, stationIndex) => <button key={station.id} type="button" onClick={() => { tune(stationIndex); setExpanded(false); }} className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm ${station.id === active ? "text-lime" : "text-paper/70"}`}><span className="tabular w-12">{station.freq}</span>{station.label}{station.id === active && <span className="ml-auto text-[9px] uppercase tracking-widest">Tuned</span>}</button>)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
