"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FloatingStars } from "./FloatingStars";

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
  { src: "/images/heart.png", label: "Ministry", href: "/ministry" },
  { src: "/images/key.png", label: "Join Us", href: "#" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative w-full mt-[65px] h-[calc(100vh-65px)] overflow-hidden bg-[var(--color-bg2)]">

      {/* LAYER 0: CHECKERBOARD BACKDROP */}
      <Image
        src="/images/hero checkerboard.png"
        alt=""
        fill
        className="object-fill z-0"
        priority
      />

      {/* LAYER 1: INSET HERO IMAGE (leaves checkerboard as a border) */}
      <div className="absolute z-[1]" style={{ top: 23, bottom: 23, left: 15, right: 15 }}>
        <Image
          src="/images/hero image.png"
          alt="greenhaus"
          fill
          className="object-fill"
          priority
        />
      </div>
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
        className="w-auto h-auto max-w-[120px] absolute bottom-1 right-1 z-10"
      />

      {/* LAYER 2: CENTERED CONTENT STACK */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">

        {/* TEXT + STARS OVERLAY GROUP */}
        <div className="relative flex items-center justify-center">
          <Image
            src="/images/hero text w texture.png"
            alt="Welcome"
            width={560}
            height={260.42}
            priority
          />

          <FloatingStars 
            id="green"
            src="/images/Star g.png"
            alt="green star"
            width={80}
            height={80}
            className="absolute -left-25 top-1/2 -translate-y-1/2"
            originX={300}
            originY={400}
          />
          <FloatingStars
            id="pink"
            src="/images/Star p.png"
            alt="pink star"
            width={100}
            height={100}
            className="absolute right-[180px] -top-16"
            originX={700}
            originY={300}
          />
          <FloatingStars
            id="yellow"
            src="/images/Star y.png"
            alt="yellow star"
            width={80}
            height={80}
            className="absolute -right-8 -top-2"
            originX={900}
            originY={350}
          />
        </div>

        <Image
          src="/images/cta.png"
          alt="Cta"
          width={300}
          height={41}
        />
      </div>

     {/* LAYER 3: DESKTOP ICONS - vertical left column, centered within the border margin */}
      <div
        className="absolute z-20 left-[15px] md:left-[25px] flex flex-col justify-center gap-[10px] pb-[40px]"
        style={{ top: 23, bottom: 23 }}
      >
        {desktopIcons.map((icon) => (
          <a
            key={icon.label}
            href={icon.href}
            className="flex flex-col items-center cursor-pointer transition-all hover:brightness-130 hover:contrast-120 active:brightness-75 active:scale-95"
            style={{ width: "clamp(60px, 7vw, 100px)" }}
          >
            <Image
              src={icon.src}
              alt={icon.label}
              width={100}
              height={100}
              className="object-contain drop-shadow-lg"
              style={{ width: "clamp(60px, 7vw, 100px)", height: "clamp(60px, 7vw, 100px)" }}
            />
            <span
              className="windows-font text-[16px] text-center text-white leading-tight px-1 -mt-1"
              style={{ textShadow: "1px 1px 2px black" }}
            >
              {icon.label}
            </span>
          </a>
        ))}
      </div>

    </section>
  );
}