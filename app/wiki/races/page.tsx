const races = [
  { slug: "ferrineos", name: "Ferríneos", tags: ["defesa", "forja"] },
  { slug: "umbromar", name: "Umbromar", tags: ["sombra", "furtividade"] },
  { slug: "lunarios", name: "Lunários", tags: ["lua", "sobrevivência"] },
  { slug: "braseiros", name: "Braseiros", tags: ["fogo", "retaliação"] }
];

export default function WikiRaces() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Raças</h1>
        <p className="text-slate-600">Lista filtrável das raças do livro básico.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {races.map((race) => (
          <a
            key={race.slug}
            href={`/wiki/races/${race.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{race.name}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                Raça
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {race.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
