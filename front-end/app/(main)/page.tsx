import HeroSection from "./components/landingPage/heroSection";
import HowItWorksSection from "./components/landingPage/howItWorks";
import AboutSection from "./components/landingPage/aboutSection";
import Footer from "../components/footer";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col pb-16 md:pb-0 bg-gradient-to-r from-[#EEEEEE] to-[#D5EBD8] text-center">
      <HeroSection />
      <HowItWorksSection />
      <AboutSection />
      <div className="mt-auto hidden w-full lg:block">
        <Footer />
      </div>
    </div>
  );
}
