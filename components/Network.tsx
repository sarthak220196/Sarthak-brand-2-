"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { home, regions, routes, type Route } from "@/data/site";
import { LAND_DOTS, DOT_STEP } from "@/data/worldDots";
import SectionHead from "./SectionHead";

const W = 1000;
const K = W / 360; // px per degree
const H = Math.round(134 * K);
const px = (lon: number) => (lon + 180) * K;
const py = (lat: number) => (78 - lat) * K;
const FONT = { fontFamily: "'Archivo Variable', Archivo, Helvetica Neue, Arial, sans-serif" };

type Sel = "all" | string; // "all" or a company name

const yearOf = (r: Route) => r.dates.match(/\d{4}/)?.[0] ?? "";
const regionName = (id: string) => regions.find((r) => r.id === id)?.name ?? id;

export default function Network() {
  const reduce = useReducedMotion();
  const [sel, setSel] = useState<Sel>("all");
  const [focus, setFocus] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  // land as one path of tiny squares: thousands of dots, one DOM node
  const land = useMemo(() => {
    const s = (DOT_STEP * K) / 2.3;
    let d = "";
    for (let i = 0; i < LAND_DOTS.length; i += 2) {
      const x = px(LAND_DOTS[i]) - s / 2;
      const y = py(LAND_DOTS[i + 1]) - s / 2;
      d += `M${x.toFixed(1)} ${y.toFixed(1)}h${s.toFixed(1)}v${s.toFixed(1)}h-${s.toFixed(1)}z`;
    }
    return d;
  }, []);

  // play through the journey, one company at a time
  useEffect(() => {
    if (!playing) return;
    const order = routes.map((r) => r.company);
    const i = order.indexOf(sel);
    const id = window.setTimeout(() => {
      if (i === order.length - 1) {
        setPlaying(false);
        setSel("all");
      } else setSel(order[i + 1]);
    }, i === -1 ? 50 : 2600);
    return () => window.clearTimeout(id);
  }, [playing, sel]);

  const pick = (s: Sel) => {
    setPlaying(false);
    setFocus(null);
    setSel(s);
  };

  const route = sel === "all" ? null : routes.find((r) => r.company === sel) ?? null;
  const global = route?.regions === "global";
  const activeRegions = new Set(
    sel === "all"
      ? regions.map((r) => r.id)
      : Array.isArray(route?.regions)
        ? route!.regions
        : regions.map((r) => r.id),
  );
  const hx = px(home.lon);
  const hy = py(home.lat);

  const arc = (lon: number, lat: number) => {
    const x = px(lon);
    const y = py(lat);
    const dist = Math.hypot(x - hx, y - hy);
    const cx = (x + hx) / 2;
    const cy = (y + hy) / 2 - Math.max(24, dist * 0.34);
    return `M${hx.toFixed(1)},${hy.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  };

  const focusRoutes = focus ? routes.filter((r) => Array.isArray(r.regions) && r.regions.includes(focus)) : [];

  return (
    <section id="network" aria-labelledby="network-title" className="bg-char text-paper">
      <div className="mx-auto max-w-grid px-5 py-28 md:px-10 md:py-36">
        <SectionHead
          id="network-title"
          station="network"
          tone="dark"
          width={78}
          title="Where the work has reached"
          intro={
            <p>
              Every route starts in Mumbai. Play the journey to watch markets light up company by company, or pick a company or
              a market to explore it.
            </p>
          }
        />

        {/* Controls: chronological */}
        <div className="mt-14 flex flex-wrap items-center gap-2" role="group" aria-label="Choose a chapter">
          <button
            onClick={() => {
              setFocus(null);
              if (playing) setPlaying(false);
              else {
                setSel("all-start");
                setPlaying(true);
              }
            }}
            aria-pressed={playing}
            className="mr-2 flex items-center gap-2 bg-lime px-4 py-2 text-sm font-semibold text-ink transition hover:bg-paper"
          >
            {playing ? <Pause size={15} aria-hidden /> : <Play size={15} aria-hidden />}
            {playing ? "Pause" : "Play the journey"}
          </button>
          <Chip on={sel === "all" && !playing} onClick={() => pick("all")}>
            All
          </Chip>
          {routes.map((r) => (
            <Chip key={r.company} on={sel === r.company} onClick={() => pick(r.company)}>
              {r.company} <span className="tabular ml-1 opacity-60">{yearOf(r)}</span>
            </Chip>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Map */}
          <div className="min-w-0 lg:col-span-8">
            <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="block w-full min-w-[680px]"
                role="group"
                aria-label="World map of markets reached from Mumbai"
              >
                <path d={land} fill={global ? "#C8F135" : "#F1EDE2"} fillOpacity={global ? 0.32 : 0.16} style={{ transition: "fill 500ms, fill-opacity 500ms" }} />

                {/* Unlimit: global reach, no specific markets claimed */}
                {global &&
                  !reduce &&
                  [0, 1, 2].map((i) => (
                    <circle key={i} cx={hx} cy={hy} r={20} fill="none" stroke="#C8F135" strokeWidth={1.5}>
                      <animate attributeName="r" from="16" to="360" dur="3.6s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.9" to="0" dur="3.6s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
                    </circle>
                  ))}

                {regions.map((r) => {
                  const on = activeRegions.has(r.id);
                  const hot = focus === r.id;
                  const d = arc(r.lon, r.lat);
                  return (
                    <g key={r.id} style={{ transition: "opacity 400ms" }} opacity={on || hot ? 1 : 0.15}>
                      <path d={d} fill="none" stroke="#F1EDE2" strokeOpacity={0.25} strokeWidth={1} />
                      {(on || hot) && (
                        <motion.path
                          key={`${sel}-${r.id}`}
                          d={d}
                          fill="none"
                          stroke={hot ? "#C8F135" : global ? "#C8F135" : "#5B79FF"}
                          strokeWidth={hot ? 3 : 2}
                          initial={reduce ? false : ({ pathLength: 0 } as never)}
                          animate={{ pathLength: 1 } as never}
                          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                      {(on || hot) && !reduce && (
                        <circle r={3.2} fill="#C8F135">
                          <animateMotion dur={`${2 + (r.id.length % 3) * 0.4}s`} repeatCount="indefinite" path={d} />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Market markers: keyboard and pointer */}
                {regions.map((r) => {
                  const x = px(r.lon);
                  const y = py(r.lat);
                  const on = activeRegions.has(r.id);
                  const hot = focus === r.id;
                  const left = r.id === "gift";
                  return (
                    <g
                      key={r.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={hot}
                      aria-label={`${r.name}: show what happened here`}
                      className="cursor-pointer outline-none"
                      onClick={() => {
                        setPlaying(false);
                        setFocus(hot ? null : r.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPlaying(false);
                          setFocus(hot ? null : r.id);
                        }
                      }}
                      opacity={on || hot ? 1 : 0.35}
                    >
                      <circle cx={x} cy={y} r={22} fill="transparent" />
                      <circle cx={x} cy={y} r={hot ? 9 : 6.5} fill={hot ? "#C8F135" : "#1E3FD8"} stroke="#F1EDE2" strokeWidth={2} />
                      <circle cx={x} cy={y} r={15} fill="none" stroke="#C8F135" strokeWidth={2} className="kb-ring" />
                      <text
                        x={left ? x - 13 : x + 13}
                        y={left ? y - 9 : y + 5}
                        textAnchor={left ? "end" : "start"}
                        fill={hot ? "#C8F135" : "#F1EDE2"}
                        fontSize={15}
                        fontWeight={600}
                        style={FONT}
                      >
                        {r.name}
                      </text>
                    </g>
                  );
                })}

                <circle cx={hx} cy={hy} r={12} fill="#C8F135" stroke="#000" strokeWidth={3} />
                <text x={hx + 6} y={hy + 30} fill="#C8F135" fontSize={16} fontWeight={800} style={FONT}>
                  Mumbai
                </text>
              </svg>
            </div>
            <p className="mt-3 text-xs text-paper/45 md:hidden">Swipe the map to see all of it.</p>
          </div>

          {/* Detail panel */}
          <aside className="min-w-0 lg:col-span-4" aria-live="polite">
            <div className="border-t-2 border-paper pt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={focus ?? sel}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {focus ? (
                    <>
                      <p className="text-sm text-paper/55">Market</p>
                      <p className="display mt-1 text-5xl" style={{ fontVariationSettings: '"wdth" 100' }}>{regionName(focus)}</p>
                      <ul className="mt-6 space-y-5">
                        {focusRoutes.map((r) => (
                          <li key={r.company}>
                            <p className="font-semibold">
                              {r.company} <span className="tabular font-normal text-paper/55">{r.dates}</span>
                            </p>
                            <p className="mt-1 text-paper/80">{r.summary}</p>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : route ? (
                    <>
                      <p className="tabular text-sm text-paper/55">{route.dates}</p>
                      <p className="display mt-1 text-5xl" style={{ fontVariationSettings: '"wdth" 100' }}>{route.company}</p>
                      <p className="serif mt-4 text-lg leading-relaxed text-paper/85">{route.summary}</p>
                      {Array.isArray(route.regions) && (
                        <p className="mt-4 text-sm text-paper/60">Markets: {route.regions.map(regionName).join(", ")}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="display text-5xl" style={{ fontVariationSettings: '"wdth" 100' }}>6 markets</p>
                      <p className="serif mt-4 text-lg leading-relaxed text-paper/85">
                        Named across Toddle, Sprinto, PortOne and Glomo. Unlimit&apos;s work is primarily global. Select any market on
                        the map for what happened there.
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <p className="mt-8 text-sm text-paper/55">Markets</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {regions.map((r) => (
                  <li key={r.id}>
                    <button
                      onClick={() => {
                        setPlaying(false);
                        setFocus(focus === r.id ? null : r.id);
                      }}
                      aria-pressed={focus === r.id}
                      className={`border px-2.5 py-1 text-[13px] transition ${focus === r.id ? "border-lime bg-lime text-ink" : "border-paper/25 hover:border-paper"}`}
                    >
                      {r.name}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-paper/45">
                Rocketium (2021–2022) isn&apos;t plotted: its new regions weren&apos;t named. Market positions are approximate.
              </p>
            </div>
          </aside>
        </div>

      </div>
    </section>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`border px-3.5 py-2 text-sm transition ${on ? "border-paper bg-paper text-ink" : "border-paper/25 text-paper/85 hover:border-paper"}`}
    >
      {children}
    </button>
  );
}
