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

const localPath = (v: string | undefined) => {
  const t = text(v);
  if (!t) return null;
  return t.startsWith("/") || /^https?:\/\//i.test(t) ? t : `/${t}`;
};

export const contact = {
  email: email(siteConfig.contact.email),
  linkedin: url(siteConfig.contact.linkedin),
  /** Raw CV path; page.tsx checks the file exists before showing a download. */
  cv: localPath(siteConfig.contact.cv),
  booking: url(siteConfig.contact.booking),
};

export interface Photo {
  src: string;
  alt: string;
}
const photo = (p: { src: string; alt: string }): Photo | null => {
  const src = localPath(p.src);
  return src ? { src, alt: p.alt.trim() } : null;
};

export const photos = {
  portrait: photo(siteConfig.photos.portrait),
  atWork: photo(siteConfig.photos.atWork),
  travel: photo(siteConfig.photos.travel),
  mumbai: photo(siteConfig.photos.mumbai),
};

export const education = text(siteConfig.education.degree)
  ? {
      degree: siteConfig.education.degree.trim(),
      institution: text(siteConfig.education.institution),
      years: text(siteConfig.education.years),
    }
  : null;

export const bioInYourWords = text(siteConfig.bioInYourWords);

export const siteUrl = url(siteConfig.siteUrl) ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const isExternal = (href: string) => /^https?:\/\//i.test(href);
