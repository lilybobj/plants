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
  const [physics, setPhysics] = useState<StarPhysics | null>(null);
  const rotationVelocityRef = useRef(0);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const physicsRef = useRef<StarPhysics | null>(null);
  const rotRef = useRef(0);

  // register initial position
  useEffect(() => {
    starRegistry.set(id, { x: originX, y: originY });
    return () => { starRegistry.delete(id); };
  }, [id, originX, originY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lastMouseRef.current) {
        const dx = e.clientX - lastMouseRef.current.x;
        const dy = e.clientY - lastMouseRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const direction = dx > 0 ? 1 : -1;
        rotationVelocityRef.current = direction * speed * 0.5;

        const starX = physicsRef.current?.launched ? physicsRef.current.x : originX;
        const starY = physicsRef.current?.launched ? physicsRef.current.y : originY;
        const distToStar = Math.sqrt(Math.pow(e.clientX - starX, 2) + Math.pow(e.clientY - starY, 2));

        // launch threshold
        if (speed > 60 && distToStar < 150) {
          const angle = Math.atan2(dy, dx);
          const newPhysics = {
            x: starX,
            y: starY,
            vx: Math.cos(angle) * speed * 0.3,
            vy: Math.sin(angle) * speed * 0.3,
            launched: true,
          };
          physicsRef.current = newPhysics;
          setPhysics({ ...newPhysics });
        }
      }
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [originX, originY]);

  useEffect(() => {
    const GRAVITY = 0.10;
    const FRICTION = 0.995;
    const BOUNCE = 0.80;
    const REPEL_RADIUS = 150;
    const REPEL_FORCE = 6;

    const animate = () => {
      rotationVelocityRef.current *= 0.95;
      rotRef.current += rotationVelocityRef.current;
      setRotation(rotRef.current);

      if (physicsRef.current?.launched) {
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

  if (physics?.launched) {
    return (
      <div
        className="fixed z-[999]"
        style={{ left: physics.x, top: physics.y, transform: `rotate(${rotation}deg)` }}
      >
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
    );
  }

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