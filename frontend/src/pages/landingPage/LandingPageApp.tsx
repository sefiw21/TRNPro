import FeatureSection from "./components/FeatureSection.tsx";
import { Footer } from "./components/Footer.tsx";
import HeroSection from "./components/HeroSection.tsx";
import NavBar from "./components/NavBar.tsx";
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
