"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SWEEP = ["People", "Products", "Static", "Markets", "Business", "Sarthak"];

/** Opening: a radio dial sweeps past stations and locks onto Sarthak. Plays once per session. */
export default function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {}
    if (seen || reduce) return;
    setShow(true);
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
  }, [reduce]);

  useEffect(() => {
    if (!show) return;
    const id = window.setInterval(() => {
      setI((n) => {
        if (n >= SWEEP.length - 1) {
          window.clearInterval(id);
          window.setTimeout(() => setShow(false), 650);
          return n;
        }
        return n + 1;
      });
    }, 260);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShow(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [show]);

  const locked = i === SWEEP.length - 1;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-char px-6 py-8 text-paper md:px-12"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          <div className="flex justify-between text-sm text-paper/60">
            <span>Tuning in</span>
            <button
              onClick={() => setShow(false)}
              className="pointer-events-auto underline decoration-paper/40 underline-offset-4 hover:text-lime"
            >
              Skip intro
            </button>
          </div>

          <div>
            <p
              className="display text-[18vw] leading-none md:text-[13vw]"
              style={{
                fontVariationSettings: `"wdth" ${locked ? 125 : 62 + i * 9}`,
                color: locked ? "var(--lime)" : "var(--paper)",
                opacity: SWEEP[i] === "Static" ? 0.35 : 1,
                transition: "font-variation-settings 240ms ease, color 200ms",
              }}
            >
              {SWEEP[i]}
            </p>
          </div>

          <div>
            <div className="relative h-10">
              <div className="absolute inset-x-0 bottom-0 flex justify-between">
                {Array.from({ length: 41 }).map((_, k) => (
                  <span key={k} className="block w-px bg-paper/50" style={{ height: k % 5 === 0 ? 22 : 10 }} />
                ))}
              </div>
              <motion.span
                className="absolute bottom-0 block h-10 w-[3px] bg-lime"
                initial={{ left: "2%" }}
                animate={{ left: `${10 + (i / (SWEEP.length - 1)) * 78}%` }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs tabular text-paper/50">
              <span>88</span>
              <span>98</span>
              <span>108 MHz</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
