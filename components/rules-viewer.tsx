"use client";

import { useMemo, useState } from "react";

interface RulesViewerProps {
  content: string;
}

interface Section {
  id: string;
  title: string;
  body: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function RulesViewer({ content }: RulesViewerProps) {
  const [query, setQuery] = useState("");

  const sections = useMemo<Section[]>(() => {
    const rawSections = content.split("\n## ");
    return rawSections.slice(1).map((section) => {
      const [titleLine, ...rest] = section.split("\n");
      const title = titleLine.trim();
      return {
        id: slugify(title),
        title,
        body: rest.join("\n").trim()
      };
    });
  }, [content]);

  const filtered = useMemo(() => {
    if (!query.trim()) return sections;
    const lower = query.toLowerCase();
    return sections.filter(
      (section) =>
        section.title.toLowerCase().includes(lower) ||
        section.body.toLowerCase().includes(lower)
    );
  }, [query, sections]);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
      <aside className="panel h-fit p-4">
        <p className="text-xs font-semibold uppercase text-slate-400">Sumário</p>
        <div className="mt-4">
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Buscar no livro..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <nav className="mt-4 max-h-[60vh] space-y-2 overflow-auto text-sm text-slate-300">
          {filtered.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="block hover:text-white">
              {section.title}
            </a>
          ))}
        </nav>
      </aside>

      <div className="panel p-6">
        {filtered.map((section) => (
          <section key={section.id} id={section.id} className="mb-8">
            <h2 className="text-xl font-semibold text-slate-100">{section.title}</h2>
            <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-200">
              {section.body}
            </pre>
          </section>
        ))}
      </div>
    </div>
  );
}
