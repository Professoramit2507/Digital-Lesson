import React from "react";
import Banner from "./Banner";
import Stats from "./Stats";
import Benefits from "./Benefits";
import DailyWisdom from "./DailyWisdom";
import HowItWorks from "./HowItWorks";
import Top from "../Components/Top";
import MostSavedLesson from "../Components/MostSavedLesson";
import Faq from "./Faq";
import CallToAction from "./CallToAction";

const Home = () => {
  return (
    <div className="bg-[#05070c] text-white selection:bg-cyan-500 selection:text-black">
      {/* 1. Cinematic Hero Banner */}
      <Banner />

      {/* 2. Platform Stats & Metrics Strip */}
      <Stats />

      {/* 3. Value Matrix / Why Learn From Life */}
      <Benefits />

      {/* 4. Interactive Daily Wisdom & Action Prompt */}
      <DailyWisdom />

      {/* 5. 3-Step Growth System (How It Works) */}
      <HowItWorks />

      {/* 6. Top Contributors Podium / Leaderboard */}
      <Top />

      {/* 7. Most Saved & Trending Community Lessons */}
      <MostSavedLesson />

      {/* 8. Frequently Asked Questions */}
      <Faq />

      {/* 9. Final High-Impact Conversion CTA */}
      <CallToAction />
    </div>
  );
};

export default Home;
