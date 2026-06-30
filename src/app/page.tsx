import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Missions } from "@/components/sections/Missions";
import { Timeline } from "@/components/sections/Timeline";
import { SkillsCloud } from "@/components/sections/SkillsCloud";
import { Writing } from "@/components/sections/Writing";
import { Now } from "@/components/sections/Now";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Missions />
        <Timeline />
        <SkillsCloud />
        <Writing />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
