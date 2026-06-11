"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase";
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
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
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
  const [accessToken, setAccessToken] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsCheckingSession(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setAccessToken(data.session?.access_token ?? "");
      setAdminEmail(data.session?.user.email ?? "");
      setIsCheckingSession(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token ?? "");
      setAdminEmail(session?.user.email ?? "");
      setIsCheckingSession(false);
    });

    return () => data.subscription.unsubscribe();
  }, [supabase]);

  if (isCheckingSession) {
    return <AdminStatusCard title="Checking admin session..." text="Confirming your secure Supabase login." />;
  }

  if (!supabase) {
    return <AdminStatusCard title="Supabase Auth is not configured" text="Add the Supabase URL and anon key in Vercel before using the admin dashboard." />;
  }

  if (!accessToken) {
    return <AdminLogin supabase={supabase} />;
  }

  return (
    <section className="container-page grid gap-6">
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
            <div>
              <p className="text-sm font-black text-white">Authenticated administrator</p>
              <p className="text-xs text-slate-400">{adminEmail}</p>
            </div>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </CardContent>
      </Card>
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
        accessToken={accessToken}
        onRowsChange={(rows) => setRowsByResource((current) => ({ ...current, [resource]: rows }))}
      />
    </section>
  );
}

function AdminLogin({ supabase }: { supabase: NonNullable<ReturnType<typeof createSupabaseBrowserClient>> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSigningIn(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsSigningIn(false);
    if (error) setMessage(error.message);
  }

  return (
    <section className="container-page max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LockKeyhole className="h-5 w-5 text-sky-300" />
            Admin Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={signIn} className="grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-slate-200">
              Admin email
              <Input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-200">
              Password
              <Input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>
            <Button type="submit" disabled={isSigningIn}>
              <LogIn className="h-4 w-4" />
              {isSigningIn ? "Signing in..." : "Sign in"}
            </Button>
            {message ? <p className="rounded-md border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100">{message}</p> : null}
            <p className="text-sm leading-6 text-slate-400">Only accounts listed in the server-side ADMIN_EMAILS setting can publish changes.</p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

function AdminStatusCard({ title, text }: { title: string; text: string }) {
  return (
    <section className="container-page max-w-lg">
      <Card>
        <CardContent className="p-6 text-center">
          <LockKeyhole className="mx-auto h-6 w-6 text-sky-300" />
          <p className="mt-3 font-black text-white">{title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
        </CardContent>
      </Card>
    </section>
  );
}

function Manager({ resource, rows, accessToken, onRowsChange }: { resource: Resource; rows: AdminRecord[]; accessToken: string; onRowsChange: (rows: AdminRecord[]) => void }) {
  const router = useRouter();
  const fields = fieldGroups[resource];
  const emptyDraft = useMemo(() => Object.fromEntries(fields.map((field) => [field.name, ""])), [fields]);
  const quality = useMemo(() => getQualitySummary(resource, rows), [resource, rows]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<AdminRecord>(emptyDraft);
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

    const payload = { ...draft, id: editingId ?? draft.id };
    const response = await fetch(`/api/admin/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
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

    const response = await fetch(`/api/admin/${resource}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
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
          <QualitySummary summary={quality} />
          {rows.map((row) => (
            <RecordCard key={row.id} resource={resource} row={row} isSaving={isSaving} onEdit={edit} onDelete={remove} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function QualitySummary({ summary }: { summary: QualitySummaryResult }) {
  return (
    <div className="grid gap-3 rounded-md border border-sky-500/20 bg-slate-950/70 p-4 md:grid-cols-[180px_1fr]">
      <div>
        <p className="text-sm text-slate-400">Content Quality</p>
        <p className="mt-2 text-4xl font-black text-sky-200">{summary.score}%</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{summary.readyCount} ready / {summary.total} total</p>
      </div>
      <div className="grid gap-2">
        <p className="font-bold text-white">{summary.issueCount === 0 ? "This section looks ready." : `${summary.issueCount} content gaps found.`}</p>
        <ul className="grid gap-1 text-sm leading-6 text-slate-400 md:grid-cols-2">
          {summary.topIssues.map((issue) => (
            <li key={issue}>{issue}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RecordCard({
  resource,
  row,
  isSaving,
  onEdit,
  onDelete
}: {
  resource: Resource;
  row: AdminRecord;
  isSaving: boolean;
  onEdit: (row: AdminRecord) => void;
  onDelete: (row: AdminRecord) => void;
}) {
  const issues = getQualityIssues(resource, row);

  return (
            <div key={row.id} className="grid gap-3 rounded-md border bg-slate-950/55 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white">{row.title || row.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{summaryForResource(resource, row)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{resourceLabels[resource]}</Badge>
                  <Badge>{issues.length === 0 ? "Ready" : "Needs Work"}</Badge>
                </div>
              </div>
              <p className="line-clamp-2 text-sm leading-6 text-slate-400">{row.description || row.excerpt || row.notes || row.content}</p>
              {issues.length > 0 ? (
                <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Improve before publishing</p>
                  <ul className="mt-2 grid gap-1 text-sm leading-6 text-amber-50/80 md:grid-cols-2">
                    {issues.map((issue) => (
                      <li key={issue}>{issue}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(row)}>
                  Edit
                </Button>
                <Button size="sm" variant="secondary" disabled={isSaving} onClick={() => onDelete(row)}>
                  Delete
                </Button>
              </div>
            </div>
  );
}

type QualitySummaryResult = {
  total: number;
  readyCount: number;
  issueCount: number;
  score: number;
  topIssues: string[];
};

function getQualitySummary(resource: Resource, rows: AdminRecord[]): QualitySummaryResult {
  const rowIssues = rows.map((row) => getQualityIssues(resource, row));
  const issueCount = rowIssues.reduce((sum, issues) => sum + issues.length, 0);
  const readyCount = rowIssues.filter((issues) => issues.length === 0).length;
  const possibleIssues = rows.length * requiredChecksCount(resource);
  const score = possibleIssues === 0 ? 100 : Math.max(0, Math.round(((possibleIssues - issueCount) / possibleIssues) * 100));
  const topIssues = Array.from(new Set(rowIssues.flat())).slice(0, 6);

  return {
    total: rows.length,
    readyCount,
    issueCount,
    score,
    topIssues: topIssues.length ? topIssues : ["No major content gaps found."]
  };
}

function getQualityIssues(resource: Resource, row: AdminRecord) {
  if (resource === "beyblades") {
    return [
      !row.product_code ? "Add model number." : "",
      !hasLength(row.description, 120) ? "Expand description to at least 120 characters." : "",
      !hasList(row.strengths, 2) ? "Add at least 2 strengths." : "",
      !hasList(row.weaknesses, 2) ? "Add at least 2 weaknesses." : "",
      !row.image_url || row.image_url.includes("placeholder") ? "Add a real image URL." : "",
      !hasLength(row.anime_info, 60) ? "Add anime or lore info." : ""
    ].filter(Boolean);
  }

  if (resource === "parts") {
    return [
      !row.category ? "Choose part category." : "",
      !hasLength(row.description, 90) ? "Expand description to at least 90 characters." : "",
      !hasList(row.advantages, 2) ? "Add at least 2 advantages." : "",
      !hasList(row.disadvantages, 1) ? "Add at least 1 disadvantage." : "",
      !hasList(row.recommended_uses, 1) ? "Add recommended uses." : "",
      !hasScores(row) ? "Check all battle scores." : ""
    ].filter(Boolean);
  }

  if (resource === "guides") {
    return [
      !row.category ? "Add guide category." : "",
      !hasLength(row.excerpt, 80) ? "Expand excerpt to at least 80 characters." : "",
      !hasLength(row.content, 600) ? "Write at least 600 characters of original guide content." : "",
      !row.published_at ? "Add published date." : ""
    ].filter(Boolean);
  }

  return [
    !row.tier ? "Choose tier." : "",
    !row.format ? "Add format." : "",
    !hasLength(row.notes, 80) ? "Expand tier notes to at least 80 characters." : ""
  ].filter(Boolean);
}

function requiredChecksCount(resource: Resource) {
  const checks: Record<Resource, number> = {
    beyblades: 6,
    parts: 6,
    guides: 4,
    tier_lists: 3
  };

  return checks[resource];
}

function hasLength(value: string, min: number) {
  return value.trim().length >= min;
}

function hasList(value: string, min: number) {
  return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean).length >= min;
}

function hasScores(row: AdminRecord) {
  return ["attack", "defense", "stamina", "balance"].every((key) => {
    const value = Number(row[key]);
    return Number.isFinite(value) && value >= 1 && value <= 10;
  });
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
