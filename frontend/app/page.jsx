// AFTER — only Hero loads immediately, rest are lazy
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../pages/Home/Hero";
import Stats from "../pages/Home/Stats";

const ScrollingBanner = dynamic(() => import("../pages/Home/ScrollingBanner"));
const Choose = dynamic(() => import("../pages/Home/Choose"));
const MockText = dynamic(() => import("../pages/Home/MockText"));
const SectionTest = dynamic(() => import("../pages/Home/SectionTest"));
const QPrectice = dynamic(() => import("../pages/Home/QPrectice"));
const GuideLine = dynamic(() => import("../pages/Home/GuideLine"));
const Progress = dynamic(() => import("../pages/Home/Progress"));
const QuestionTypes = dynamic(() => import("../pages/Home/QuestionTypes"));
const StudyAbroad = dynamic(() => import("../pages/Home/StudyAbroad"));
const Testimonial = dynamic(() => import("../pages/Home/Testimonial"));
const Faq = dynamic(() => import("../pages/Home/Faq"));
const FinalCTA = dynamic(() => import("../pages/Home/FinalCTA"));
const Footer = dynamic(() => import("../components/Footer/Footer"));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <ScrollingBanner />
      <Choose />
      <MockText />
      <SectionTest />
      <QPrectice />
      <GuideLine />
      <Progress />
      <QuestionTypes />
      <StudyAbroad />
      <Testimonial />
      <Faq />
      <FinalCTA />
      <Footer />
    </div>
  );
}
