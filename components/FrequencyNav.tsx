"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Command, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { person, stations, type StationId } from "@/data/site";
import { emit, scrollToId, trapTab } from "@/lib/events";

const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Navigation as a radio dial. The needle sits exactly on the station you're reading. */
export default function FrequencyNav() {
  const [active, setActive] = useState<StationId>("top");
  const [needle, setNeedle] = useState<number | null>(null);
  const [sheet, setSheet] = useState(false);
  const dial = useRef<HTMLOListElement>(null);
  const btns = useRef<Record<string, HTMLButtonElement | null>>({});
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetOpener = useRef<HTMLButtonElement>(null);

  // which station is on screen
  useEffect(() => {
    const els = stations.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length) setActive(vis[0].target.id as StationId);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // measure the real centre of the active label
  const measure = useCallback(() => {
    const b = btns.current[active];
    const d = dial.current;
    if (!b || !d) return;
    const br = b.getBoundingClientRect();
    const dr = d.getBoundingClientRect();
    setNeedle(br.left - dr.left + br.width / 2);
  }, [active]);
  useIsoLayout(measure, [measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // mobile sheet: Esc closes, focus returns to the opener
  const closeSheet = useCallback(() => {
    setSheet(false);
    sheetOpener.current?.focus();
  }, []);
  useEffect(() => {
    if (!sheet) return;
    const first = sheetRef.current?.querySelector<HTMLButtonElement>("[data-station]");
    first?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeSheet();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sheet, closeSheet]);

  const current = stations.find((s) => s.id === active) ?? stations[0];
  const go = (id: string) => {
    setSheet(false);
    window.setTimeout(() => scrollToId(id), 30);
  };

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-char/10 bg-paper/[0.93] backdrop-blur-md">
      <nav aria-label="Sections" className="mx-auto flex h-16 max-w-grid items-center gap-8 px-5 md:px-10">
        <button
          onClick={() => scrollToId("top")}
          className="shrink-0 text-[15px] font-bold tracking-tight"
          style={{ fontVariationSettings: '"wdth" 115' }}
        >
          {person.name}
        </button>

        {/* Desktop dial */}
        <div className="relative hidden h-full flex-1 lg:block">
          <ol ref={dial} className="relative flex h-full items-center justify-between">
            {stations.map((s) => {
              const on = s.id === active;
              return (
                <li key={s.id}>
                  <button
                    ref={(el) => {
                      btns.current[s.id] = el;
                    }}
                    onClick={() => scrollToId(s.id)}
                    aria-current={on ? "location" : undefined}
                    className={`flex items-baseline gap-1.5 px-1.5 py-2 text-[13px] transition-colors duration-200 ${
                      on ? "text-ink" : "text-mute hover:text-ink"
                    }`}
                  >
                    <span className={`tabular text-[11px] ${on ? "text-cobalt" : ""}`}>{s.freq}</span>
                    <span className={on ? "font-semibold" : ""}>{s.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          {/* tick scale */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between">
            {Array.from({ length: 57 }).map((_, i) => (
              <span key={i} className="block w-px bg-char/25" style={{ height: i % 8 === 0 ? 7 : 3 }} />
            ))}
          </div>
          {needle !== null && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute bottom-0 block h-3 w-[3px] bg-cobalt"
              initial={false}
              animate={{ x: needle - 1.5 }}
              transition={{ type: "spring", stiffness: 210, damping: 26 }}
            />
          )}
        </div>

        {/* Mobile: current station opens the station list */}
        <button
          ref={sheetOpener}
          onClick={() => setSheet(true)}
          aria-haspopup="dialog"
          aria-expanded={sheet}
          className="ml-auto flex items-center gap-1.5 py-2 text-sm lg:hidden"
        >
          <span className="tabular text-cobalt">{current.freq}</span>
          <span className="font-semibold">{current.label}</span>
          <ChevronDown size={16} aria-hidden />
          <span className="sr-only">: open section list</span>
        </button>

        <button
          onClick={() => emit("palette:open")}
          className="hidden shrink-0 items-center gap-2 border border-char/80 px-3 py-1.5 text-[13px] transition-colors hover:bg-char hover:text-paper lg:flex"
          aria-label="Open quick menu (Control or Command plus K)"
        >
          <Command size={13} aria-hidden />
          <span>K</span>
        </button>
      </nav>
    </header>

      <AnimatePresence>
        {sheet && (
          <motion.div
            className="fixed inset-0 z-[70] bg-char/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && closeSheet()}
          >
            <motion.div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-label="Sections"
              onKeyDown={(e) => trapTab(sheetRef.current)(e)}
              className="absolute inset-x-0 bottom-0 max-h-[88svh] overflow-y-auto bg-paper px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-char/15 pb-3">
                <p className="text-sm text-mute">Tune to a section</p>
                <button onClick={closeSheet} className="-mr-2 p-2" aria-label="Close section list">
                  <X size={20} aria-hidden />
                </button>
              </div>
              <ol>
                {stations.map((s) => {
                  const on = s.id === active;
                  return (
                    <li key={s.id} className="border-b border-char/10">
                      <button
                        data-station
                        onClick={() => go(s.id)}
                        aria-current={on ? "location" : undefined}
                        className="flex w-full items-baseline gap-4 py-3.5 text-left"
                      >
                        <span className={`tabular w-12 text-sm ${on ? "text-cobalt" : "text-mute"}`}>{s.freq}</span>
                        <span
                          className="display text-[2rem]"
                          style={{ fontVariationSettings: `"wdth" ${on ? 120 : 85}`, lineHeight: 1 }}
                        >
                          {s.label}
                        </span>
                        {on && <span className="ml-auto h-2.5 w-2.5 self-center bg-cobalt" aria-hidden />}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
