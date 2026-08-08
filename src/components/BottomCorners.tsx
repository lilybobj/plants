"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getOrCreateLenis } from "../lib/scroll";

export default function BottomCorners() {
  const leftRef = useRef<HTMLImageElement>(null);
  const rightRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const lenis = getOrCreateLenis();

    const tick = () => {
      const scrollY = lenis.scroll;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.max(0, (scrollY - maxScroll * 0.85) / (maxScroll * 0.15));
      const translateY = 100 - progress * 80;
      if (leftRef.current) {
        leftRef.current.style.transform = `translateY(${translateY}%)`;
        leftRef.current.style.opacity = "1";
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateY(${translateY}%)`;
        rightRef.current.style.opacity = "1";
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <>
      <Image
        ref={leftRef}
        src="/images/left corn.png"
        alt=""
        width={525.98}
        height={415}
        className="fixed bottom-0 left-0 z-10 pointer-events-none"
        style={{ transform: "translateY(200%)", opacity: 0 }}
      />
      <Image
        ref={rightRef}
        src="/images/right corn.png"
        alt=""
        width={487}
        height={317.05}
        className="fixed bottom-0 right-0 z-10 pointer-events-none"
        style={{ transform: "translateY(200%)", opacity: 0 }}
      />
    </>
  );
}
