"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function CircleQuote() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const rafRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(null);

  useEffect(() => {
    if (spinning) {
      const animate = (time: number) => {
        if (lastTimeRef.current !== null) {
          const delta = time - lastTimeRef.current;
          setRotation(r => r + delta * 0.04); // speed: increase multiplier to spin faster
        }
        lastTimeRef.current = time;
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spinning]);

  return (
    <div className="flex flex-col mt-10 items-center gap-3">
      <div
        className="relative flex items-center justify-center w-[720px] h-[720px]"
        onMouseEnter={() => setSpinning(true)}
        onMouseLeave={() => setSpinning(false)}
      >
        <Image
          src="/images/sirko.png"
          alt="ring"
          width={719.81}
          height={716.97}
          className="absolute w-[719.81px] h-auto"
          style={{ transform: `rotate(${rotation}deg)` }}
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