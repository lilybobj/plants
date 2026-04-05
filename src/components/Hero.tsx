import Image from "next/image";

export default function Hero() {
  return (
    <section className="grid min-h-[871px] w-full place-items-center overflow-hidden bg-[var(--color-bg2)]">
     {/* 2. THE INNER RECTANGLE */}
      <div 
        style={{ gridArea: "1/1" }} 
        className="relative h-[783px] w-[1418px] shrink-0 overflow-hidden"
      >
        {/* The Image is now INSIDE this div */}
        <Image
          src="/images/gaus 1.png"
          alt="greenhaus"
          fill // This makes it fill the 1418x783 container exactly
          className="object-cover" // Ensures the image doesn't stretch weirdly
          priority
        />
      </div>
      
      {/* 3. THE WELCOME IMAGE */}
            {/* Also placed in 1/1, so it sits directly on top of the rectangle */}
            <div style={{ gridArea: "1/1" }} className="relative z-10">
              <Image
                src="/images/Welcome.png"
                alt="Welcome"
                width={716}
                height={262}
                priority
              />
            </div>
      {/* --- CONTENT LAYER --- */}
    {/* --- ACORN & ARROW SHORTCUT GROUP --- */}
    <div className="
        absolute 
        z-20
        left-[24px] top-[160px]
        md:left-[157px] md:top-[441px]
        
    ">
      {/* The Acorn (The main "Icon") */}
      <Image
        src="/images/acorn.png"
        alt="Acorn"
        width={178}
        height={212}
        className="opacity-90"
      />

      {/* The Arrow (The "Shortcut" badge) */}
      <Image
        src="/images/w95arrow.png"
        alt="Arrow"
        width={30}
        height={28}
        className="
            absolute 
            bottom-11 left-9 
            translate-x-[10%] -translate-y-[10%]
            opacity-100
        "
      />  
    </div>  

       
    <Image
  src="/images/logo.png"
  alt="Logo"
  width={142.14}
  height={163}
  className="
    fixed 
    bottom-4 
    right-4 
    z-[100] 
    opacity-100 
    mix-blend-exclusion
    invert
    pointer-events-none
  "
/>
    </section>
    
  );
}