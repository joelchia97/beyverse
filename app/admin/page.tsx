"use client";

import { FormEvent, useMemo, useState } from "react";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { beyblades, guides, parts, tierList } from "@/lib/data";

type Tab = "Beyblades" | "Parts" | "Guides" | "Tier List";
type AdminRow = { id: string; name: string; category: string; description: string };

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<Tab>("Beyblades");
  const initialRows = useMemo<Record<Tab, AdminRow[]>>(
    () => ({
      Beyblades: beyblades.map((item) => ({ id: item.slug, name: item.name, category: `${item.series} / ${item.type}`, description: item.description })),
      Parts: parts.map((item) => ({ id: item.slug, name: item.name, category: `${item.category} / ${item.weight}g`, description: item.description })),
      Guides: guides.map((item) => ({ id: item.slug, name: item.title, category: item.category, description: item.excerpt })),
      "Tier List": tierList.map((item) => ({ id: item.id, name: item.name, category: `${item.tier} / ${item.format}`, description: item.notes }))
    }),
    []
  );
  const [rowsByTab, setRowsByTab] = useState(initialRows);

  return (
    <main>
      <PageHeading title="Admin Dashboard" description="Manage Beyblade entries, parts, guides, and tier list records. Connect Supabase auth before production publishing." />
      <section className="container-page grid gap-6">
        <div className="flex flex-wrap gap-2">
          {(["Beyblades", "Parts", "Guides", "Tier List"] as Tab[]).map((item) => (
            <Button key={item} variant={tab === item ? "default" : "outline"} onClick={() => setTab(item)}>{item}</Button>
          ))}
        </div>
        <Manager
          title={tab}
          rows={rowsByTab[tab]}
          onRowsChange={(rows) => setRowsByTab((current) => ({ ...current, [tab]: rows }))}
        />
      </section>
    </main>
  );
}

function Manager({ title, rows, onRowsChange }: { title: string; rows: AdminRow[]; onRowsChange: (rows: AdminRow[]) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  function clear() {
    setEditingId(null);
    setName("");
    setCategory("");
    setDescription("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = editingId || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID();
    const nextRow = { id, name, category, description };
    onRowsChange(editingId ? rows.map((row) => (row.id === editingId ? nextRow : row)) : [nextRow, ...rows]);
    clear();
  }

  function edit(row: AdminRow) {
    setEditingId(row.id);
    setName(row.name);
    setCategory(row.category);
    setDescription(row.description);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <Card>
        <CardHeader><CardTitle>Add or Edit {title}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-3">
          <Input placeholder="Name or title" value={name} onChange={(event) => setName(event.target.value)} required />
          <Input placeholder="Category, type, or format" value={category} onChange={(event) => setCategory(event.target.value)} />
          <Textarea placeholder="Description, notes, strengths, weaknesses, or content" value={description} onChange={(event) => setDescription(event.target.value)} />
          <div className="flex gap-2">
            <Button type="submit">{editingId ? "Update" : "Save"}</Button>
            <Button type="button" variant="outline" onClick={clear}>Clear</Button>
          </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Existing {title}</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          {rows.map((row) => (
            <div key={row.id} className="flex flex-col gap-3 rounded-md border bg-slate-950/55 p-3 md:flex-row md:items-center md:justify-between">
              <span className="text-sm text-slate-200">{row.name} / {row.category}</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => edit(row)}>Edit</Button>
                <Button size="sm" variant="secondary" onClick={() => onRowsChange(rows.filter((item) => item.id !== row.id))}>Delete</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
