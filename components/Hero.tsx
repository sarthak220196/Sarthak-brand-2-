"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { person } from "@/data/site";
import { scrollToId } from "@/lib/events";

const ease = [0.16, 1, 0.3, 1] as const;
const marks = [
  { color: "bg-cobalt", label: "Payments" },
  { color: "bg-lime", label: "Music" },
  { color: "bg-ink", label: "Execution" },
];

/**
 * The page's one big orchestrated moment: three lines arrive condensed and stretch
 * to full width while a carrier signal draws beneath them, like a station locking in.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const init = <T,>(v: T): T | false => (reduce ? false : v);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative mx-auto flex min-h-[100svh] max-w-grid flex-col px-5 pb-8 pt-24 md:px-10 md:pt-28"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="tabular text-sm text-mute">
            <span className="text-cobalt">88.0</span> Now playing
          </p>
          <p className="mt-3 text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-none tracking-tight" style={{ fontVariationSettings: '"wdth" 120' }}>
            {person.name}
          </p>
        </div>
        <p className="serif max-w-[30rem] text-[1.15rem] leading-[1.55] text-char/85 lg:col-span-5 lg:col-start-8">
          {person.intro}
        </p>
      </div>

      <h1 id="hero-title" className="mt-auto pt-16" aria-label={person.taglines.join(" ")}>
        {person.taglines.map((line, i) => (
          <span key={line} aria-hidden className="grid grid-cols-[auto_1fr] items-center gap-x-4 md:gap-x-7">
            <span className="flex w-[clamp(2.2rem,5vw,5.5rem)] flex-col gap-1.5">
              <motion.span
                className={`block h-[clamp(0.9rem,2vw,2rem)] origin-left ${marks[i].color}`}
                initial={init({ scaleX: 0 })}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.55 + i * 0.16, duration: 0.7, ease }}
              />
              <span className="hidden text-[11px] text-mute md:block">{marks[i].label}</span>
            </span>
            <motion.span
              className="display block text-ink md:whitespace-nowrap"
              style={{ fontSize: "clamp(2.1rem, 6.7vw, 7.6rem)", lineHeight: 0.98 }}
              initial={init({ fontVariationSettings: '"wdth" 62', opacity: 0, y: 12 })}
              animate={{ fontVariationSettings: '"wdth" 112', opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.16, duration: 1.2, ease }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* carrier signal */}
      <svg aria-hidden viewBox="0 0 1200 40" preserveAspectRatio="none" className="mt-10 h-8 w-full">
        <motion.path
          d={Array.from({ length: 121 })
            .map((_, k) => {
              const x = k * 10;
              const env = Math.sin((k / 120) * Math.PI);
              const y = 20 + Math.sin(k * 0.9) * 14 * env * (k > 60 && k < 90 ? 1.25 : 0.7);
              return `${k ? "L" : "M"}${x},${y.toFixed(1)}`;
            })
            .join(" ")}
          fill="none"
          stroke="var(--cobalt)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : ({ pathLength: 0 } as never)}
          animate={{ pathLength: 1 } as never}
          transition={{ delay: 0.9, duration: 1.6, ease }}
        />
      </svg>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t border-char/15 pt-5 text-[15px]">
        <p>
          <span className="text-mute">Based in </span>
          {person.base}
          <span className="text-mute">. Currently </span>
          {person.now.charAt(0).toLowerCase() + person.now.slice(1)}.
        </p>
        <button onClick={() => scrollToId("work")} className="group flex items-center gap-2 font-semibold">
          <span className="underline decoration-char/30 decoration-1 underline-offset-[6px] transition group-hover:decoration-cobalt">
            Start with the career story
          </span>
          <ArrowDown size={16} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </section>
  );
}
