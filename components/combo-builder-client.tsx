"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Part } from "@/types/database";

export function ComboBuilderClient({ parts }: { parts: Part[] }) {
  const blades = parts.filter((part) => part.category === "Blade");
  const ratchets = parts.filter((part) => part.category === "Ratchet");
  const bits = parts.filter((part) => part.category === "Bit");
  const [bladeId, setBladeId] = useState(blades[0]?.id ?? "");
  const [ratchetId, setRatchetId] = useState(ratchets[0]?.id ?? "");
  const [bitId, setBitId] = useState(bits[0]?.id ?? "");

  const result = useMemo(() => {
    const selected = [parts.find((part) => part.id === bladeId), parts.find((part) => part.id === ratchetId), parts.find((part) => part.id === bitId)].filter(
      (part): part is Part => Boolean(part)
    );
    const average = (key: "attack" | "defense" | "stamina" | "balance") => Math.round(selected.reduce((sum, part) => sum + part[key], 0) / selected.length);
    const attack = average("attack");
    const defense = average("defense");
    const stamina = average("stamina");
    const balance = average("balance");
    const overall = Math.round(((attack * 1.1 + defense + stamina + balance) / 4.1) * 10);
    const top = Object.entries({ Attack: attack, Defense: defense, Stamina: stamina, Balance: balance }).sort((a, b) => b[1] - a[1])[0][0];
    return { attack, defense, stamina, balance, overall, style: `${top} focused` };
  }, [bladeId, bitId, parts, ratchetId]);

  return (
    <section className="container-page grid gap-8 lg:grid-cols-[420px_1fr]">
      <Card>
        <CardHeader><CardTitle>Parts Selection</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          <PartSelect label="Blade" value={bladeId} onChange={setBladeId} options={blades} />
          <PartSelect label="Ratchet" value={ratchetId} onChange={setRatchetId} options={ratchets} />
          <PartSelect label="Bit" value={bitId} onChange={setBitId} options={bits} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Combo Analysis</CardTitle>
            <Badge>{result.style}</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Score label="Attack Score" value={result.attack} />
          <Score label="Defense Score" value={result.defense} />
          <Score label="Stamina Score" value={result.stamina} />
          <Score label="Balance Score" value={result.balance} />
          <div className="rounded-md border bg-slate-950/60 p-5 md:col-span-2">
            <p className="text-sm text-slate-400">Overall Rating</p>
            <p className="mt-2 text-5xl font-black text-sky-200">{result.overall}</p>
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
