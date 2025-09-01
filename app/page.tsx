import Features from "@/components/features-1";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import IntegrationsSection from "@/components/integrations-3";
import TestimonialsSection from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />;
      <Features />
      <IntegrationsSection />
      <TestimonialsSection />
      <FooterSection />
    </>
  );
}
