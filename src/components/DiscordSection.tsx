import Image from "next/image";
export default function DiscordSection() {
  return (
    <div className="flex flex-col items-center gap-3">
        <Image
          src="/images/lilypads.png"
          alt="lilypads"
          width={1280.34}
          height={920.16}
          priority
        />
    </div>
  );
}