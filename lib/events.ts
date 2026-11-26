/** Tiny window-event bus so the menu can drive other sections. */
export type AppEvent = "palette:open";

export function emit(name: AppEvent) {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(name));
}

export function on(name: AppEvent, fn: () => void) {
  window.addEventListener(name, fn);
  return () => window.removeEventListener(name, fn);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scroll to a section and move keyboard focus there. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/** Keep Tab inside a dialog. Returns a keydown handler. */
export function trapTab(container: HTMLElement | null) {
  return (e: React.KeyboardEvent | KeyboardEvent) => {
    if (e.key !== "Tab" || !container) return;
    const f = Array.from(
      container.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])'),
    );
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
}
