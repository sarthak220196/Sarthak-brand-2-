"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const beats = [
  { label: "Pause", body: "A serious shoulder injury, then surgery, then a long rehabilitation. It interrupted the rhythm of my life and career, and I had to step back." },
  { label: "Rebuild", body: "Recovering. Rebuilding physical strength one small, unglamorous session at a time. Slow, and not a straight line." },
  { label: "Return", body: "Gradually back to the work and the things I enjoy. Momentum came back in steps, not all at once." },
];

/** Bars for the three phases: full signal, near silence, an uneven return. */
const BARS = 120;
const level = (i: number) => {
  const p = i / BARS;
  const n = 0.55 + 0.45 * Math.abs(Math.sin(i * 1.37) * Math.cos(i * 0.31));
  if (p < 0.3) return n;
  if (p < 0.36) return n * (1 - (p - 0.3) / 0.06) + 0.02;
  if (p < 0.64) return 0.02;
  const r = (p - 0.64) / 0.36;
  const dip = r > 0.35 && r < 0.48 ? 0.5 : 1;
  return Math.max(0.02, n * Math.min(1, Math.pow(r, 1.3)) * dip);
};

/** A chapter inside The Person, told with restraint. */
export default function Comeback() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const shown = reduce || seen;

  return (
    <div ref={ref} className="bg-ink px-5 py-16 text-paper md:px-12 md:py-20">
      <h3 className="display text-[clamp(2.2rem,5vw,4.4rem)]" style={{ fontVariationSettings: '"wdth" 96' }}>
        The comeback was personal.
      </h3>

      <svg aria-hidden viewBox={`0 0 ${BARS * 8} 120`} preserveAspectRatio="none" className="mt-12 h-24 w-full md:h-28">
        {Array.from({ length: BARS }).map((_, i) => {
          const h = Math.max(2, level(i) * 112);
          const p = i / BARS;
          const fill = p < 0.33 ? "#F1EDE2" : p < 0.64 ? "#55524B" : "#C8F135";
          return (
            <motion.rect
              key={i}
              x={i * 8}
              y={60 - h / 2}
              width={4}
              height={h}
              fill={fill}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={reduce ? false : { scaleY: 0 }}
              animate={shown ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ delay: i * 0.012, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </svg>

      <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
        {beats.map((b, i) => (
          <li key={b.label} className="border-t border-paper/20 pt-4">
            <p className={`text-sm ${i === 2 ? "text-lime" : "text-paper/60"}`}>
              <span className="tabular mr-2">{i + 1}</span>
              {b.label}
            </p>
            <p className="serif mt-2 text-[1.15rem] leading-[1.5] text-paper/85">{b.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
