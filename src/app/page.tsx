import HeroSection from '@/components/HeroSection';
import SkillsGrid from '@/components/SkillsGrid';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import FeaturedPosts from '@/components/FeaturedPosts';

export default function Home() {
  return (
    <main className="bg-[#1a1b1e]">
      <HeroSection />
      <SkillsGrid />
      <ExperienceTimeline />
      <FeaturedPosts />
    </main>
  );
}
