"use client";

import { useMemo, useState } from "react";

const initialTurnOrder = [
  { id: "sola", name: "Sola de Ferro", hp: 18, foc: 3, conditions: [] as string[] },
  { id: "kesh", name: "Kesh Umbromar", hp: 14, foc: 2, conditions: ["Sangrando"] },
  { id: "rinna", name: "Rinna Braseira", hp: 12, foc: 4, conditions: [] }
];

const diceOptions = [4, 6, 8, 10, 12, 20];

export default function RoomPage() {
  const [turnIndex, setTurnIndex] = useState(0);
  const [log, setLog] = useState<string[]>([
    "20:10 Mestre abriu a sessão.",
    "20:12 Rinna Braseira rolou 1d20+4 = 17 (sucesso)."
  ]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [voiceRate, setVoiceRate] = useState(1);

  const active = useMemo(() => initialTurnOrder[turnIndex], [turnIndex]);

  function nextTurn() {
    setTurnIndex((prev) => (prev + 1) % initialTurnOrder.length);
    setLog((prev) => [
      ...prev,
      `Turno passou para ${initialTurnOrder[(turnIndex + 1) % initialTurnOrder.length].name}.`
    ]);
  }

  function rollDice(sides: number) {
    const result = Math.floor(Math.random() * sides) + 1;
    setLog((prev) => [
      ...prev,
      `Rolagem: 1d${sides} = ${result} (modo rápido).`
    ]);
  }

  function playSummary() {
    if (!voiceEnabled || typeof window === "undefined") return;
    const utterance = new SpeechSynthesisUtterance(
      "Resumo narrado: O grupo investigou a torre, enfrentou um Cavaleiro Oco e selou o sino antigo."
    );
    utterance.rate = voiceRate;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Sala em tempo real</h1>
        <p className="text-slate-300">
          Chat, logs, rolagens e turn tracker com IA copiloto. Modo voz opcional com STT/TTS.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="panel p-6">
          <h2 className="text-lg font-semibold">Turnos e combate</h2>
          <p className="mt-1 text-sm text-slate-400">Turno ativo: {active.name}</p>

          <div className="mt-4 grid gap-3">
            {initialTurnOrder.map((actor, index) => (
              <div
                key={actor.id}
                className={`rounded-xl border px-4 py-3 ${
                  index === turnIndex
                    ? "border-rf-gold bg-slate-900"
                    : "border-slate-800 bg-slate-950"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{actor.name}</span>
                  <span className="text-xs text-slate-400">PV {actor.hp}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="badge">FOC {actor.foc}</span>
                  {actor.conditions.map((condition) => (
                    <span key={condition} className="badge">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              className="rounded-full bg-rf-brand px-4 py-2 text-sm font-semibold"
              onClick={nextTurn}
            >
              Próximo turno
            </button>
            <button className="rounded-full border border-slate-700 px-4 py-2 text-sm">
              Aplicar dano/cura
            </button>
            <button className="rounded-full border border-slate-700 px-4 py-2 text-sm">
              Adicionar condição
            </button>
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="text-lg font-semibold">Rolagens rápidas</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {diceOptions.map((die) => (
              <button
                key={die}
                onClick={() => rollDice(die)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              >
                d{die}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-200">Voz (opcional)</h3>
            <div className="mt-3 space-y-3 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={voiceEnabled}
                  onChange={(event) => setVoiceEnabled(event.target.checked)}
                />
                Ativar TTS e STT (quando disponível)
              </label>
              <label className="flex items-center gap-2">
                Velocidade
                <input
                  type="range"
                  min={0.8}
                  max={1.4}
                  step={0.1}
                  value={voiceRate}
                  onChange={(event) => setVoiceRate(Number(event.target.value))}
                />
              </label>
              <button
                className="rounded-full border border-slate-700 px-4 py-2 text-sm"
                onClick={playSummary}
              >
                Reproduzir resumo narrado
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="panel p-6">
        <h2 className="text-lg font-semibold">Logs persistentes</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          {log.map((entry, index) => (
            <li key={`${entry}-${index}`}>{entry}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
