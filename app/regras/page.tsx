import fs from "node:fs/promises";
import path from "node:path";
import { RulesViewer } from "@/components/rules-viewer";

export default async function RulesPage() {
  const filePath = path.join(process.cwd(), "data", "rules", "runas-e-ferro.md");
  const content = await fs.readFile(filePath, "utf-8");

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1 className="text-3xl font-semibold">Regras de Runas e Ferro</h1>
        <p className="text-slate-300">
          Viewer navegável com sumário lateral e busca instantânea. Este conteúdo alimenta o
          módulo de IA com RAG.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="badge">Conteúdo indexado</span>
          <span className="badge">Links internos</span>
          <span className="badge">Abrir no painel lateral</span>
        </div>
      </header>

      <RulesViewer content={content} />
    </main>
  );
}
