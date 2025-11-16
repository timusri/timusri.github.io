import HeroSection from '@/components/HeroSection';
import SkillsGrid from '@/components/SkillsGrid';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import FeaturedPosts from '@/components/FeaturedPosts';
import FeaturedTalks from '@/components/FeaturedTalks';

export default function Home() {
  return (
    <main className="bg-[#1a1b1e]">
      <HeroSection />
      <FeaturedTalks />
      <ExperienceTimeline />
      <SkillsGrid />
      <FeaturedPosts />
    </main>
  );
}
