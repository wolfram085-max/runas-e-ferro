import Link from "next/link";

const categories = [
  { href: "/wiki/races", label: "Raças" },
  { href: "/wiki/classes", label: "Classes" },
  { href: "/wiki/runes", label: "Runas" },
  { href: "/wiki/items", label: "Itens" },
  { href: "/wiki/bestiary", label: "Bestiário" },
  { href: "/wiki/setting", label: "Cenário" },
  { href: "/wiki/factions", label: "Facções" }
];

export function WikiHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/wiki" className="text-lg font-semibold text-slate-900">
            Wiki Runas e Ferro
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-600">
            Voltar ao app
          </Link>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm text-slate-600">
          {categories.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
