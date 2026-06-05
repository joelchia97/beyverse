"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Beyblade, Guide, Part, TierListItem } from "@/types/database";

type Resource = "beyblades" | "parts" | "guides" | "tier_lists";
type AdminRecord = Record<string, string>;
type AdminField = { name: string; label: string; type?: "textarea" | "date" | "number"; options?: string[] };

const resourceLabels: Record<Resource, string> = {
  beyblades: "Beyblades",
  parts: "Parts",
  guides: "Guides",
  tier_lists: "Tier List"
};

const fieldGroups: Record<Resource, AdminField[]> = {
  beyblades: [
    { name: "name", label: "Name" },
    { name: "product_code", label: "Model Number" },
    { name: "series", label: "Series" },
    { name: "type", label: "Type", options: ["Attack", "Defense", "Stamina", "Balance"] },
    { name: "weight", label: "Weight", type: "number" },
    { name: "release_date", label: "Release Date", type: "date" },
    { name: "image_url", label: "Image URL" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "strengths", label: "Strengths", type: "textarea" },
    { name: "weaknesses", label: "Weaknesses", type: "textarea" },
    { name: "recommended_combos", label: "Recommended Combos", type: "textarea" },
    { name: "anime_info", label: "Anime Info", type: "textarea" }
  ],
  parts: [
    { name: "name", label: "Name" },
    { name: "category", label: "Category", options: ["Blade", "Ratchet", "Bit"] },
    { name: "weight", label: "Weight", type: "number" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "advantages", label: "Advantages", type: "textarea" },
    { name: "disadvantages", label: "Disadvantages", type: "textarea" },
    { name: "recommended_uses", label: "Recommended Uses", type: "textarea" },
    { name: "attack", label: "Attack Score", type: "number" },
    { name: "defense", label: "Defense Score", type: "number" },
    { name: "stamina", label: "Stamina Score", type: "number" },
    { name: "balance", label: "Balance Score", type: "number" }
  ],
  guides: [
    { name: "title", label: "Title" },
    { name: "category", label: "Category" },
    { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "content", label: "Content", type: "textarea" },
    { name: "published_at", label: "Published Date", type: "date" }
  ],
  tier_lists: [
    { name: "name", label: "Name" },
    { name: "tier", label: "Tier", options: ["S", "A", "B", "C"] },
    { name: "format", label: "Format" },
    { name: "notes", label: "Notes", type: "textarea" }
  ]
};

export function AdminDashboardClient({
  beyblades,
  parts,
  guides,
  tierList
}: {
  beyblades: Beyblade[];
  parts: Part[];
  guides: Guide[];
  tierList: TierListItem[];
}) {
  const initialRows = useMemo(
    () => ({
      beyblades: beyblades.map(beybladeToRecord),
      parts: parts.map(partToRecord),
      guides: guides.map(guideToRecord),
      tier_lists: tierList.map(tierToRecord)
    }),
    [beyblades, guides, parts, tierList]
  );
  const [resource, setResource] = useState<Resource>("beyblades");
  const [rowsByResource, setRowsByResource] = useState(initialRows);

  return (
    <section className="container-page grid gap-6">
      <Card>
        <CardContent className="flex flex-wrap gap-2 p-4">
          {(Object.keys(resourceLabels) as Resource[]).map((item) => (
            <Button key={item} variant={resource === item ? "default" : "outline"} onClick={() => setResource(item)}>
              {resourceLabels[item]}
            </Button>
          ))}
        </CardContent>
      </Card>
      <Manager
        resource={resource}
        rows={rowsByResource[resource]}
        onRowsChange={(rows) => setRowsByResource((current) => ({ ...current, [resource]: rows }))}
      />
    </section>
  );
}

function Manager({ resource, rows, onRowsChange }: { resource: Resource; rows: AdminRecord[]; onRowsChange: (rows: AdminRecord[]) => void }) {
  const router = useRouter();
  const fields = fieldGroups[resource];
  const emptyDraft = useMemo(() => Object.fromEntries(fields.map((field) => [field.name, ""])), [fields]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<AdminRecord>(emptyDraft);
  const [adminKey, setAdminKey] = useState(() => (typeof window === "undefined" ? "" : sessionStorage.getItem("beybuku_admin_key") ?? ""));
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function updateDraft(name: string, value: string) {
    setDraft((current) => ({ ...current, [name]: value }));
  }

  function clear() {
    setEditingId(null);
    setDraft(emptyDraft);
  }

  function edit(row: AdminRecord) {
    setEditingId(row.id);
    setDraft({ ...emptyDraft, ...row });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    sessionStorage.setItem("beybuku_admin_key", adminKey);

    const payload = { ...draft, id: editingId ?? draft.id };
    const response = await fetch(`/api/admin/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    setIsSaving(false);

    if (!response.ok) {
      setMessage(result.error ?? "Save failed.");
      return;
    }

    const saved = recordFromResource(resource, result.data);
    onRowsChange(editingId ? rows.map((row) => (row.id === editingId ? saved : row)) : [saved, ...rows]);
    setMessage("Saved to Supabase.");
    clear();
    router.refresh();
  }

  async function remove(row: AdminRecord) {
    const label = row.title || row.name || "this item";
    const confirmed = window.confirm(`Delete "${label}" from BEYBUKU? This cannot be undone.`);
    if (!confirmed) return;

    setIsSaving(true);
    setMessage("");
    sessionStorage.setItem("beybuku_admin_key", adminKey);

    const response = await fetch(`/api/admin/${resource}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify(row)
    });
    const result = await response.json();
    setIsSaving(false);

    if (!response.ok) {
      setMessage(result.error ?? "Delete failed.");
      return;
    }

    onRowsChange(rows.filter((item) => item.id !== row.id));
    setMessage("Deleted from Supabase.");
    router.refresh();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[460px_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Add or Edit {resourceLabels[resource]}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-3">
            <label className="grid gap-2 text-sm font-semibold text-slate-200">
              Admin Key
              <Input
                value={adminKey}
                onChange={(event) => setAdminKey(event.target.value)}
                placeholder="Enter your private admin key"
                type="password"
                required
              />
            </label>
            {fields.map((field) => (
              <Field key={field.name} field={field} value={draft[field.name] ?? ""} onChange={(value) => updateDraft(field.name, value)} />
            ))}
            {resource === "beyblades" && draft.image_url ? (
              <div className="overflow-hidden rounded-md border border-sky-500/20 bg-slate-950/70 p-3">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Image Preview</p>
                <img src={draft.image_url} alt={draft.name || "Beyblade preview"} className="max-h-52 w-full rounded object-contain" />
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : editingId ? "Update" : "Save"}
              </Button>
              <Button type="button" variant="outline" onClick={clear}>
                Clear
              </Button>
            </div>
            {message ? <p className="rounded-md border border-sky-500/30 bg-sky-500/10 p-3 text-sm text-sky-100">{message}</p> : null}
            <p className="text-sm leading-6 text-slate-400">
              Put one list item per line for strengths, weaknesses, advantages, disadvantages, and recommended uses.
            </p>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing {resourceLabels[resource]}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {rows.map((row) => (
            <div key={row.id} className="grid gap-3 rounded-md border bg-slate-950/55 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white">{row.title || row.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{summaryForResource(resource, row)}</p>
                </div>
                <Badge>{resourceLabels[resource]}</Badge>
              </div>
              <p className="line-clamp-2 text-sm leading-6 text-slate-400">{row.description || row.excerpt || row.notes || row.content}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => edit(row)}>
                  Edit
                </Button>
                <Button size="sm" variant="secondary" disabled={isSaving} onClick={() => remove(row)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  field,
  value,
  onChange
}: {
  field: AdminField;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-200">
      {field.label}
      {field.options ? (
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full rounded-md border bg-slate-950/60 px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
        >
          <option value="">Choose {field.label}</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <Textarea value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <Input value={value} onChange={(event) => onChange(event.target.value)} type={field.type ?? "text"} />
      )}
    </label>
  );
}

function beybladeToRecord(item: Beyblade): AdminRecord {
  return {
    ...stringRecord(item),
    strengths: item.strengths.join("\n"),
    weaknesses: item.weaknesses.join("\n"),
    recommended_combos: item.recommended_combos.join("\n")
  };
}

function partToRecord(item: Part): AdminRecord {
  return {
    ...stringRecord(item),
    advantages: item.advantages.join("\n"),
    disadvantages: item.disadvantages.join("\n"),
    recommended_uses: item.recommended_uses.join("\n")
  };
}

function guideToRecord(item: Guide): AdminRecord {
  return stringRecord(item);
}

function tierToRecord(item: TierListItem): AdminRecord {
  return stringRecord(item);
}

function recordFromResource(resource: Resource, item: Record<string, unknown>) {
  if (resource === "beyblades") return beybladeToRecord(item as Beyblade);
  if (resource === "parts") return partToRecord(item as Part);
  if (resource === "guides") return guideToRecord(item as Guide);
  return tierToRecord(item as TierListItem);
}

function stringRecord(item: Record<string, unknown>): AdminRecord {
  return Object.fromEntries(Object.entries(item).map(([key, value]) => [key, Array.isArray(value) ? value.join("\n") : value == null ? "" : String(value)]));
}

function summaryForResource(resource: Resource, row: AdminRecord) {
  if (resource === "beyblades") return `${row.product_code || "No model"} / ${row.series} / ${row.type}`;
  if (resource === "parts") return `${row.category} / ${row.weight}g / ATK ${row.attack} DEF ${row.defense} STA ${row.stamina} BAL ${row.balance}`;
  if (resource === "guides") return `${row.category} / ${row.published_at}`;
  return `${row.tier} Tier / ${row.format}`;
}
