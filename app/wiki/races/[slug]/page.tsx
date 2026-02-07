const infoBox = [
  { label: "Origem", value: "Várn" },
  { label: "Traços", value: "2" },
  { label: "Ajustes", value: "+1 DEF ou treino" }
];

export default function RaceEntry({ params }: { params: { slug: string } }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <article className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase text-slate-500">Raça</p>
          <h1 className="text-3xl font-semibold">{params.slug}</h1>
          <p className="text-slate-600">
            Entrada gerada a partir do Livro Básico. Conteúdo completo será carregado via
            ingestão do PDF.
          </p>
        </header>
        <img
          src={`/media/races/${params.slug}.webp`}
          alt={`Arte da raça ${params.slug}`}
          className="h-64 w-full rounded-2xl object-cover"
        />
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Traços principais</h2>
          <ul className="list-disc space-y-1 pl-6 text-slate-600">
            <li>Traço 1 descritivo.</li>
            <li>Traço 2 descritivo.</li>
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Ajustes e escolhas</h2>
          <p className="text-slate-600">
            Se houver escolha, o mestre pode adaptar os traços para seu conceito.
          </p>
        </section>
      </article>
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-500">Infobox</h3>
        <dl className="mt-3 space-y-3 text-sm">
          {infoBox.map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase text-slate-400">{item.label}</dt>
              <dd className="text-slate-700">{item.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
