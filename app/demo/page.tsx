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
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="space-y-4">
        <Link className="text-sm text-slate-400" href="/">
          ← Voltar
        </Link>
        <h1 className="text-4xl font-semibold">Fluxo Demo Completo</h1>
        <p className="max-w-2xl text-slate-300">
          Este fluxo mostra o caminho completo de ponta a ponta, com dados seedados e estado
          persistido no banco. Use-o como roteiro de QA e apresentação comercial.
        </p>
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
          <Link className="badge" href="/campanhas">
            Campanhas
          </Link>
          <Link className="badge" href="/personagens">
            Personagens
          </Link>
          <Link className="badge" href="/sessoes">
            Sessões
          </Link>
          <Link className="badge" href="/sala/demo">
            Sala em tempo real
          </Link>
        </div>
      </section>
    </main>
  );
}
