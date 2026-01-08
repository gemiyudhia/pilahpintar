import ContactForm from "@/components/features/ContactForm";
import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WasteCategorySection from "@/components/home/WasteCategorySection";


export default function HomePage() {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <AboutSection />
      <WasteCategorySection />
      <HowItWorksSection />
      <ContactForm />
    </div>
  );
}
