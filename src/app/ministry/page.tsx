"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Header from "../../components/Header";

const members = [
  {
    id: 1,
    name: "Gracie Lu",
    role: "Minister of Orchids",
    year: "Junior",
    major: "Design Media Arts",
    why: "I love learning about how to care for so many different kinds of plants!",
    freeTime: "I enjoy playing instruments and doing pottery.",
    photo: "/images/ministry/gracie.jpg",
    color: "#f9a8d4",
  },
  {
    id: 2,
    name: "Juno Lumetta",
    role: "Minister of Media",
    year: "Senior",
    major: "Art History",
    why: "While walking from the botanical garden to Dodd carrying a giant leaf, I met JB.",
    freeTime: "Anything art related, enjoy nature, make and eat food, and many other things :3",
    photo: "/images/ministry/juno.jpg",
    color: "#86efac",
  },
  {
    id: 3,
    name: "Nikita Burger",
    role: "President",
    year: "Senior",
    major: "Computational and Systems Biology",
    why: "I love plants and people who love plants!",
    freeTime: "I like to find beautiful things, play the drums, and procrastinate.",
    photo: "/images/ministry/nikita.jpg",
    color: "#fde68a",
  },
  {
    id: 4,
    name: "Lily Jiang",
    role: "Minister of DANCE",
    year: "Junior",
    major: "Neuroscience",
    why: "I grow various substances and I ran into JB in the library; we were going croc for croc.",
    freeTime: "I play games in a bungling manner, watch movies in a fugue state, and cook up a storm.",
    photo: "/images/ministry/lily.jpg",
    color: "#a5f3fc",
  },
  {
    id: 5,
    name: "Elly Wurts",
    role: "Minister of Events",
    year: "Junior",
    major: "EEB",
    why: "I love plants and always wondered about the mysterious greenhouse at the back of the botanical garden.",
    freeTime: "Lots of drawing, crafting, and movie watching.",
    photo: "/images/ministry/elly.jpg",
    color: "#c4b5fd",
  },
  {
    id: 6,
    name: "Melody Zhang",
    role: "Minister of Horrors",
    year: "Junior",
    major: "Design / Consumer Psych",
    why: "I CRAWL IN THROUGH MY TROJAN HORSE. I SCHEME AND I SNICKER. I LIVE FOR THE SUBTERFUGE.",
    freeTime: "I love washing spinach.",
    photo: "/images/ministry/melody.jpg",
    color: "#fca5a5",
  },
  {
    id: 7,
    name: "Pepper Dai",
    role: "Inventory & Carnivorous Plants",
    year: "Senior",
    major: "Biology",
    why: "I saw a tray of really sad sundews in the window and wanted to fix stuff.",
    freeTime: "Drawing; Vocaloid; Synthesizer DIY; Game dev",
    photo: "/images/ministry/pepper.jpg",
    color: "#fdba74",
  },
];

// Ball positions inside the gumball machine (as % of container)
const ballPositions = [
  { x: 38, y: 38 },
  { x: 55, y: 42 },
  { x: 28, y: 50 },
  { x: 47, y: 55 },
  { x: 62, y: 50 },
  { x: 35, y: 62 },
  { x: 52, y: 65 },
];

function MemberCard({ member, onClose }: { member: typeof members[0]; onClose: () => void }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="relative w-[340px] h-[480px]"
        style={{ perspective: "1000px" }}
        onClick={(e) => { e.stopPropagation(); setFlipped(f => !f); }}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
            style={{
              backfaceVisibility: "hidden",
              background: member.color,
              border: "3px solid #1a1a1a",
              boxShadow: "6px 6px 0 #1a1a1a",
            }}
          >
            <div className="relative w-full h-[260px] shrink-0">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 flex flex-col gap-1">
              <p className="windows-font text-[22px] text-[#1a1a1a] leading-tight">{member.name}</p>
              <p className="windows-font text-[13px] text-[#333]">{member.role}</p>
              <p className="text-[13px] text-[#444] mt-1">{member.year} · {member.major}</p>
              <p className="text-[11px] text-[#555] mt-2 italic">Click to flip ↻</p>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col justify-center p-6 gap-4"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#0a1a06",
              border: `3px solid ${member.color}`,
              boxShadow: `6px 6px 0 ${member.color}`,
            }}
          >
            <p className="windows-font text-[18px]" style={{ color: member.color }}>{member.name}</p>
            <div>
              <p className="windows-font text-[11px] text-green-500 uppercase tracking-widest mb-1">Why I joined</p>
              <p className="text-[14px] text-green-200 leading-snug">"{member.why}"</p>
            </div>
            <div>
              <p className="windows-font text-[11px] text-green-500 uppercase tracking-widest mb-1">Free time</p>
              <p className="text-[14px] text-green-200 leading-snug">"{member.freeTime}"</p>
            </div>
            <p className="text-[11px] text-green-600 mt-2 italic">Click to flip back ↻</p>
          </div>
        </div>
      </div>
      <button
        className="absolute top-6 right-8 windows-font text-white text-2xl hover:text-green-400 transition-colors"
        onClick={onClose}
      >✕</button>
    </div>
  );
}

export default function Ministry() {
  const [dispensed, setDispensed] = useState<number[]>([]);
  const [activeCard, setActiveCard] = useState<typeof members[0] | null>(null);
  const [leverPulled, setLeverPulled] = useState(false);
  const [ejecting, setEjecting] = useState(false);

  const availableMembers = members.filter(m => !dispensed.includes(m.id));

  const pullLever = () => {
    if (leverPulled || availableMembers.length === 0) return;

    setLeverPulled(true);
    setEjecting(true);

    setTimeout(() => {
      const next = availableMembers[Math.floor(Math.random() * availableMembers.length)];
      setDispensed(d => [...d, next.id]);
      setActiveCard(next);
      setEjecting(false);
      setLeverPulled(false);
    }, 600);
  };

  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-[65px] flex flex-col items-center justify-start pb-20"
        style={{ background: "var(--color-bg)" }}
      >
        {/* Title */}
        <div className="mt-4 text-center">
          <h1 className="windows-font text-[48px] text-[var(--color-text-main)]" style={{ textShadow: "0 0 20px rgba(133,205,66,0.5)" }}>
            The Ministry
          </h1>
          <p className="text-[16px] text-[#2B8124]">Pull the lever to meet a member</p>
        </div>

        {/* Gumball Machine */}
        <div className="relative" style={{ width: 500, height: 620 }}>

          {/* Machine body - CSS gumball machine */}
          <svg width="500" height="620" viewBox="0 0 500 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stand */}
            <rect x="220" y="530" width="60" height="80" rx="4" fill="#1a2e10" stroke="#4a7c30" strokeWidth="2"/>
            <rect x="180" y="595" width="140" height="20" rx="6" fill="#1a2e10" stroke="#4a7c30" strokeWidth="2"/>

            {/* Neck */}
            <rect x="215" y="480" width="70" height="60" rx="4" fill="#0f1f08" stroke="#4a7c30" strokeWidth="2"/>

            {/* Dispenser slot */}
            <rect x="205" y="490" width="90" height="18" rx="4" fill="#0a1200" stroke="#85CD42" strokeWidth="1.5"/>

            {/* Main globe */}
            <circle cx="250" cy="280" r="190" fill="#0d2008" stroke="#3a6020" strokeWidth="3"/>
            <circle cx="250" cy="280" r="185" fill="url(#globeGrad)" stroke="#85CD42" strokeWidth="1.5" opacity="0.9"/>

            {/* Globe shine */}
            <ellipse cx="200" cy="180" rx="60" ry="40" fill="white" opacity="0.06" transform="rotate(-20 200 180)"/>
            <ellipse cx="190" cy="175" rx="30" ry="18" fill="white" opacity="0.04" transform="rotate(-20 190 175)"/>

            {/* Bottom cap */}
            <ellipse cx="250" cy="460" rx="90" ry="18" fill="#1a2e10" stroke="#4a7c30" strokeWidth="2"/>
            <rect x="175" y="448" width="150" height="30" rx="4" fill="#1a2e10" stroke="#4a7c30" strokeWidth="2"/>

            {/* Lever arm */}
            <g
              transform={leverPulled ? "translate(370, 340) rotate(30)" : "translate(370, 300) rotate(0)"}
              style={{ transition: "transform 0.3s ease", cursor: "pointer" }}
              onClick={pullLever}
            >
              <rect x="-8" y="-60" width="16" height="80" rx="6" fill="#85CD42" stroke="#436721" strokeWidth="2"/>
              <circle cx="0" cy="-65" r="14" fill="#6BC914" stroke="#436721" strokeWidth="2"/>
              <text x="0" y="-60" textAnchor="middle" fontSize="14" fill="#0a1200" fontWeight="bold">↓</text>
            </g>

            {/* Lever base */}
            <circle cx="370" cy="340" r="10" fill="#2a4a18" stroke="#85CD42" strokeWidth="2"/>

            {/* Label */}
            <text x="250" y="575" textAnchor="middle" fontSize="11" fill="#85CD42" fontFamily="monospace" letterSpacing="2">
              {availableMembers.length > 0 ? `${availableMembers.length} left` : "all dispensed!"}
            </text>

            <defs>
              <radialGradient id="globeGrad" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#1a3a0f"/>
                <stop offset="100%" stopColor="#050e03"/>
              </radialGradient>
            </defs>
          </svg>

          {/* Balls inside globe */}
          {members.map((member, i) => {
            const pos = ballPositions[i];
            const isDispensed = dispensed.includes(member.id);
            return (
              <div
                key={member.id}
                className="absolute rounded-full transition-all duration-500 overflow-hidden border-2 border-black/30"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: 52,
                  height: 52,
                  transform: "translate(-50%, -50%)",
                  opacity: isDispensed ? 0 : 1,
                  background: member.color,
                  boxShadow: `inset -4px -4px 8px rgba(0,0,0,0.3), inset 2px 2px 6px rgba(255,255,255,0.3)`,
                  cursor: "pointer",
                  animation: !isDispensed ? `float${i % 3} ${2 + i * 0.3}s ease-in-out infinite` : "none",
                }}
                onClick={() => setActiveCard(member)}
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover opacity-80"
                />
              </div>
            );
          })}

          {/* Ejecting ball animation */}
          {ejecting && (
            <div
              className="absolute rounded-full border-2 border-black/30"
              style={{
                left: "46%",
                top: "80%",
                width: 40,
                height: 40,
                background: "#85CD42",
                animation: "eject 0.6s ease-in forwards",
              }}
            />
          )}

          {/* Lever click hint */}
          {availableMembers.length > 0 && (
            <div
              className="absolute windows-font text-[11px] text-green-500 cursor-pointer hover:text-green-300 transition-colors"
              style={{ right: 10, top: 290 }}
              onClick={pullLever}
            >
              ← pull
            </div>
          )}
        </div>

        {/* Dispensed members row */}
        {dispensed.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4 max-w-2xl px-4">
            <p className="w-full text-center windows-font text-[13px] text-green-600 mb-2">dispensed — click to view</p>
            {dispensed.map(id => {
              const m = members.find(x => x.id === id)!;
              return (
                <button
                  key={id}
                  onClick={() => setActiveCard(m)}
                  className="flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                >
                  <div
                    className="w-14 h-14 rounded-full overflow-hidden border-2"
                    style={{ borderColor: m.color, boxShadow: `0 0 8px ${m.color}50` }}
                  >
                    <Image src={m.photo} alt={m.name} width={56} height={56} className="object-cover w-full h-full" />
                  </div>
                  <span className="windows-font text-[10px] text-[var(--color-text-main)]">{m.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        )}

        <style>{`
          @keyframes float0 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-5px)} }
          @keyframes float1 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-7px)} }
          @keyframes float2 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-4px)} }
          @keyframes eject { 0%{transform:translate(-50%,-50%) scale(1);opacity:1} 100%{transform:translate(-50%,100px) scale(0.5);opacity:0} }
        `}</style>
      </main>

      {activeCard && (
        <MemberCard member={activeCard} onClose={() => setActiveCard(null)} />
      )}
    </>
  );
}