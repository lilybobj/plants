"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getOrCreateLenis, ScrollTrigger } from "../lib/scroll";

export default function FixedLogo() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    getOrCreateLenis();
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom 80%",
      onEnter: () => {
        gsap.fromTo(el,
          { x: 120, opacity: 0, rotation: 360 },
          { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: "power3.out" }
        );
      },
      onLeaveBack: () => {
        gsap.to(el, { x: 120, opacity: 0, rotation: -360, duration: 0.45, ease: "power2.in" });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <Image
      ref={ref}
      src="/images/logo.png"
      alt="Logo"
      width={80}
      height={92}
      className="fixed bottom-4 right-4 z-[100] mix-blend-exclusion invert pointer-events-none"
      style={{ opacity: 0, transform: "translateX(120px)" }}
    />
  );
}
