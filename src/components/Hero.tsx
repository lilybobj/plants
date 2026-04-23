import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[858px] bg-[var(--color-bg2)]">

      {/* LAYER 1: HERO BORDER - base background */}
      <Image
        src="/images/hero border.png"
        alt="greenhaus"
        fill
        className="object-cover object-[center_-10px]"
        priority
      />
      <Image
          src="/images/botanical playground.png"
          alt="playground"
          width={328}
          height={46}
          className="absolute bottom-15 right-10 z-10"
        />
        <Image
          src="/images/snail.png"
          alt="snail"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-auto absolute bottom-1 right-1 z-10"
        />

      {/* LAYER 2: CENTERED CONTENT STACK */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[871px] gap-2">
        
        {/* TEXT + STARS OVERLAY GROUP */}
        <div className="relative flex items-center justify-center">
          <Image
            src="/images/hero text + stars.png"
            alt="Welcome"
            width={661.13}
            height={307.47}
            
            priority
          />
          
        </div>

        <Image
          src="/images/cta.png"
          alt="Cta"
          width={300}
          height={41}
        />

      </div>

      {/* LAYER 3: ACORN SHORTCUT - absolute positioned */}
      <div className="absolute z-20 left-[24px] top-[160px] md:left-[157px] md:top-[441px]">
        <Image
          src="/images/acorn.png"
          alt="Acorn"
          width={178}
          height={212}
          className="opacity-90"
        />
        <Image
          src="/images/w95arrow.png"
          alt="Arrow"
          width={30}
          height={28}
          className="absolute bottom-11 left-9 translate-x-[10%] -translate-y-[10%]"
        />
        
      </div>

      {/* LAYER 4: LOGO - fixed to viewport */}
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={142}
        height={163}
        className="fixed bottom-4 right-4 z-[100] mix-blend-exclusion invert pointer-events-none"
      />

    </section>
  );
}