import Header from "../components/Header";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import DiscordSection from "../components/DiscordSection";
import Events from "../components/Events";
import CircleQuote from "../components/CircleQuote";
import WantMore from "../components/WantMore";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    
    <>
      <Header />
      <Hero />
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-[1012px] h-full -z-10">
          <Image
            src="/images/middle margin.png"
            alt="margin"
            fill
            className="object-cover object-top"
          />
        </div>
        
             
        <Intro />
        <DiscordSection />
        <Events />
        <CircleQuote />
        <WantMore />
        <Footer />
      </div>
       {/* BOTTOM SECTION */}
      <div className="relative w-full">
        
        <Image src="/images/left corn.png" alt="" width={525.98} height={415} className="absolute bottom-0 left-0 z-10" />
        <Image src="/images/right corn.png" alt="" width={487} height={317.05} className="absolute bottom-0 right-0 z-10" />
        
      </div>
      <Image
  src="/images/green grad.png"
  alt=""
  width={1920}
  height={785}
  className="fixed bottom-0 left-0 w-full h-[785px] object-cover -z-10 pointer-events-none"
/>
    </>
    
  );
}