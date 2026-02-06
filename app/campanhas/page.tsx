const campaigns = [
  {
    id: "varn-01",
    name: "Sino que Não Para",
    tone: "Investigação sombria",
    factionFocus: "Forjas Juradas vs Véu"
  }
];

export default function CampaignsPage() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1 className="text-3xl font-semibold">Campanhas</h1>
        <p className="text-slate-300">
          Gerencie campanhas, mapas, facções, handouts e permissões por papel.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="panel p-6">
            <h2 className="text-xl font-semibold text-slate-100">{campaign.name}</h2>
            <p className="mt-2 text-sm text-slate-300">Tom: {campaign.tone}</p>
            <p className="mt-1 text-sm text-slate-300">
              Foco: {campaign.factionFocus}
            </p>
            <div className="mt-4 flex gap-2">
              <span className="badge">Mestre</span>
              <span className="badge">Jogadores 3</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
