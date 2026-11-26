import { siteConfig } from "@/site.config";

/** Empty strings mean "hide this". Values are tidied so small typing slips don't break links. */
const text = (v: string | undefined) => (v && v.trim() ? v.trim() : null);

const url = (v: string | undefined) => {
  const t = text(v);
  if (!t) return null;
  if (t.startsWith("/") || /^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
};

const email = (v: string | undefined) => {
  const t = text(v)?.replace(/^mailto:/i, "");
  return t && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t) ? t : null;
};

export const contact = {
  email: email(siteConfig.contact.email),
  linkedin: url(siteConfig.contact.linkedin),
  cv: url(siteConfig.contact.cv),
  booking: url(siteConfig.contact.booking),
};

export const djLinks = {
  artistSite: url(siteConfig.dj.artistSite),
  mixes: url(siteConfig.dj.mixes),
  instagram: url(siteConfig.dj.instagram),
};

export const siteUrl = url(siteConfig.siteUrl) ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const isExternal = (href: string) => /^https?:\/\//i.test(href);
