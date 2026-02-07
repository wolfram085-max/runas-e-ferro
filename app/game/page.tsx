export default function GameDashboard() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1 className="text-3xl font-semibold">Dashboard do Jogo</h1>
        <p className="text-slate-300">
          Área logada para gerenciar campanhas, personagens e sessões.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        <a className="panel p-5" href="/game/campaigns">
          <h2 className="text-lg font-semibold">Campanhas</h2>
          <p className="mt-2 text-sm text-slate-300">Crie e gerencie campanhas.</p>
        </a>
        <a className="panel p-5" href="/game/characters">
          <h2 className="text-lg font-semibold">Personagens</h2>
          <p className="mt-2 text-sm text-slate-300">Fichas completas e histórico.</p>
        </a>
        <a className="panel p-5" href="/game/sessions">
          <h2 className="text-lg font-semibold">Sessões</h2>
          <p className="mt-2 text-sm text-slate-300">Sessões LIVE e resumos.</p>
        </a>
      </section>
    </main>
  );
}
