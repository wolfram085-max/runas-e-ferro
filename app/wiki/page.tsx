const categories = [
  {
    title: "Raças",
    description: "Todas as raças jogáveis e suas características.",
    href: "/wiki/races"
  },
  {
    title: "Classes",
    description: "Classes, progressão e estilos de combate.",
    href: "/wiki/classes"
  },
  {
    title: "Runas",
    description: "Magias rúnicas e listas por nível.",
    href: "/wiki/runes"
  },
  {
    title: "Itens",
    description: "Armas, armaduras, tesouros e itens mágicos.",
    href: "/wiki/items"
  },
  {
    title: "Bestiário",
    description: "Criaturas e ND do continente de Várn.",
    href: "/wiki/bestiary"
  },
  {
    title: "Cenário",
    description: "Mapa, regiões e ganchos de campanha.",
    href: "/wiki/setting"
  },
  {
    title: "Facções",
    description: "Forjas Juradas, Véu e O Selo.",
    href: "/wiki/factions"
  }
];

export default function WikiHome() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Enciclopédia de Runas e Ferro</h1>
        <p className="text-slate-600">
          Wiki pública com busca e páginas navegáveis do Livro Básico v2.0.
        </p>
        <div>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            placeholder="Buscar na wiki..."
          />
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <a
            key={category.title}
            href={category.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
          >
            <h2 className="text-lg font-semibold">{category.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{category.description}</p>
          </a>
        ))}
      </section>
    </div>
  );
}
