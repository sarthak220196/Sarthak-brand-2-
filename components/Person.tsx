import { interests, person, places, workingStyle, home } from "@/data/site";
import { bioInYourWords, education } from "@/lib/config";
import type { AvailablePhotos } from "@/lib/server";
import Comeback from "./Comeback";
import SectionHead from "./SectionHead";

/** A bio built only from facts already supplied, used until Sarthak writes his own. */
const FACT_BIO = [
  "I'm an engineering graduate based in Mumbai. My career started with helping develop and launch a B2B product, which was my introduction to product ownership and commercial execution. From there it moved through go-to-market, sales leadership and enterprise sales, and now strategic partnerships.",
  "From Mumbai, my work has reached markets across APAC, North America, LATAM, Southeast Asia and Europe, in B2B SaaS and fintech. I'm commercially driven, curious about technology, and constantly exploring new ideas.",
];

function Monogram() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-cobalt text-paper" role="img" aria-label="Sarthak Sighat">
      <div className="grain absolute inset-0 opacity-40" aria-hidden />
      <span className="display relative text-[clamp(6rem,16vw,14rem)]" style={{ fontVariationSettings: '"wdth" 125' }} aria-hidden>
        SS
      </span>
      <span className="absolute bottom-4 left-4 text-sm text-paper/70" aria-hidden>
        {person.name}, {person.base.split(",")[0]}
      </span>
    </div>
  );
}

function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />;
}

export default function Person({ photos }: { photos: AvailablePhotos }) {
  const extras = [photos.atWork, photos.travel, photos.mumbai].filter(Boolean) as { src: string; alt: string }[];
  const bio = bioInYourWords ? bioInYourWords.split(/\n\s*\n/) : FACT_BIO;

  return (
    <section id="person" aria-labelledby="person-title" className="bg-paper">
      <div className="mx-auto max-w-grid px-5 py-28 md:px-10 md:py-36">
        <SectionHead id="person-title" station="person" width={70} title="The person behind the work" />

        {/* Portrait and bio */}
        <div className="mt-16 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <figure className="lg:col-span-5">
            <div className="aspect-[4/5] w-full">
              {photos.portrait ? <Photo src={photos.portrait.src} alt={photos.portrait.alt} /> : <Monogram />}
            </div>
          </figure>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <div className="serif space-y-5 text-[clamp(1.25rem,1.7vw,1.5rem)] leading-[1.5]">
              {bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t-2 border-ink pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-mute">Based in</dt>
                <dd className="mt-1 font-semibold">{person.base}</dd>
              </div>
              <div>
                <dt className="text-sm text-mute">Education</dt>
                <dd className="mt-1 font-semibold">
                  {education ? (
                    <>
                      {education.degree}
                      {education.institution && <span className="block font-normal">{education.institution}</span>}
                      {education.years && <span className="tabular block text-sm font-normal text-mute">{education.years}</span>}
                    </>
                  ) : (
                    "Engineering graduate"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-mute">Now</dt>
                <dd className="mt-1 font-semibold">Unlimit, partnerships</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Extra photos only if real ones were added */}
        {extras.length > 0 && (
          <div className={`mt-16 grid gap-5 ${extras.length === 1 ? "md:grid-cols-[2fr_1fr]" : extras.length === 2 ? "md:grid-cols-2" : "md:grid-cols-[1.4fr_1fr_1fr]"}`}>
            {extras.map((p, i) => (
              <figure key={p.src} className={i === 0 ? "aspect-[4/3]" : "aspect-[4/5] md:mt-16"}>
                <Photo src={p.src} alt={p.alt} />
              </figure>
            ))}
          </div>
        )}

        {/* How I work */}
        <div className="mt-28 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <h3 className="display text-[clamp(2.2rem,4vw,3.6rem)] lg:col-span-4" style={{ fontVariationSettings: '"wdth" 84' }}>
            How I work
          </h3>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {workingStyle.map((w, i) => (
              <li key={w.principle} className="border-t border-char/20 pt-4">
                <p className="text-[1.3rem] font-bold leading-tight" style={{ fontVariationSettings: '"wdth" 104' }}>
                  <span className="tabular mr-2 text-cobalt">{i + 1}</span>
                  {w.principle}
                </p>
                <p className="mt-2 text-[16px] leading-snug text-char/80">{w.proof}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Outside work */}
        <div className="mt-24 grid gap-x-12 gap-y-6 lg:grid-cols-12">
          <h3 className="display text-[clamp(2.2rem,4vw,3.6rem)] lg:col-span-4" style={{ fontVariationSettings: '"wdth" 84' }}>
            Outside work
          </h3>
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-8">
            {interests.map((it, i) => (
              <li
                key={it}
                className={`px-4 py-2.5 text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold ${i % 3 === 0 ? "bg-lime text-ink" : "border-2 border-ink"}`}
                style={{ fontVariationSettings: `"wdth" ${[110, 80, 100, 92, 120][i % 5]}` }}
              >
                {it}
              </li>
            ))}
          </ul>
        </div>

        {/* The comeback: one chapter, not the headline */}
        <div className="mt-24">
          <Comeback />
        </div>

        {/* Field notes: only when there's something real to show */}
        {places.length > 0 && (
          <div className="mt-24">
            <h3 className="display text-[clamp(2.2rem,4vw,3.6rem)]" style={{ fontVariationSettings: '"wdth" 66' }}>
              Field notes
            </h3>
            <p className="tabular mt-2 text-sm text-mute">
              Home port: {home.name}, {home.lat.toFixed(2)}° N, {home.lon.toFixed(2)}° E
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {places.map((p) => (
                <figure key={p.place + p.when} className="border-2 border-ink bg-paper">
                  {p.photo && (
                    <div className="aspect-[4/3]">
                      <Photo src={p.photo} alt={`${p.place}, ${p.when}`} />
                    </div>
                  )}
                  <figcaption className="p-5">
                    <p className="text-xl font-bold">{p.place}</p>
                    <p className="tabular text-sm text-mute">{p.when}</p>
                    <p className="serif mt-2 text-lg">{p.story}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
