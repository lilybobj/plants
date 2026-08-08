import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

// Lazily creates the single shared Lenis instance and wires it into GSAP's
// ticker/ScrollTrigger. Safe to call from multiple components — only the
// first call does anything.
export function getOrCreateLenis(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    lerp: 0.15,
    duration: 1.0,
    smoothWheel: true,
    wheelMultiplier: 0.7,
    touchMultiplier: 1.5,
  });

  gsap.ticker.add((time) => {
    lenisInstance!.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  lenisInstance.on("scroll", () => ScrollTrigger.update());

  return lenisInstance;
}

export { ScrollTrigger };
