"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Copy, CornerDownLeft, FileText, Radio, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { stations } from "@/data/site";
import { contact, djLinks } from "@/lib/config";
import { on, scrollToId } from "@/lib/events";

interface Item {
  id: string;
  label: string;
  hint: string;
  group: "Sections" | "Contact";
  icon: React.ReactNode;
  run: () => void;
}

const openUrl = (u: string) => window.open(u, "_blank", "noopener,noreferrer");

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback((restore = true) => {
    setOpen(false);
    setQ("");
    setSel(0);
    if (restore) lastFocus.current?.focus();
  }, []);

  const items = useMemo<Item[]>(() => {
    const list: Item[] = stations.map((s) => ({
      id: s.id,
      label: s.label === "Hello" ? "Back to the top" : s.label,
      hint: s.freq,
      group: "Sections",
      icon: <Radio size={15} aria-hidden />,
      run: () => scrollToId(s.id),
    }));
    if (contact.email) {
      const e = contact.email;
      list.push({
        id: "email", label: "Copy email address", hint: e, group: "Contact", icon: <Copy size={15} aria-hidden />,
        run: () => navigator.clipboard?.writeText(e).then(() => setToast("Email address copied"), () => (window.location.href = `mailto:${e}`)),
      });
    }
    if (contact.linkedin) list.push({ id: "li", label: "Open LinkedIn", hint: "New tab", group: "Contact", icon: <ArrowUpRight size={15} aria-hidden />, run: () => openUrl(contact.linkedin!) });
    if (contact.cv) list.push({ id: "cv", label: "Open CV", hint: "PDF", group: "Contact", icon: <FileText size={15} aria-hidden />, run: () => openUrl(contact.cv!) });
    if (contact.booking) list.push({ id: "book", label: "Book a call", hint: "New tab", group: "Contact", icon: <ArrowUpRight size={15} aria-hidden />, run: () => openUrl(contact.booking!) });
    if (djLinks.artistSite) list.push({ id: "dj", label: "Visit the artist site", hint: "New tab", group: "Contact", icon: <ArrowUpRight size={15} aria-hidden />, run: () => openUrl(djLinks.artistSite!) });
    return list;
  }, []);

  const filtered = items.filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(q.trim().toLowerCase()));

  useEffect(() => {
    const open = () => {
      lastFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const off = on("palette:open", open);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) lastFocus.current = document.activeElement as HTMLElement;
          return !o;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      off();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const choose = (item?: Item) => {
    if (!item) return;
    close(false);
    window.setTimeout(item.run, 40);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return close();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => (s + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => (s - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[sel]);
    } else if (e.key === "Tab") {
      // single focus stop: the search field. Arrow keys move through results.
      e.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center bg-char/45 px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Quick menu"
              className="w-full max-w-[34rem] border border-ink bg-paper shadow-[10px_10px_0_0_var(--ink)]"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b border-char/15 px-5">
                <Search size={16} aria-hidden className="text-mute" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setSel(0);
                  }}
                  placeholder="Jump to…"
                  role="combobox"
                  aria-expanded="true"
                  aria-autocomplete="list"
                  aria-controls="palette-list"
                  aria-activedescendant={filtered[sel] ? `pal-${filtered[sel].id}` : undefined}
                  aria-label="Search sections and contact options"
                  className="h-14 w-full bg-transparent text-lg outline-none placeholder:text-mute"
                />
                <kbd className="border border-char/20 px-1.5 text-[11px] text-mute">Esc</kbd>
              </div>
              <ul ref={listRef} id="palette-list" role="listbox" aria-label="Results" className="max-h-[52vh] overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <li className="px-5 py-4 text-mute">No match. Try “work”, “network” or “email”.</li>
                )}
                {filtered.map((item, i) => {
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  return (
                    <li key={item.id} role="presentation">
                      {showGroup && <p className="px-5 pb-1 pt-3 text-xs text-mute" aria-hidden>{item.group}</p>}
                      <div
                        id={`pal-${item.id}`}
                        role="option"
                        aria-selected={i === sel}
                        onMouseMove={() => setSel(i)}
                        onClick={() => choose(item)}
                        className={`mx-2 flex cursor-pointer items-center gap-3 px-3 py-2.5 ${i === sel ? "bg-ink text-paper" : ""}`}
                      >
                        <span className={i === sel ? "text-lime" : "text-mute"}>{item.icon}</span>
                        <span className="flex-1">{item.label}</span>
                        <span className="tabular truncate text-xs opacity-60">{item.hint}</span>
                        {i === sel && <CornerDownLeft size={13} aria-hidden className="text-lime" />}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="border-t border-char/10 px-5 py-2.5 text-xs text-mute">↑ ↓ to move, Enter to open</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-[85] -translate-x-1/2">
        {toast && <p className="bg-ink px-4 py-2 text-sm text-paper">{toast}</p>}
      </div>
    </>
  );
}
