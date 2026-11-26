"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SECRET = "connect";

/** Type c-o-n-n-e-c-t anywhere outside a text field. */
export default function EasterEgg() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let buf = "";
    let hide = 0;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable || e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-SECRET.length);
      if (buf === SECRET) {
        buf = "";
        setShow(true);
        window.clearTimeout(hide);
        hide = window.setTimeout(() => setShow(false), 2200);
      }
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setShow(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keydown", esc);
    };
  }, []);

  // 12 nodes on a ring, all wiring into the centre
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return [500 + Math.cos(a) * 380, 300 + Math.sin(a) * 240];
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          className="fixed inset-0 z-[95] grid place-items-center bg-cobalt text-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShow(false)}
        >
          <svg viewBox="0 0 1000 600" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
            {nodes.map(([x, y], i) => (
              <g key={i}>
                <motion.path
                  d={`M500 300 L${x.toFixed(0)} ${y.toFixed(0)}`}
                  stroke="#C8F135"
                  strokeWidth={2}
                  initial={reduce ? false : ({ pathLength: 0 } as never)}
                  animate={{ pathLength: 1 } as never}
                  transition={{ delay: i * 0.04, duration: 0.5 }}
                />
                <circle cx={x} cy={y} r={9} fill="#F1EDE2" />
              </g>
            ))}
          </svg>
          <p className="display relative bg-cobalt px-6 text-center text-[clamp(3rem,12vw,10rem)]" style={{ fontVariationSettings: '"wdth" 125' }}>
            Connected.
            <span
              className="mx-auto mt-5 block w-fit bg-cobalt px-3 py-1 text-base font-semibold"
              style={{ fontVariationSettings: '"wdth" 100', letterSpacing: 0, lineHeight: 1.4 }}
            >
              You found the hidden one. Now let’s actually connect.
            </span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
