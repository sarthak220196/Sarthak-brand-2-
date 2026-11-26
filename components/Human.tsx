"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { person } from "@/data/site";
import { contact, isExternal } from "@/lib/config";
import { emit, scrollToId } from "@/lib/events";

export default function Human() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!contact.email) return;
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const extra = [
    contact.linkedin && { href: contact.linkedin, label: "LinkedIn" },
    contact.cv && { href: contact.cv, label: "CV" },
    contact.booking && { href: contact.booking, label: "Book a call" },
  ].filter(Boolean) as { href: string; label: string }[];
  const anyContact = contact.email || extra.length > 0;

  return (
    <section id="hello" aria-labelledby="hello-title" className="bg-ink text-paper">
      <div className="mx-auto max-w-grid px-5 pb-10 pt-28 md:px-10 md:pt-36">
        <p className="tabular text-sm text-paper/55">
          <span className="text-lime">108.0</span> Say hi
        </p>
        <h2 id="hello-title" className="sr-only">
          Who I am, and how to reach me
        </h2>
        <p className="display mt-8 text-[clamp(2.4rem,6.6vw,6.4rem)]">
          {person.closing.map((line, i) => (
            <span key={line} className="block" style={{ fontVariationSettings: `"wdth" ${[62, 125, 92, 108][i]}` }}>
              {line}
            </span>
          ))}
        </p>

        <div className="mt-24 grid gap-14 border-t border-paper/20 pt-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight" style={{ fontVariationSettings: '"wdth" 112' }}>
              Let&apos;s talk.
            </p>
            <p className="serif mt-3 max-w-md text-lg leading-relaxed text-paper/80">
              Payments partnerships, a role, a collaboration, a gig, or a good conversation.
            </p>

            {anyContact ? (
              <div className="mt-9 space-y-4">
                {contact.email && (
                  <div className="flex flex-wrap items-stretch gap-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="bg-lime px-5 py-3.5 text-[clamp(1.05rem,2vw,1.35rem)] font-semibold text-ink transition hover:bg-paper"
                    >
                      {contact.email}
                    </a>
                    <button
                      onClick={copy}
                      className="flex items-center gap-2 border-2 border-paper/80 px-4 font-semibold transition hover:bg-paper hover:text-ink"
                    >
                      {copied ? <Check size={17} aria-hidden /> : <Copy size={17} aria-hidden />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                    <span role="status" className="sr-only">
                      {copied ? "Email address copied" : ""}
                    </span>
                  </div>
                )}
                {extra.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {extra.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          {...(isExternal(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex items-center gap-2 border-2 border-paper/80 px-4 py-2.5 font-semibold transition hover:bg-paper hover:text-ink"
                        >
                          {l.label} <ArrowUpRight size={16} aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <p className="mt-9 max-w-md border-l-2 border-lime pl-4 text-paper/70">
                Contact details are being added. In the meantime, the career story above is the best introduction.
              </p>
            )}
          </div>

          <nav aria-label="Keep exploring" className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm text-paper/55">Keep exploring</p>
            <ul className="mt-3 text-xl">
              {[
                ["The career story", "work"],
                ["Where the money moves", "network"],
                ["The other frequency", "dj"],
                ["Built on the side", "builds"],
              ].map(([label, id]) => (
                <li key={id} className="border-b border-paper/15">
                  <button onClick={() => scrollToId(id)} className="w-full py-3.5 text-left transition hover:text-lime">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <footer className="mt-28 flex flex-wrap items-end justify-between gap-6 border-t border-paper/15 pt-6 text-sm text-paper/50">
          <p className="display text-paper" style={{ fontSize: "clamp(1.5rem,3vw,2.3rem)", fontVariationSettings: '"wdth" 62' }}>
            Still loading. Please don&apos;t refresh.
          </p>
          <p>
            © {new Date().getFullYear()} {person.name}.{" "}
            <button onClick={() => emit("palette:open")} className="underline decoration-paper/30 underline-offset-4 hover:text-paper">
              Quick menu
            </button>{" "}
            <span className="hidden md:inline">(Ctrl or ⌘ + K)</span>
          </p>
        </footer>
      </div>
    </section>
  );
}
