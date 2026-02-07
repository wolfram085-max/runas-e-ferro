import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell">
      <header className="page-header">
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
            className="ghost-button"
            href="/regras"
          >
            Navegar Regras
          </Link>
          <Link className="ghost-button" href="/sala/demo">
            Entrar na sala demo
          </Link>
          <Link className="ghost-button" href="/wiki">
            Abrir Wiki pública
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

      <section className="panel grid gap-6 p-6 md:grid-cols-[2fr,1fr]">
        <div>
          <h2 className="text-xl font-semibold">Fluxo guiado para mestres</h2>
          <p className="mt-2 text-sm text-slate-300">
            Siga o roteiro da Demo para validar o MVP: criar campanha → personagens → abrir sala
            → combate por turnos → encerrar sessão com resumo automático.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="badge">IA com guardrails</span>
            <span className="badge">RAG do livro básico</span>
            <span className="badge">Voz opcional</span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-wide text-slate-400">Checklist rápido</p>
          <ul className="mt-3 space-y-2">
            <li>✅ Campanha criada</li>
            <li>✅ 3 personagens seedados</li>
            <li>✅ Turn tracker ativo</li>
            <li>✅ Resumo curto e longo</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
