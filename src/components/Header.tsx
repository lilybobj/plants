"use client";
import Image from "next/image";
import Link from "next/link";
import { useIntroActive } from "../lib/introActive";

export default function Header() {
  const introActive = useIntroActive();
  return (
    <header className={`${introActive ? "relative" : "fixed top-0"} left-0 w-full z-50 h-[65px] bg-[var(--color-bg)]`}>
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
        <nav className="flex items-center gap-8 windows-font text-[13pt] text-[var(--color-text-main)]">
          <Link className="glow-hover transition-all hover:text-[var(--color-text-hover)]" href="/">
            Home
          </Link>
          <a className="glow-hover transition-all hover:text-[var(--color-text-hover)]" href="#">
            Digital Archive
          </a>
          <Link className="glow-hover transition-all hover:text-[var(--color-text-hover)]" href="/ministry">
            Ministry
          </Link>
          <a className="retro-button" href="https://discord.gg/Wd3Tk2ANNd" target="_blank" rel="noopener noreferrer">
            Join the Greenhaus!
          </a>
        </nav>
      </div>
    </header>
  );
}
