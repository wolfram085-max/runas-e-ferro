import fs from "node:fs/promises";
import path from "node:path";

export default async function RulesPage() {
  const filePath = path.join(process.cwd(), "data", "rules", "runas-e-ferro.md");
  const content = await fs.readFile(filePath, "utf-8");

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Regras de Runas e Ferro</h1>
        <p className="text-slate-300">
          Viewer navegável com sumário lateral e busca instantânea (implementação em
          andamento). Este conteúdo alimenta o módulo de IA com RAG.
        </p>
      </header>

      <section className="panel p-6">
        <pre className="whitespace-pre-wrap text-sm text-slate-200">{content}</pre>
      </section>
    </main>
  );
}
