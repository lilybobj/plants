import Image from "next/image";

export default function Intro() {
  return (
    <section className="mx-auto mt-16 max-w-3xl px-6 text-left pt-25">
      
       <div className="flex flex-col items-center gap-3">
    <Image
      src="/images/new enthus.png"
      alt="new"
      width={675.9}
      height={103.35}
      priority
    />
    
  </div>

        <p className="text-xl">
          Founded in 2023, the Botanical Club is a growing community of students passionate about plants, ecology, and their connection to culture and justice. Our mission is to promote botanical research and outreach at UCLA through hands-on projects.
          <br />
          <br />
          Current projects encompass regional biogeographic exhibits at Mathias Botanical Gardens, the cultivation of an education greenhouse plant collection, herbarium studies, and the development of ethnobotanical narratives in collaboration with academic and community partners.
        </p>

    </section>
  );
}