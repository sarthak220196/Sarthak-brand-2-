"use client";

import { motion, useInView, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { useRef } from "react";
import type { StageId } from "@/data/site";

export interface Palette {
  fg: string;
  accent: string;
  soft: string;
  bg: string;
}

// cast works around a pathLength typing bug in this framer-motion version
const draw = { hidden: { pathLength: 0, opacity: 0 }, shown: { pathLength: 1, opacity: 1 } } as unknown as Variants;
const pop: Variants = { hidden: { scale: 0, opacity: 0 }, shown: { scale: 1, opacity: 1 } };
const fade: Variants = { hidden: { opacity: 0 }, shown: { opacity: 1 } };

export const caption: Record<StageId, string> = {
  build: "Modules assembled into one shippable product.",
  grow: "A flywheel turning, pipeline compounding.",
  lead: "One engine, four SDRs, two regions: APAC and USA.",
  sell: "Many threads between two organisations, one that closes.",
  connect: "Solid lines: two partners and two merchants closed. Dashed: four items in pipeline.",
};

/** One drawing per chapter, animated once when it scrolls into view. */
export default function StageVisual({ stage, p }: { stage: StageId; p: Palette }) {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const state = reduce || seen ? "shown" : "hidden";
  const t = (d = 0, dur = 0.7): Transition => (reduce ? { duration: 0 } : { delay: d, duration: dur, ease: [0.16, 1, 0.3, 1] });

  return (
    <svg ref={ref} viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label={caption[stage]}>
      {stage === "build" && (
        <g>
          {/* blueprint dimension lines */}
          <motion.path d="M100 72 H300 M100 66 V78 M300 66 V78" stroke={p.soft} strokeWidth={1.5} fill="none" variants={draw} initial="hidden" animate={state} transition={t(0.9)} />
          <motion.path d="M72 100 V300 M66 100 H78 M66 300 H78" stroke={p.soft} strokeWidth={1.5} fill="none" variants={draw} initial="hidden" animate={state} transition={t(1)} />
          {Array.from({ length: 9 }).map((_, i) => {
            const x = 100 + (i % 3) * 68;
            const y = 100 + Math.floor(i / 3) * 68;
            return (
              <motion.rect
                key={i}
                x={x}
                y={y}
                width={64}
                height={64}
                fill={i === 4 ? p.accent : i % 2 ? p.fg : "none"}
                stroke={p.fg}
                strokeWidth={2}
                variants={{ hidden: { opacity: 0, x: (i % 3 - 1) * 60, y: -80, rotate: 20 }, shown: { opacity: 1, x: 0, y: 0, rotate: 0 } }}
                initial="hidden"
                animate={state}
                transition={t(i * 0.06)}
              />
            );
          })}
        </g>
      )}

      {stage === "grow" && (
        <g>
          <motion.g
            style={{ originX: "130px", originY: "150px" }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          >
            <circle cx={130} cy={150} r={72} fill="none" stroke={p.fg} strokeWidth={16} strokeDasharray="20 12" />
          </motion.g>
          <circle cx={130} cy={150} r={24} fill={p.fg} />
          {[34, 48, 44, 70, 92, 120, 168].map((h, i) => (
            <motion.rect
              key={i}
              x={226 + i * 22}
              y={330 - h}
              width={15}
              height={h}
              fill={p.fg}
              style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
              variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
              initial="hidden"
              animate={state}
              transition={t(0.25 + i * 0.08)}
            />
          ))}
          <path d="M40 330 H380" stroke={p.fg} strokeWidth={2} />
          <motion.path d="M214 200 Q300 230 384 140" fill="none" stroke={p.fg} strokeWidth={2} strokeDasharray="4 5" variants={draw} initial="hidden" animate={state} transition={t(1)} />
        </g>
      )}

      {stage === "lead" && (
        <g>
          {[[86, 96], [314, 96], [86, 304], [314, 304]].map(([x, y], i) => (
            <g key={i}>
              <motion.path d={`M200 200 L${x} ${y}`} stroke={p.soft} strokeWidth={2} fill="none" variants={draw} initial="hidden" animate={state} transition={t(0.15 + i * 0.12)} />
              <motion.circle cx={x} cy={y} r={22} fill={p.bg} stroke={p.fg} strokeWidth={2.5} variants={pop} initial="hidden" animate={state} transition={t(0.35 + i * 0.12)} />
              <motion.circle cx={x} cy={y - 5} r={6} fill={p.fg} variants={pop} initial="hidden" animate={state} transition={t(0.45 + i * 0.12)} />
              <motion.path d={`M${x - 10} ${y + 12} Q${x} ${y + 2} ${x + 10} ${y + 12}`} stroke={p.fg} strokeWidth={2.5} fill="none" variants={pop} initial="hidden" animate={state} transition={t(0.45 + i * 0.12)} />
            </g>
          ))}
          <motion.rect x={166} y={166} width={68} height={68} fill={p.accent} variants={pop} initial="hidden" animate={state} transition={t(0)} />
          {(["APAC", "USA"] as const).map((label, i) => (
            <motion.text key={label} x={200} y={i ? 372 : 40} textAnchor="middle" fontSize={15} fontWeight={700} fill={p.accent} style={{ fontFamily: "'Archivo Variable', Archivo, sans-serif", letterSpacing: "0.04em" }}
              variants={fade} initial="hidden" animate={state} transition={t(0.9 + i * 0.1)}>
              {label}
            </motion.text>
          ))}
        </g>
      )}

      {stage === "sell" && (
        <g>
          {[0, 1].map((side) =>
            Array.from({ length: 5 }).map((_, i) => (
              <motion.circle
                key={`${side}${i}`}
                cx={side ? 310 : 90}
                cy={88 + i * 56}
                r={side ? 12 : 16}
                fill={side ? p.fg : "none"}
                stroke={p.fg}
                strokeWidth={2.5}
                variants={{ hidden: { opacity: 0, x: side ? 30 : -30 }, shown: { opacity: 1, x: 0 } }}
                initial="hidden"
                animate={state}
                transition={t(i * 0.06)}
              />
            )),
          )}
          {[[0, 1], [1, 0], [1, 3], [3, 1], [4, 4], [2, 4], [0, 2], [2, 2]].map(([a, b], i) => (
            <motion.path
              key={i}
              d={`M106 ${88 + a * 56} C 200 ${88 + a * 56}, 200 ${88 + b * 56}, 298 ${88 + b * 56}`}
              fill="none"
              stroke={i === 7 ? p.accent : p.soft}
              strokeWidth={i === 7 ? 6 : 1.75}
              variants={draw}
              initial="hidden"
              animate={state}
              transition={t(0.35 + i * 0.11)}
            />
          ))}
        </g>
      )}

      {stage === "connect" && (
        <g>
          {[78, 128, 172].map((r) => (
            <circle key={r} cx={200} cy={200} r={r} fill="none" stroke={p.soft} strokeOpacity={0.5} strokeWidth={1} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => {
            const closed = i % 2 === 0; // 4 closed, 4 in pipeline
            const ang = (i / 8) * Math.PI * 2 - Math.PI / 2 + 0.2;
            const r = closed ? 128 : 172;
            const x = 200 + Math.cos(ang) * r;
            const y = 200 + Math.sin(ang) * r;
            return (
              <g key={i}>
                <motion.path d={`M200 200 L${x.toFixed(1)} ${y.toFixed(1)}`} fill="none" stroke={closed ? p.accent : p.soft} strokeWidth={closed ? 3 : 1.5} strokeDasharray={closed ? undefined : "4 6"}
                  variants={draw} initial="hidden" animate={state} transition={t(0.1 + i * 0.07)} />
                <motion.circle cx={x} cy={y} r={closed ? 11 : 8} fill={closed ? p.accent : p.bg} stroke={closed ? p.accent : p.soft} strokeWidth={2} strokeDasharray={closed ? undefined : "3 3"}
                  variants={pop} initial="hidden" animate={state} transition={t(0.4 + i * 0.07)} />
              </g>
            );
          })}
          <circle cx={200} cy={200} r={26} fill={p.fg} />
          <circle cx={200} cy={200} r={9} fill={p.bg} />
        </g>
      )}
    </svg>
  );
}
