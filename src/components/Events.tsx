const events = [
  "Botanical Beauty and Evolutionary Biology",
  "What We Do Not See",
  "Chill Art Day"
];

export default function Events() {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-6">
      <h2 className="glow mb-6 text-center text-xl text-green-300">
        Keep up with the latest!
      </h2>

      <div className="grid gap-6 sm:grid-cols-3">
        {events.map((e) => (
          <div key={e} className="panel rounded-lg p-4 text-center">
            <p className="text-sm text-green-200">{e}</p>
          </div>
        ))}
      </div>
    </section>
  );
}