import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16">
      <header className="space-y-4">
        <span className="badge">SaaS Runas e Ferro</span>
        <h1 className="text-4xl font-semibold text-slate-100 md:text-6xl">
          Runas e Ferro Studio
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Jogue campanhas completas em pt-BR com sala em tempo real, combate por turnos
          e IA copiloto. Modo mestre humano ou IA como mestre com protocolo rígido de turnos.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            className="rounded-full bg-rf-brand px-6 py-3 text-sm font-semibold text-white"
            href="/demo"
          >
            Ver Demo guiada
          </Link>
          <Link
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200"
            href="/regras"
          >
            Navegar Regras
          </Link>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Campanhas + fichas completas",
            description:
              "Crie campanhas, personagens com validações por nível e histórico de alterações."
          },
          {
            title: "Sala em tempo real",
            description:
              "Chat, logs, rolagens e turn tracker persistente com ações rápidas de combate."
          },
          {
            title: "IA com guardrails",
            description:
              "Copiloto do mestre ou mestre IA com RAG do livro básico e estilo controlado."
          }
        ].map((card) => (
          <div key={card.title} className="panel p-6">
            <h3 className="text-lg font-semibold text-slate-100">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{card.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
