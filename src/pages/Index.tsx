import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { LifecycleSection } from "@/components/home/LifecycleSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <IndustriesSection />
        <LifecycleSection />
        <CapabilitiesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;