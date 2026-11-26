"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SECRET = "drop";

/** Type d-r-o-p anywhere outside a text field. */
export default function EasterEgg() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-SECRET.length);
      if (buf === SECRET) {
        buf = "";
        setShow(true);
        boom();
        window.setTimeout(() => setShow(false), 1600);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-lime text-ink"
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, x: [0, -14, 12, -8, 6, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="display text-center text-[22vw] leading-none" style={{ fontVariationSettings: '"wdth" 125' }}>
            Drop.
            <span className="mt-4 block text-base font-semibold" style={{ fontVariationSettings: '"wdth" 100' }}>
              You found it. The real one happens on the dance floor.
            </span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** A short synthesised riser and sub drop. */
function boom() {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.9);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.6, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + 1.25);
    window.setTimeout(() => void ctx.close(), 1500);
  } catch {
    /* audio unavailable: the visual still plays */
  }
}
