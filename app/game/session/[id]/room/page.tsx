export default function GameRoomPage() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1 className="text-3xl font-semibold">Sala da sessão (LIVE)</h1>
        <p className="text-slate-300">
          Use a sala completa em <a className="underline" href="/sala/demo">/sala/demo</a>.
        </p>
      </header>
      <section className="panel p-6">
        <p className="text-sm text-slate-300">
          Este atalho existe para a estrutura /game. A sala completa está no módulo atual e
          será migrada para /game/session/[id]/room na próxima etapa.
        </p>
      </section>
    </main>
  );
}
