"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// shared registry so stars know each other's positions
const starRegistry: Map<string, { x: number; y: number }> = new Map();

interface StarPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  launched: boolean;
}

export function FloatingStars({ src, alt, width, height, className, originX, originY, id }: {
  src: string; alt: string; width: number; height: number; className?: string;
  originX: number; originY: number; id: string;
}) {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [physics, setPhysics] = useState<StarPhysics | null>(null);
  const rotationVelocityRef = useRef(0);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const recentSpeedsRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const physicsRef = useRef<StarPhysics | null>(null);
  const rotRef = useRef(0);
  const dismissingRef = useRef(false);
  const elRef = useRef<HTMLImageElement>(null);

  // register initial position
  useEffect(() => {
    starRegistry.set(id, { x: originX, y: originY });
    return () => { starRegistry.delete(id); };
  }, [id, originX, originY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!lastMouseRef.current) { lastMouseRef.current = { x: e.clientX, y: e.clientY }; return; }
      if (dismissingRef.current) { lastMouseRef.current = { x: e.clientX, y: e.clientY }; return; }

      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const direction = dx > 0 ? 1 : -1;
      rotationVelocityRef.current = direction * speed * 0.5;

      // rolling average so trigger works across different mouse-polling rates
      const recent = recentSpeedsRef.current;
      recent.push(speed);
      if (recent.length > 5) recent.shift();
      const avgSpeed = recent.reduce((a, b) => a + b, 0) / recent.length;

      const starX = physicsRef.current?.launched ? physicsRef.current.x : originX;
      const starY = physicsRef.current?.launched ? physicsRef.current.y : originY;
      const distToStar = Math.sqrt(Math.pow(e.clientX - starX, 2) + Math.pow(e.clientY - starY, 2));

      if ((speed > 25 || avgSpeed > 18) && distToStar < 220) {
        const angle = Math.atan2(dy, dx);
        const vx = Math.cos(angle) * speed * 0.3;
        const vy = Math.sin(angle) * speed * 0.3;

        if (!physicsRef.current?.launched) {
          const rect = elRef.current?.getBoundingClientRect();
          if (!rect || rect.width === 0) { lastMouseRef.current = { x: e.clientX, y: e.clientY }; return; }
          const trueX = rect.left + width / 2;
          const trueY = rect.top + height / 2;
          const trueDist = Math.sqrt(Math.pow(e.clientX - trueX, 2) + Math.pow(e.clientY - trueY, 2));
          if (trueDist > 220) { lastMouseRef.current = { x: e.clientX, y: e.clientY }; return; }

          const newPhysics = { x: trueX, y: trueY, vx, vy, launched: true };
          physicsRef.current = newPhysics;
          setPhysics({ ...newPhysics });
        } else {
          physicsRef.current = { ...physicsRef.current, vx, vy };
        }
      }
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [originX, originY, width, height]);

  useEffect(() => {
    const GRAVITY = 0.10;
    const FRICTION = 0.995;
    const BOUNCE = 0.80;
    const REPEL_RADIUS = 150;
    const REPEL_FORCE = 6;

    const animate = () => {
      if (!dismissingRef.current) {
        rotationVelocityRef.current *= 0.95;
        rotRef.current += rotationVelocityRef.current;
        setRotation(rotRef.current);
      }

      if (physicsRef.current?.launched && !dismissingRef.current) {
        let { x, y, vx, vy } = physicsRef.current;
        const floor = window.innerHeight - height - 30;

        vy += GRAVITY;
        vx *= FRICTION;
        vy *= FRICTION;
        x += vx;
        y += vy;

        // repel from other stars
        starRegistry.forEach((pos, otherId) => {
          if (otherId === id) return;
          const dx = x - pos.x;
          const dy = y - pos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }
        });

        // walls
        if (x <= 0) { x = 0; vx = Math.abs(vx) * BOUNCE; }
        if (x >= window.innerWidth - width) { x = window.innerWidth - width; vx = -Math.abs(vx) * BOUNCE; }

        // floor
        if (y >= floor) {
          y = floor;
          vy = -Math.abs(vy) * BOUNCE;
          vx *= 0.90;
          rotationVelocityRef.current *= 0.90;
          if (Math.abs(vy) < 0.5) vy = 0;
        }

        // ceiling
        if (y <= 0) { y = 0; vy = Math.abs(vy) * BOUNCE; }

        physicsRef.current = { x, y, vx, vy, launched: true };
        starRegistry.set(id, { x, y });
        setPhysics({ ...physicsRef.current });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [height, width, id]);

  const handleClick = () => {
    if (!physicsRef.current?.launched || dismissingRef.current) return;

    dismissingRef.current = true;
    let phase: "expand" | "shrink" = "expand";
    let expandFrames = 0;
    let localRotation = rotRef.current;
    let rotVel = 0;
    let localScale = 1;
    let localOpacity = 1;

    const exitAnim = () => {
      if (phase === "expand") {
        expandFrames++;
        const t = expandFrames / 6;
        localScale = 1 + Math.sin(t * Math.PI) * 0.5;
        if (expandFrames >= 6) {
          localScale = 1.2;
          phase = "shrink";
          rotVel = 10;
        }
      } else {
        localRotation += rotVel;
        rotVel *= 1.08;
        localScale -= 0.04;
        localOpacity -= 0.025;
      }

      setRotation(localRotation);
      setScale(localScale);
      setOpacity(Math.max(localOpacity, 0));

      if (localOpacity > 0) {
        requestAnimationFrame(exitAnim);
      } else {
        // reset to origin, ready to relaunch
        rotRef.current = 0;
        rotationVelocityRef.current = 0;
        physicsRef.current = null;
        starRegistry.set(id, { x: originX, y: originY });
        setPhysics(null);
        setRotation(0);
        setScale(1);
        setOpacity(0);
        dismissingRef.current = false;

        requestAnimationFrame(() => setOpacity(1));
      }
    };
    requestAnimationFrame(exitAnim);
  };

  if (physics?.launched) {
    return (
      <div
        className="fixed z-[999] cursor-pointer"
        style={{
          left: physics.x,
          top: physics.y,
          transform: `rotate(${rotation}deg) scale(${scale})`,
          opacity,
        }}
        onClick={handleClick}
      >
        <Image ref={elRef} src={src} alt={alt} width={width} height={height} />
      </div>
    );
  }

  return (
    <Image
      ref={elRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ transform: `rotate(${rotation}deg)`, opacity }}
    />
  );
}
