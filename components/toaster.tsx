"use client";

import { useState } from "react";

export function Toaster() {
  const [message] = useState<string | null>(null);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-lg">
      {message}
    </div>
  );
}
