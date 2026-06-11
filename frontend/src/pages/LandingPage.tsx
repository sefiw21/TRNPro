import FeatureSection from "../features/landing/components/FeatureSection.tsx";
import { Footer } from "../features/landing/components/Footer.tsx";
import HeroSection from "../features/landing/components/HeroSection.tsx";
import NavBar from "../features/landing/components/NavBar.tsx";
const LandingPageApp = () => {
  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto lg:px-8 pt-20 px-4">
        <HeroSection />
        <FeatureSection />
        <Footer />
      </div>
    </>
  );
};

export default LandingPageApp;
