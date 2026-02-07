const characters = [
  {
    id: "sola",
    name: "Sola de Ferro",
    role: "Guerreira Jurada",
    status: "PV 18/18, FOC 3/3"
  },
  {
    id: "kesh",
    name: "Kesh Umbromar",
    role: "Ladino de Guilda",
    status: "PV 14/14, FOC 2/2"
  },
  {
    id: "rinna",
    name: "Rinna Braseira",
    role: "Arauta",
    status: "PV 12/12, FOC 4/4"
  }
];

export default function GameCharactersPage() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1 className="text-3xl font-semibold">Personagens</h1>
        <p className="text-slate-300">
          Fichas completas com validações por nível, import/export JSON e histórico.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {characters.map((character) => (
          <div key={character.id} className="panel p-6">
            <h2 className="text-xl font-semibold text-slate-100">{character.name}</h2>
            <p className="mt-2 text-sm text-slate-300">Classe: {character.role}</p>
            <p className="mt-1 text-sm text-slate-300">{character.status}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge">Audit log ativo</span>
              <span className="badge">Export JSON</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
