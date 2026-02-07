export default function SessionSummaryPage() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1 className="text-3xl font-semibold">Resumo da sessão</h1>
        <p className="text-slate-300">
          Resumo automático (curto e longo), NPCs/locais citados e ganchos da próxima sessão.
        </p>
      </header>
      <section className="panel p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Resumo curto</h2>
          <p className="text-sm text-slate-300">
            O grupo investigou a torre e selou o sino antigo após derrotar o Cavaleiro Oco.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Resumo longo</h2>
          <ul className="list-disc space-y-1 pl-6 text-sm text-slate-300">
            <li>Sola liderou a entrada na ruína.</li>
            <li>Kesh desarmou uma armadilha rúnica.</li>
            <li>Rinna gastou FOC para curar o grupo.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
