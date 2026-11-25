import { stations, type StationId } from "@/data/site";

/**
 * Every section opens with its station: the frequency it sits on in the nav dial,
 * so the reader always knows where they are on the band.
 */
export default function SectionHead({
  station,
  title,
  intro,
  width = 100,
  tone = "light",
  id,
}: {
  station: StationId;
  title: React.ReactNode;
  intro?: React.ReactNode;
  width?: number;
  tone?: "light" | "dark";
  id: string;
}) {
  const s = stations.find((x) => x.id === station)!;
  const muted = tone === "dark" ? "text-paper/55" : "text-mute";
  return (
    <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
      <p className={`tabular text-sm lg:col-span-2 lg:pt-3 ${muted}`}>
        <span className={tone === "dark" ? "text-lime" : "text-cobalt"}>{s.freq}</span> {s.label}
      </p>
      <div className="lg:col-span-10">
        <h2
          id={id}
          className="display text-balance text-[clamp(2.5rem,6.4vw,6.25rem)]"
          style={{ fontVariationSettings: `"wdth" ${width}` }}
        >
          {title}
        </h2>
        {intro && (
          <div className={`serif mt-7 max-w-[34rem] text-[1.2rem] leading-[1.55] ${tone === "dark" ? "text-paper/80" : "text-char/85"}`}>
            {intro}
          </div>
        )}
      </div>
    </div>
  );
}
