"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getOrCreateLenis, ScrollTrigger } from "../lib/scroll";

const CRITICAL_IMAGES = [
  "green grad.png", "logo.png", "club text.png", "hero checkerboard.png",
  "botanical playground.png", "snail.png", "hero text w texture.png",
  "Star g.png", "Star p.png", "Star y.png", "cta.png",
  "acorn.png", "bfly.png", "flower.png", "heart.png", "key.png", "middle margin.png",
];

export default function IntroOverlay({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(true);
  const [slideOut, setSlideOut] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [dot1, setDot1] = useState(false);
  const [dot2, setDot2] = useState(false);
  const [stemIn, setStemIn] = useState(false);
  const [bloomed, setBloomed] = useState(false);
  const bloomRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    document.body.classList.add("intro-active");
    document.body.style.overflow = "hidden";

    const preloadDone = Promise.all(
      CRITICAL_IMAGES.map(name => new Promise<void>(resolve => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = "/images/" + encodeURIComponent(name);
      }))
    );

    const timers = [
      setTimeout(() => setTextVisible(true), 400),
      setTimeout(() => setDot1(true), 900),
      setTimeout(() => setDot2(true), 1250),
      setTimeout(() => setStemIn(true), 1600),
      setTimeout(() => {
        setBloomed(true);
        const bloom = bloomRef.current;
        if (bloom) {
          bloom.style.transformOrigin = "50% 50%";
          let angle = 0;
          let velocity = 35;
          const spin = () => {
            velocity *= 0.92;
            angle += velocity;
            bloom.style.transform = `rotate(${angle}deg)`;
            if (Math.abs(velocity) > 0.05) requestAnimationFrame(spin);
          };
          requestAnimationFrame(spin);
        }
      }, 2150),
    ];

    const minSequenceTime = new Promise<void>(r => setTimeout(r, 2800));
    const maxWait = new Promise<void>(r => setTimeout(r, 4000));

    Promise.all([minSequenceTime, Promise.race([preloadDone, maxWait])]).then(() => {
      setSlideOut(true);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || !slideOut) return;
    setActive(false);
    document.body.classList.remove("intro-active");
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    const lenis = getOrCreateLenis();
    lenis.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();
  };

  return (
    <>
      {active && (
        <div
          id="intro-overlay"
          className={slideOut ? "slide-out" : ""}
          onTransitionEnd={handleTransitionEnd}
        >
          <Image
            src="/images/intro bg.jpg"
            alt=""
            fill
            className="intro-bg-media"
            priority
          />
          <div className="intro-content">
            <div className="intro-dots-row">
              <span className={`intro-dot ${dot1 ? "visible" : ""}`}>.</span>
              <span className={`intro-dot ${dot2 ? "visible" : ""}`}>.</span>
              <span className={`intro-flower ${stemIn ? "stem-in" : ""} ${bloomed ? "bloomed" : ""}`}>
                <span className="stem">i</span>
                <span className="bloom-wrap">
                  <Image
                    ref={bloomRef}
                    className="bloom"
                    src="/images/intro flower.png"
                    alt=""
                    width={25}
                    height={25}
                  />
                </span>
              </span>
            </div>
            <div className={`intro-text ${textVisible ? "visible" : ""}`}>Building Terrain</div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
