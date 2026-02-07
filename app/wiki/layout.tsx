import type { ReactNode } from "react";
import { WikiHeader } from "@/components/wiki-header";

export default function WikiLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <WikiHeader />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">{children}</main>
    </div>
  );
}
