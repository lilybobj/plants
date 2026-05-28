import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[65px] bg-[var(--color-bg)]">
      {/* justify-between handles the left/right alignment automatically */}
      <div className="mx-auto flex h-full max-w-full items-center justify-between px-6">
        
        {/* LEFT ALIGNED */}
       <Image
  src="/images/club text.png"
  alt="UCLA Botanical Club"
  width={225}
  height={42}
  className="object-contain"
/>


        {/* RIGHT ALIGNED */}
        <nav className="flex items-center gap-6 windows-font text-[16pt] text-[var(--color-text-main)]">
          <a className="glow-hover transition-all hover:text-[var(--color-text-hover)]" href="/">
            Home
          </a>
          <a className="glow-hover transition-all hover:text-[var(--color-text-hover)]" href="#">
            Digital Archive
          </a>
          <a className="glow-hover transition-all hover:text-[var(--color-text-hover)]" href="/ministry">
            Ministry
          </a>
          <a className="retro-button" href="https://discord.gg/Wd3Tk2ANNd" target="_blank" rel="noopener noreferrer">
            Join the Greenhouse!
          </a>
        </nav>
      </div>
    </header>
  );
}