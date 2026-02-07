export default function AdminPage() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1 className="text-3xl font-semibold">Admin da Wiki</h1>
        <p className="text-slate-300">
          Painel para publicar/editar páginas, gerenciar mídia e pré-visualizar conteúdo.
        </p>
      </header>
      <section className="panel p-6">
        <p className="text-sm text-slate-300">
          Conecte este painel ao CRUD de WikiPage/MediaAsset para publicar conteúdos.
        </p>
      </section>
    </main>
  );
}
