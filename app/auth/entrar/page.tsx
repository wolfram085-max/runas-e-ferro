export default function SignInPage() {
  return (
    <main className="page-shell max-w-md justify-center">
      <h1 className="text-3xl font-semibold">Entrar</h1>
      <p className="text-sm text-slate-300">
        Autenticação por e-mail com link mágico. Configure as variáveis de ambiente de SMTP.
      </p>
      <div className="panel p-6">
        <label className="text-sm text-slate-300">Email</label>
        <input
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="voce@exemplo.com"
        />
        <button className="mt-4 w-full rounded-full bg-rf-brand px-4 py-2 text-sm font-semibold">
          Enviar link
        </button>
      </div>
    </main>
  );
}
