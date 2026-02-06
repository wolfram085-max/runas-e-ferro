import Link from "next/link";

const steps = [
  {
    title: "Criar campanha",
    detail: "Defina tom, mapa, facções, handouts e convide jogadores."
  },
  {
    title: "Criar personagens",
    detail: "Monte fichas completas com validações por nível e audit log."
  },
  {
    title: "Abrir sala em tempo real",
    detail: "Chat, rolagens, logs e painel lateral de regras."
  },
  {
    title: "Combate por turnos",
    detail: "Iniciativa, ordem, ações rápidas e estado persistido."
  },
  {
    title: "Encerrar sessão",
    detail: "Resumo automático curto, longo, ganchos e TTS narrado."
  }
];

export default function DemoPage() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <Link className="text-sm text-slate-400" href="/">
          ← Voltar
        </Link>
        <h1 className="text-4xl font-semibold">Fluxo Demo Completo</h1>
        <p className="max-w-2xl text-slate-300">
          Este fluxo mostra o caminho completo de ponta a ponta, com dados seedados e estado
          persistido no banco. Use-o como roteiro de QA e apresentação comercial.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="badge">Tempo real</span>
          <span className="badge">Turnos + rolagens</span>
          <span className="badge">Resumos automáticos</span>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <div key={step.title} className="panel p-6">
            <span className="badge">Passo {index + 1}</span>
            <h2 className="mt-3 text-xl font-semibold text-slate-100">{step.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{step.detail}</p>
          </div>
        ))}
      </section>

      <section className="panel p-6">
        <h2 className="text-xl font-semibold">Acesso rápido</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="ghost-button" href="/campanhas">
            Campanhas
          </Link>
          <Link className="ghost-button" href="/personagens">
            Personagens
          </Link>
          <Link className="ghost-button" href="/sessoes">
            Sessões
          </Link>
          <Link className="ghost-button" href="/sala/demo">
            Sala em tempo real
          </Link>
        </div>
      </section>
    </main>
  );
}
