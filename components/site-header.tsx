import Link from "next/link";

const navItems = [
  { href: "/demo", label: "Demo" },
  { href: "/campanhas", label: "Campanhas" },
  { href: "/personagens", label: "Personagens" },
  { href: "/sessoes", label: "Sessões" },
  { href: "/regras", label: "Regras" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rf-brand text-lg font-semibold">
            RF
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-100">Runas e Ferro Studio</p>
            <p className="text-xs text-slate-400">SaaS de mesa virtual</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/auth/entrar"
            className="rounded-full bg-rf-brand px-4 py-2 text-xs font-semibold text-white"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
