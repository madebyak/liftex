import { HeroSection, AboutSection, WhySection, HomeProductsSection } from './home/sections';

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <AboutSection />
      <WhySection />
      <HomeProductsSection />
    </div>
  );
}
