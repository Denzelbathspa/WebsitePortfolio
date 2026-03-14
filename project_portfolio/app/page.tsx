import { HeroSection, BestWorks, ProjectCollection } from "../app/home"

export default function Home() {
  return (
    <main>
      {/* Place all components Here*/}
      <HeroSection />
      <BestWorks />
      <ProjectCollection ProjectData={25} SectionNum={1} />

    </main>
  );
}
