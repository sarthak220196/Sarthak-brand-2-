"use client";

import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { person } from "@/data/site";
import { contact, isExternal } from "@/lib/config";
import { emit, scrollToId } from "@/lib/events";

const reasons = ["A role on your team", "A partnership", "A market you're trying to open", "An interesting conversation"];

export default function Contact({ cv }: { cv: string | null }) {
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

  const ext = (href: string) => (isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});
  const any = contact.email || contact.linkedin || cv || contact.booking;

  return (
    <section id="hello" aria-labelledby="hello-title" className="bg-ink text-paper">
      <div className="mx-auto max-w-grid px-5 pb-10 pt-28 md:px-10 md:pt-36">
        <p className="tabular text-sm text-paper/55">
          <span className="text-lime">108.0</span> Let&apos;s talk
        </p>
        <h2 id="hello-title" className="display mt-8 text-[clamp(3rem,9vw,9rem)]" style={{ fontVariationSettings: '"wdth" 120' }}>
          Let&apos;s talk.
        </h2>

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="serif text-[1.35rem] leading-[1.45] text-paper/85">
              I&apos;m open to conversations about roles, partnerships and new markets, in fintech and beyond. If any of these
              sounds like you, get in touch.
            </p>
            <ul className="mt-6">
              {reasons.map((r) => (
                <li key={r} className="flex items-center gap-3 border-b border-paper/15 py-3 text-lg">
                  <span aria-hidden className="h-2 w-2 bg-lime" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {any ? (
              <div className="space-y-3">
                {contact.email && (
                  <div className="flex flex-wrap items-stretch gap-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="min-w-0 flex-1 break-all bg-lime px-5 py-4 text-[clamp(1.05rem,2vw,1.4rem)] font-semibold text-ink transition hover:bg-paper"
                    >
                      {contact.email}
                    </a>
                    <button onClick={copy} className="flex items-center gap-2 border-2 border-paper/80 px-4 font-semibold transition hover:bg-paper hover:text-ink">
                      {copied ? <Check size={17} aria-hidden /> : <Copy size={17} aria-hidden />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                    <span role="status" className="sr-only">
                      {copied ? "Email address copied" : ""}
                    </span>
                  </div>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  {contact.linkedin && (
                    <a href={contact.linkedin} {...ext(contact.linkedin)} className="flex items-center justify-between border-2 border-paper/80 px-5 py-4 text-lg font-semibold transition hover:bg-paper hover:text-ink">
                      LinkedIn <ArrowUpRight size={18} aria-hidden />
                    </a>
                  )}
                  {cv && (
                    <a
                      href={cv}
                      {...(isExternal(cv) ? ext(cv) : { download: "Sarthak-Sighat-CV.pdf" })}
                      className="flex items-center justify-between border-2 border-paper/80 px-5 py-4 text-lg font-semibold transition hover:bg-paper hover:text-ink"
                    >
                      Download CV <Download size={18} aria-hidden />
                    </a>
                  )}
                  {contact.booking && (
                    <a href={contact.booking} {...ext(contact.booking)} className="flex items-center justify-between border-2 border-paper/80 px-5 py-4 text-lg font-semibold transition hover:bg-paper hover:text-ink">
                      Book a call <ArrowUpRight size={18} aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className="border-l-2 border-lime pl-4 text-lg text-paper/70">Contact details are being added to this page.</p>
            )}

            <nav aria-label="Keep exploring" className="mt-14">
              <p className="text-sm text-paper/55">Or keep exploring</p>
              <ul className="mt-2 grid text-lg sm:grid-cols-2 sm:gap-x-8">
                {[
                  ["The journey", "work"],
                  ["The toolkit", "toolkit"],
                  ["The builder", "builds"],
                  ["The person", "person"],
                ].map(([label, id]) => (
                  <li key={id} className="border-b border-paper/15">
                    <button onClick={() => scrollToId(id)} className="w-full py-3 text-left transition hover:text-lime">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-28 border-t border-paper/15 pt-10">
          <p className="display text-[clamp(1.8rem,4.6vw,4.2rem)]">
            {["Engineer by education.", "Commercial operator by experience.", "Builder by curiosity."].map((l, i) => (
              <span key={l} className="block" style={{ fontVariationSettings: `"wdth" ${[62, 118, 90][i]}` }}>
                {l}
              </span>
            ))}
          </p>
        </div>

        <footer className="mt-20 flex flex-wrap items-end justify-between gap-6 border-t border-paper/15 pt-6 text-sm text-paper/50">
          <p className="display text-paper" style={{ fontSize: "clamp(1.4rem,2.6vw,2.1rem)", fontVariationSettings: '"wdth" 62' }}>
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
