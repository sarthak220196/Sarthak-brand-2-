import fs from "node:fs";
import path from "node:path";
import { contact, isExternal, photos, type Photo } from "./config";

/** True only if the path is a link, or a file that really exists in /public. */
const exists = (p: string) => isExternal(p) || fs.existsSync(path.join(process.cwd(), "public", decodeURIComponent(p)));

/** The CV link, only if it will actually download. */
export function availableCv(): string | null {
  return contact.cv && exists(contact.cv) ? contact.cv : null;
}

/** Photos whose files exist. Missing files are dropped instead of showing a broken image. */
export function availablePhotos() {
  const ok = (p: Photo | null) => (p && exists(p.src) ? p : null);
  return {
    portrait: ok(photos.portrait),
    atWork: ok(photos.atWork),
    travel: ok(photos.travel),
    mumbai: ok(photos.mumbai),
  };
}
export type AvailablePhotos = ReturnType<typeof availablePhotos>;
