"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { person } from "@/data/site";
import { scrollToId } from "@/lib/events";

const ease = [0.16, 1, 0.3, 1] as const;
const marks = ["bg-cobalt", "bg-lime", "bg-ink", "bg-char/40"];

/**
 * The page's one big orchestrated moment: the statement tunes in word by word,
 * stretching from condensed to wide, then the four channels lock on below it.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const words = person.statement.split(" ");

  return (
    <section id="top" aria-labelledby="hero-title" className="hero-section relative mx-auto flex min-h-[100svh] max-w-grid flex-col overflow-hidden px-5 pb-8 pt-24 md:px-10 md:pt-28">
      <motion.div aria-hidden className="hero-orbit" initial={reduce ? false : { opacity: 0, scale: .7, rotate: -28 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.8, delay: .25, ease }} />
      <motion.div aria-hidden className="hero-orbit hero-orbit-inner" initial={reduce ? false : { opacity: 0, scale: .65 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: .5, ease }} />
      <div className="grid gap-6 lg:grid-cols-12 relative z-[1]">
        <div className="lg:col-span-6">
          <p className="tabular text-sm text-mute">
            <span className="text-cobalt">88.0</span> Tuning in
          </p>
          <p className="mt-3 text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-none tracking-tight" style={{ fontVariationSettings: '"wdth" 120' }}>
            {person.name}
          </p>
        </div>
        <p className="serif max-w-[31rem] text-[1.15rem] leading-[1.55] text-char/85 lg:col-span-5 lg:col-start-8">{person.identity}</p>
      </div>

      <h1 id="hero-title" className="display relative z-[1] mt-auto pt-14 text-ink" style={{ fontSize: "clamp(2.7rem, 7.2vw, 8.2rem)" }}>
        <span className="sr-only">
          {person.statement} {person.kicker}
        </span>
        <span aria-hidden className="block max-w-[14ch]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block pr-[0.22em]"
              initial={reduce ? false : { fontVariationSettings: '"wdth" 62', opacity: 0, y: 14 }}
              animate={{ fontVariationSettings: '"wdth" 108', opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 1.1, ease }}
            >
              {w}
            </motion.span>
          ))}
        </span>
        <motion.span
          aria-hidden
          className="mt-4 block text-[0.4em]"
          style={{ fontVariationSettings: '"wdth" 125', lineHeight: 1 }}
          initial={reduce ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + words.length * 0.07 + 0.25, duration: 0.8, ease }}
        >
          {person.kicker}
        </motion.span>
      </h1>

      {/* Four channels */}
      <ul className="relative z-[1] mt-12 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4" aria-label="What I connect">
        {person.pillars.map((p, i) => (
          <li key={p}>
            <motion.span
              aria-hidden
              className={`block h-1.5 origin-left ${marks[i]}`}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1 + i * 0.12, duration: 0.6, ease }}
            />
            <motion.span
              className="display mt-3 block text-[clamp(1.7rem,3.2vw,3.1rem)]"
              initial={reduce ? false : { fontVariationSettings: '"wdth" 62', opacity: 0 }}
              animate={{ fontVariationSettings: '"wdth" 100', opacity: 1 }}
              transition={{ delay: 1.15 + i * 0.12, duration: 0.9, ease }}
            >
              {p}
            </motion.span>
          </li>
        ))}
      </ul>

      {/* carrier signal */}
      <svg aria-hidden viewBox="0 0 1200 40" preserveAspectRatio="none" className="mt-10 h-7 w-full">
        <motion.path
          d={Array.from({ length: 121 })
            .map((_, k) => {
              const env = Math.sin((k / 120) * Math.PI);
              const y = 20 + Math.sin(k * 0.9) * 14 * env * (k > 60 && k < 90 ? 1.25 : 0.7);
              return `${k ? "L" : "M"}${k * 10},${y.toFixed(1)}`;
            })
            .join(" ")}
          fill="none"
          stroke="var(--cobalt)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : ({ pathLength: 0 } as never)}
          animate={{ pathLength: 1 } as never}
          transition={{ delay: 1.5, duration: 1.6, ease }}
        />
      </svg>

      <div className="relative z-[1] mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t border-char/15 pt-5 text-[15px]">
        <p>
          <span className="text-mute">Based in </span>
          {person.base}
          <span className="text-mute">. Currently: </span>
          {person.now}.
        </p>
        <button onClick={() => scrollToId("work")} className="group flex items-center gap-2 font-semibold">
          <span className="underline decoration-char/30 decoration-1 underline-offset-[6px] transition group-hover:decoration-cobalt">Start with the journey</span>
          <ArrowDown size={16} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </section>
  );
}
