"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CircleQuote() {
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const spinningRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !spinningRef.current) {
          spinningRef.current = true;
          const start = performance.now();
          const introDuration = 1500;
          const introRotation = 150;
          let continuous = 0;

          const step = (now: number) => {
            const elapsed = Math.min(now - start, introDuration);
            const t = elapsed / introDuration;
            const eased = 1 - Math.pow(1 - t, 4);
            continuous += 360 / 20 / 60;
            setOpacity(Math.min(t * 3, 1));
            setRotation(eased * introRotation + continuous);
            rafRef.current = requestAnimationFrame(step);
          };
          rafRef.current = requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(wrap);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col mt-10 items-center gap-3">
      <div ref={wrapRef} className="relative flex items-center justify-center w-[720px] h-[720px]">
        <Image
          src="/images/sirko.png"
          alt="ring"
          width={719.81}
          height={716.97}
          className="absolute w-[719.81px] h-auto"
          style={{ transform: `rotate(${rotation}deg)`, opacity }}
        />
        <Image
          src="/images/plants plants.png"
          alt="quote"
          width={361}
          height={355}
          priority
        />
      </div>
    </div>
  );
}
