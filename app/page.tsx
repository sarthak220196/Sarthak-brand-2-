import Intro from "@/components/Intro";
import FrequencyNav from "@/components/FrequencyNav";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import CareerEvolution from "@/components/CareerEvolution";
import Network from "@/components/Network";
import Comeback from "@/components/Comeback";
import DjTeaser from "@/components/DjTeaser";
import Builds from "@/components/Builds";
import Explorer from "@/components/Explorer";
import Human from "@/components/Human";
import EasterEgg from "@/components/EasterEgg";

export default function Page() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to the career story
      </a>
      <Intro />
      <FrequencyNav />
      <CommandPalette />
      <EasterEgg />
      <main>
        <Hero />
        <CareerEvolution />
        <Network />
        <Comeback />
        <DjTeaser />
        <Builds />
        <Explorer />
        <Human />
      </main>
    </>
  );
}
