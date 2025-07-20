import { 
  AboutHeroSection, 
  WhoWeAreSection, 
  MissionLeadershipSection, 
  CultureSection 
} from './sections';

export default function AboutPage() {
  return (
    <div className="about-page">
      <AboutHeroSection />
      <WhoWeAreSection />
      <MissionLeadershipSection />
      <CultureSection />
    </div>
  );
} 