"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const beats = [
  {
    label: "Pause",
    title: "Life pressed pause.",
    body: "A serious shoulder injury, then surgery, then a long rehabilitation. The rhythm I was used to stopped.",
    wdth: 110,
  },
  {
    label: "Rebuild",
    title: "The quiet part.",
    body: "Recovering. Rebuilding strength one small, unglamorous session at a time. Slow, and not a straight line.",
    wdth: 62,
  },
  {
    label: "Play",
    title: "I found my way back to play.",
    body: "Momentum came back gradually, not all at once. Patience turned out to be a skill, too.",
    wdth: 118,
  },
];

/** Waveform amplitude across the scroll: full, collapse, a slow and uneven return. */
function amp(p: number) {
  if (p < 0.2) return 1;
  if (p < 0.34) return 1 - ((p - 0.2) / 0.14) * 0.97;
  if (p < 0.52) return 0.03;
  const r = (p - 0.52) / 0.42;
  const dip = r > 0.38 && r < 0.52 ? 0.16 : 0; // a setback inside the recovery
  return Math.min(1, 0.03 + Math.pow(Math.max(0, r), 1.5) - dip);
}

export default function Comeback() {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const [beat, setBeat] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
    setBeat(v < 0.3 ? 0 : v < 0.6 ? 1 : 2);
  });

  useEffect(() => {
    if (reduce) return;
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    let raf = 0;
    let t = 0;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = c.clientWidth;
      const h = c.clientHeight;
      if (c.width !== Math.round(w * dpr)) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const a = amp(progress.current);
      t += 0.03;
      const gap = 6;
      const n = Math.floor(w / gap);
      ctx.fillStyle = a > 0.7 ? "#C8F135" : a > 0.12 ? "#F1EDE2" : "#55524B";
      for (let i = 0; i < n; i++) {
        const v =
          Math.abs(Math.sin(i * 0.19 + t) * 0.6 + Math.sin(i * 0.051 - t * 0.6) * 0.4) * (0.5 + 0.5 * Math.abs(Math.sin(i * 1.37)));
        const bh = Math.max(1.5, v * a * h * 0.92);
        ctx.fillRect(i * gap, h / 2 - bh / 2, 3, bh);
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduce]);

  const marker = (
    <p className="tabular text-sm text-paper/55">
      <span className="text-lime">99.9</span> Comeback
    </p>
  );

  if (reduce) {
    return (
      <section id="comeback" aria-labelledby="comeback-title" className="bg-ink px-5 py-28 text-paper md:px-10">
        <div className="mx-auto max-w-grid">
          {marker}
          <h2 id="comeback-title" className="sr-only">The comeback</h2>
          <ol className="mt-10 max-w-3xl space-y-16">
            {beats.map((b) => (
              <li key={b.label}>
                <p className="text-sm text-lime">{b.label}</p>
                <p className="display mt-2 text-[clamp(2.6rem,6vw,5rem)]" style={{ fontVariationSettings: `"wdth" ${b.wdth}` }}>{b.title}</p>
                <p className="serif mt-4 max-w-xl text-xl leading-relaxed text-paper/80">{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="comeback" aria-labelledby="comeback-title" ref={wrap} className="relative h-[250vh] bg-ink text-paper">
      <h2 id="comeback-title" className="sr-only">The comeback</h2>
      {/* full story for screen readers, read once in order */}
      <div className="sr-only">
        {beats.map((b) => (
          <p key={b.label}>
            {b.title} {b.body}
          </p>
        ))}
      </div>

      <div aria-hidden className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 md:px-10">
        <div className="mx-auto flex w-full max-w-grid flex-1 flex-col">
          <div className="flex items-start justify-between gap-6">
            {marker}
            <ol className="flex gap-6 text-sm">
              {beats.map((b, i) => (
                <li key={b.label} className={`transition-colors duration-300 ${i === beat ? "text-lime" : i < beat ? "text-paper/70" : "text-paper/30"}`}>
                  <span className="tabular mr-1.5">{i + 1}</span>
                  {b.label}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-[8vh] min-h-[16rem] max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={beat}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="display text-[clamp(2.7rem,7vw,6.8rem)]" style={{ fontVariationSettings: `"wdth" ${beats[beat].wdth}` }}>
                  {beats[beat].title}
                </p>
                <p className="serif mt-6 max-w-[32rem] text-[1.3rem] leading-[1.5] text-paper/80">{beats[beat].body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <canvas ref={canvas} className="mt-auto h-[22vh] w-full" />
        </div>
      </div>
    </section>
  );
}
