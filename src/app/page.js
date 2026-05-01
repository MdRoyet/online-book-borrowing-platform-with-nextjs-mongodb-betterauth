import Banner from "@/components/banner/Banner";
import Marquee from "@/components/banner/Marquee";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import LiveActivityFeed from "@/components/home/LiveActivityFeed";
import MoodMatcher from "@/components/home/MoodMatcher";
import SpotlightSlider from "@/components/home/SpotlightSlider";

export default function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <Marquee></Marquee>
      <SpotlightSlider></SpotlightSlider>
      <FeaturedBooks></FeaturedBooks>
      <MoodMatcher></MoodMatcher>
      <LiveActivityFeed></LiveActivityFeed>
    </div>
  );
}
