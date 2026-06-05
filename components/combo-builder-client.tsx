"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Part } from "@/types/database";

const scoreKeys = ["attack", "defense", "stamina", "balance"] as const;
type ScoreKey = (typeof scoreKeys)[number];

export function ComboBuilderClient({ parts }: { parts: Part[] }) {
  const blades = parts.filter((part) => part.category === "Blade");
  const ratchets = parts.filter((part) => part.category === "Ratchet");
  const bits = parts.filter((part) => part.category === "Bit");
  const [bladeId, setBladeId] = useState(blades[0]?.id ?? "");
  const [ratchetId, setRatchetId] = useState(ratchets[0]?.id ?? "");
  const [bitId, setBitId] = useState(bits[0]?.id ?? "");

  const result = useMemo(() => {
    const blade = parts.find((part) => part.id === bladeId);
    const ratchet = parts.find((part) => part.id === ratchetId);
    const bit = parts.find((part) => part.id === bitId);
    const selected = [blade, ratchet, bit].filter((part): part is Part => Boolean(part));

    if (selected.length === 0) {
      return {
        attack: 0,
        defense: 0,
        stamina: 0,
        balance: 0,
        overall: 0,
        style: "Select parts",
        playStyle: "Choose a Blade, Ratchet, and Bit to start the analysis.",
        comboName: "Incomplete combo",
        selected,
        strengths: ["Add three parts to generate matchup notes."],
        risks: ["Scores are unavailable until the combo is complete."],
        testingNotes: ["Start with one Blade, one Ratchet, and one Bit."],
      };
    }

    const average = (key: ScoreKey) => Math.round(selected.reduce((sum, part) => sum + part[key], 0) / selected.length);
    const attack = average("attack");
    const defense = average("defense");
    const stamina = average("stamina");
    const balance = average("balance");
    const overall = Math.round(((attack * 1.1 + defense + stamina + balance) / 4.1) * 10);
    const rankedScores = Object.entries({ Attack: attack, Defense: defense, Stamina: stamina, Balance: balance }).sort((a, b) => b[1] - a[1]);
    const top = rankedScores[0][0];
    const lowest = rankedScores[rankedScores.length - 1][0];

    return {
      attack,
      defense,
      stamina,
      balance,
      overall,
      style: `${top} focused`,
      playStyle: getPlayStyle(top),
      comboName: [blade?.name, ratchet?.name, bit?.name].filter(Boolean).join(" "),
      selected,
      strengths: getStrengths(top, attack, defense, stamina, balance),
      risks: getRisks(lowest),
      testingNotes: getTestingNotes(top, lowest),
    };
  }, [bladeId, bitId, parts, ratchetId]);

  return (
    <section className="container-page grid gap-8 lg:grid-cols-[420px_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Parts Selection</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <PartSelect label="Blade" value={bladeId} onChange={setBladeId} options={blades} />
          <PartSelect label="Ratchet" value={ratchetId} onChange={setRatchetId} options={ratchets} />
          <PartSelect label="Bit" value={bitId} onChange={setBitId} options={bits} />
          <div className="rounded-md border border-sky-500/20 bg-slate-950/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Current Build</p>
            <h2 className="mt-2 text-2xl font-black text-white">{result.comboName}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Compare this setup against your local stadium, launch style, and the current tournament meta before locking it in.
            </p>
          </div>
          <button
            type="button"
            className="h-11 rounded-md border border-sky-400/40 bg-sky-400/10 px-4 text-sm font-bold text-sky-100 transition hover:bg-sky-400/20"
          >
            Save this combo idea
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Combo Analysis</CardTitle>
            <Badge>{result.style}</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Score label="Attack Score" value={result.attack} />
          <Score label="Defense Score" value={result.defense} />
          <Score label="Stamina Score" value={result.stamina} />
          <Score label="Balance Score" value={result.balance} />
          <div className="rounded-md border border-sky-500/20 bg-slate-950/60 p-5 md:col-span-2">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Overall Rating</p>
                <p className="mt-2 text-5xl font-black text-sky-200">{result.overall}</p>
              </div>
              <div className="max-w-md">
                <p className="text-sm text-slate-400">Recommended Play Style</p>
                <p className="mt-2 text-lg font-bold text-white">{result.playStyle}</p>
              </div>
            </div>
          </div>

          <AnalysisList title="Main Strengths" items={result.strengths} />
          <AnalysisList title="Possible Risks" items={result.risks} />
          <div className="rounded-md border bg-slate-950/60 p-5 md:col-span-2">
            <p className="text-sm font-bold text-slate-200">Testing Notes</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-400 md:grid-cols-3">
              {result.testingNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-3 md:col-span-2 md:grid-cols-3">
            {result.selected.map((part) => (
              <div key={part.id} className="rounded-md border border-slate-800 bg-slate-950/40 p-4">
                <Badge>{part.category}</Badge>
                <p className="mt-3 font-bold text-white">{part.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{part.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function PartSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Part[] }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-200">
      {label}
      <select className="h-10 rounded-md border bg-slate-950 px-3 text-sm" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((part) => <option key={part.id} value={part.id}>{part.name}</option>)}
      </select>
    </label>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border bg-slate-950/60 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="font-bold text-sky-200">{value}/10</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-800">
        <div className="h-2 rounded-full bg-sky-400" style={{ width: `${value * 10}%` }} />
      </div>
    </div>
  );
}

function AnalysisList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border bg-slate-950/60 p-5">
      <p className="text-sm font-bold text-slate-200">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-400">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function getPlayStyle(top: string) {
  const styles: Record<string, string> = {
    Attack: "Aggressive KO pressure with early contact and angled launches.",
    Defense: "Counter-focused defense that absorbs hits and punishes overextension.",
    Stamina: "Spin-finish control built for long rounds and clean movement.",
    Balance: "Flexible matchup coverage with room to adjust launch power.",
  };

  return styles[top] ?? "Balanced testing build for general matchups.";
}

function getStrengths(top: string, attack: number, defense: number, stamina: number, balance: number) {
  const shared = [`Best current stat: ${top}.`, `Score spread: ATK ${attack}, DEF ${defense}, STA ${stamina}, BAL ${balance}.`];
  const notes: Record<string, string> = {
    Attack: "Strong at creating early pressure and forcing unstable opponents out of position.",
    Defense: "Good into contact-heavy opponents that rely on quick knockouts.",
    Stamina: "Built to survive longer exchanges and win by spin advantage.",
    Balance: "Useful when you need one combo that can adapt across several matchups.",
  };

  return [notes[top] ?? "Useful as a general test combo.", ...shared];
}

function getRisks(lowest: string) {
  const risks: Record<string, string[]> = {
    Attack: ["May struggle to force quick knockouts if the launch is too soft.", "Needs testing against heavier defense builds."],
    Defense: ["Can be vulnerable to repeated high-speed contact.", "Watch for stadium exits when facing attack specialists."],
    Stamina: ["May lose long rounds if movement becomes too aggressive.", "Test against smoother Bits before tournament use."],
    Balance: ["May not dominate a single matchup category.", "Tune launch angle carefully to avoid average performance."],
  };

  return risks[lowest] ?? ["Test against several archetypes before using it in serious play."];
}

function getTestingNotes(top: string, lowest: string) {
  return [
    `Run at least 10 rounds against an ${top.toLowerCase()} benchmark combo.`,
    `Track losses caused by ${lowest.toLowerCase()} weakness.`,
    "Adjust launch angle before changing parts.",
  ];
}
