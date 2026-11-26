"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Global finishing layer: reading progress and a restrained desktop pointer light. */
export default function MotionPolish() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.22 });
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const [pointerFine, setPointerFine] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine) and (min-width: 900px)").matches;
    setPointerFine(fine);
    if (!fine) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 190);
      y.set(event.clientY - 190);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="scroll-progress"
        style={{ scaleX: reduce ? 0 : scaleX }}
      />
      {pointerFine && (
        <motion.div
          aria-hidden
          className="pointer-aura"
          style={{ x, y }}
        />
      )}
      <div aria-hidden className="ambient-grain" />
    </>
  );
}
