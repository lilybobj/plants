import Header from "../components/Header";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import DiscordSection from "../components/DiscordSection";
import Events from "../components/Events";
import CircleQuote from "../components/CircleQuote";
import WantMore from "../components/WantMore";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <DiscordSection />
      <Events />
      <CircleQuote />
      <WantMore />
      <Footer />
    </>
  );
}