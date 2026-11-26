import { home, places } from "@/data/site";
import SectionHead from "./SectionHead";

export default function Explorer() {
  const empty = Math.max(0, 3 - places.length);
  return (
    <section id="explorer" aria-labelledby="explorer-title" className="bg-bone">
      <div className="mx-auto max-w-grid px-5 py-28 md:px-10 md:py-36">
        <SectionHead
          id="explorer-title"
          station="explorer"
          width={66}
          title="Field notes"
          intro={<p>Travel, new places, good conversations. A journal that fills in as I go, starting from home.</p>}
        />

        <div className="mt-16 grid gap-5 md:grid-cols-12">
          <div className="flex min-h-[300px] flex-col justify-between bg-lime p-7 text-ink md:col-span-5 md:row-span-2">
            <p className="text-sm">Home port</p>
            <div>
              <p className="display text-[clamp(3.5rem,7vw,6.5rem)]" style={{ fontVariationSettings: '"wdth" 122' }}>
                {home.name}
              </p>
              <p className="tabular mt-3 text-sm">
                {home.lat.toFixed(2)}° N, {home.lon.toFixed(2)}° E
              </p>
            </div>
          </div>

          {places.map((p) => (
            <figure key={p.place + p.when} className="border-2 border-ink bg-paper md:col-span-7">
              {p.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.photo} alt={`${p.place}, ${p.when}`} className="aspect-[16/9] w-full object-cover" loading="lazy" />
              )}
              <figcaption className="p-5">
                <p className="text-xl font-bold">{p.place}</p>
                <p className="tabular text-sm text-mute">{p.when}</p>
                <p className="serif mt-2 text-lg">{p.story}</p>
              </figcaption>
            </figure>
          ))}

          {Array.from({ length: empty }).map((_, i) => (
            <div
              key={i}
              className={`grain flex min-h-[140px] items-end border border-dashed border-char/35 p-5 md:col-span-7 ${i === 2 ? "hidden md:flex" : ""}`}
            >
              <p className="text-sm text-mute">{i === 0 ? "Next entry: being written." : "Space for the next stop."}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
