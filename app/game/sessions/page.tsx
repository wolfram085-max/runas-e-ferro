const sessions = [
  {
    id: "sessao-01",
    name: "Sessão 1 - O sino na ruína",
    date: "05/02/2026",
    status: "LIVE"
  }
];

export default function GameSessionsPage() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1 className="text-3xl font-semibold">Sessões</h1>
        <p className="text-slate-300">
          Crie sessões com participantes, notas e logs de eventos. Finalize para gerar
          resumos curtos, longos e narrados.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {sessions.map((session) => (
          <div key={session.id} className="panel p-6">
            <h2 className="text-xl font-semibold text-slate-100">{session.name}</h2>
            <p className="mt-2 text-sm text-slate-300">Data: {session.date}</p>
            <p className="mt-1 text-sm text-slate-300">Status: {session.status}</p>
            <div className="mt-4 flex gap-2">
              <a className="ghost-button" href={`/game/session/${session.id}/room`}>
                Abrir sala
              </a>
              <a className="ghost-button" href={`/game/session/${session.id}/summary`}>
                Ver resumo
              </a>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
