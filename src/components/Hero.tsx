"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function SpinningStar({ src, alt, width, height, className }: {
  src: string; alt: string; width: number; height: number; className?: string;
}) {
  const [rotation, setRotation] = useState(0);
  const velocityRef = useRef(0);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lastMouseRef.current) {
        const dx = e.clientX - lastMouseRef.current.x;
        const dy = e.clientY - lastMouseRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const direction = dx > 0 ? 1 : -1;
        velocityRef.current = direction * speed * 0.5;
      }
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      velocityRef.current *= 0.95; // friction
      setRotation(r => r + velocityRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}
const desktopIcons = [
  { src: "/images/acorn.png", label: "Greenhouse", href: "#" },
  { src: "/images/bfly.png", label: "Archive", href: "#" },
  { src: "/images/flower.png", label: "Events", href: "#" },
  { src: "/images/heart.png", label: "Ministry", href: "#" },
  { src: "/images/key.png", label: "Join Us", href: "#" },
];

export default function Hero() {
  return (
    <section className="relative w-full min-h-[858px] bg-[var(--color-bg2)]">

      {/* LAYER 1: HERO BORDER */}
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
            src="/images/hero text w texture.png"
            alt="Welcome"
            width={661.13}
            height={307.47}
            priority
          />

          {/* GREEN STAR - left of text */}
          <SpinningStar
            src="/images/star g.png"
            alt="green star"
            width={80}
            height={80}
            className="absolute -left-25 top-1/2 -translate-y-1/2"
          />

          {/* PINK STAR - upper right */}
          <SpinningStar
            src="/images/star p.png"
            alt="pink star"
            width={100}
            height={100}
            className="absolute right-[180px] -top-16"
          />

          {/* YELLOW STAR - upper right, above pink */}
          <SpinningStar
            src="/images/star y.png"
            alt="yellow star"
            width={80}
            height={80}
            className="absolute -right-8 -top-2"
          />
        </div>

        <Image
          src="/images/cta.png"
          alt="Cta"
          width={300}
          height={41}
        />
      </div>

     {/* LAYER 3: DESKTOP ICONS - vertical left column */}
      <div className="absolute z-20 left-[24px] top-[160px] md:left-[60px] md:top-[70px] flex flex-col gap-6">
        {desktopIcons.map((icon) => (
          <a
            key={icon.label}
  href={icon.href}
  className="flex flex-col items-center gap-0 w-[80px] cursor-pointer hover:brightness-130 hover:contrast-120 active:brightness-75 active:scale-95 transition-all"
>
<div className="relative w-[120px] h-[120px]">
  <Image
    src={icon.src}
    alt={icon.label}
    fill
    className="object-contain drop-shadow-lg"
  />

              
            </div>
            <span className="windows-font text-[16px] text-center text-[var(--color-text-main)] leading-tight px-1 -mt-5"
              style={{ textShadow: "1px 1px 2px black" }}>
              {icon.label}
            </span>
          </a>
        ))}
      </div>


      {/* LAYER 4: LOGO */}
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