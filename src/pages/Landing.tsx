import { LabProvider } from "@/context/LabContext";
import { Nav } from "@/components/lab/Nav";
import { Hero } from "@/components/lab/Hero";
import { WorkflowSection } from "@/components/lab/WorkflowSection";
import { BuildingBlocks } from "@/components/lab/BuildingBlocks";
import { UseCaseEngine } from "@/components/lab/UseCaseEngine";
import { Learning } from "@/components/lab/Learning";
import { FinalBuilder } from "@/components/lab/FinalBuilder";
import { Trust, Footer } from "@/components/lab/Trust";

export default function Landing() {
  return (
    <LabProvider>
      <div className="min-h-screen">
        <Nav />
        <Hero />
        <WorkflowSection />
        <BuildingBlocks />
        <UseCaseEngine />
        <Learning />
        <FinalBuilder />
        <Trust />
        <Footer />
      </div>
    </LabProvider>
  );
}
