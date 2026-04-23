"use client";
import Image from "next/image";

const buttons = [
  { img: "/images/instagram frog.png", label: "Instagram", sub: "@botanicalclubucla", href: "https://www.instagram.com/botanicalclubatucla?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { img: "/images/beee.png", label: "Discord", sub: "Botanical Club at UCLA", href: "https://discord.gg/Wd3Tk2ANNd" },
  { img: "/images/purp.png", label: "Google Photos", sub: "Plants, plants, plants!", href: "https://photos.app.goo.gl/L5y5mxRH1Rkcs4MC6" },
  { img: "/images/dfly.png", label: "Playground", sub: "Coming soon!", href: "#" },
];

export default function WantMore() {
  return (
    <div className="flex flex-col mt-48 items-center gap-3">
      <Image src="/images/want more.png" alt="more" width={321.3} height={108.55} priority />
      <div className="relative">
        <Image src="/images/more rect.png" alt="more rect" width={924} height={272} priority />
       <div className="absolute inset-0 flex items-center justify-around px-8 -mt-15">
  {buttons.map((btn) => (
    <a
      key={btn.label}
      href={btn.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1 hover:scale-105 hover:brightness-130 hover:contrast-120 active:brightness-75 active:scale-95 transition-all cursor-pointer"
    >
      <Image src={btn.img} alt={btn.label} width={0} height={0} sizes="100vw" className="w-auto h-[200px] object-contain" />
      <span className="windows-font text-[25px] text-[#6BC914]">{btn.label}</span>
<span className="font-bold text-[16px] text-[#2B8124]">{btn.sub}</span>
    </a>
  ))}

</div>
      </div>
    </div>
  );
}