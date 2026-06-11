import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

type Resource = "beyblades" | "parts" | "guides" | "tier_lists";

const resourceConfig: Record<Resource, { table: Resource; slugField?: "slug"; titleField: "name" | "title" }> = {
  beyblades: { table: "beyblades", slugField: "slug", titleField: "name" },
  parts: { table: "parts", slugField: "slug", titleField: "name" },
  guides: { table: "guides", slugField: "slug", titleField: "title" },
  tier_lists: { table: "tier_lists", titleField: "name" }
};

export async function POST(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const auth = await authorize(request);
  if (auth) return auth;

  const resource = getResource((await params).resource);
  if (!resource) return NextResponse.json({ error: "Unknown admin resource." }, { status: 404 });

  const client = adminClient();
  if (!client) return NextResponse.json({ error: "Supabase admin environment variables are missing." }, { status: 503 });

  const body = await request.json();
  const row = normalizePayload(resource, body);
  const config = resourceConfig[resource];

  const query = client.from(config.table as string).upsert(row, config.slugField ? { onConflict: config.slugField } : undefined).select("*").single();
  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const auth = await authorize(request);
  if (auth) return auth;

  const resource = getResource((await params).resource);
  if (!resource) return NextResponse.json({ error: "Unknown admin resource." }, { status: 404 });

  const client = adminClient();
  if (!client) return NextResponse.json({ error: "Supabase admin environment variables are missing." }, { status: 503 });

  const body = await request.json();
  const config = resourceConfig[resource];
  const column = body.id && isUuid(body.id) ? "id" : config.slugField ?? "name";
  const value = column === "name" ? body.name : body.id;
  const { error } = await client.from(config.table).delete().eq(column, value);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

async function authorize(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const allowedEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : "";

  if (!url || !anonKey || allowedEmails.length === 0) {
    return NextResponse.json({ error: "Supabase Auth or ADMIN_EMAILS is not configured." }, { status: 503 });
  }

  if (!token) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }

  const authClient = createClient(url, anonKey, { auth: { persistSession: false } });
  const { data, error } = await authClient.auth.getUser(token);
  const email = data.user?.email?.toLowerCase();

  if (error || !email || !allowedEmails.includes(email)) {
    return NextResponse.json({ error: "This account is not authorized for BEYBUKU admin access." }, { status: 403 });
  }

  return null;
}

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function getResource(resource: string): Resource | null {
  return resource in resourceConfig ? (resource as Resource) : null;
}

function normalizePayload(resource: Resource, body: Record<string, unknown>): Record<string, unknown> {
  if (resource === "beyblades") {
    const name = stringValue(body.name);
    return {
      id: uuidOrUndefined(body.id),
      slug: stringValue(body.slug) || slugify(name),
      name,
      product_code: stringValue(body.product_code),
      series: stringValue(body.series),
      type: allowedValue(body.type, ["Attack", "Defense", "Stamina", "Balance"], "Balance"),
      weight: numberValue(body.weight),
      release_date: stringValue(body.release_date) || null,
      image_url: stringValue(body.image_url) || "/placeholder-bey.svg",
      description: stringValue(body.description),
      strengths: arrayValue(body.strengths),
      weaknesses: arrayValue(body.weaknesses),
      recommended_combos: arrayValue(body.recommended_combos),
      anime_info: stringValue(body.anime_info)
    };
  }

  if (resource === "parts") {
    const name = stringValue(body.name);
    return {
      id: uuidOrUndefined(body.id),
      slug: stringValue(body.slug) || slugify(name),
      name,
      category: allowedValue(body.category, ["Blade", "Ratchet", "Bit"], "Blade"),
      weight: numberValue(body.weight),
      description: stringValue(body.description),
      advantages: arrayValue(body.advantages),
      disadvantages: arrayValue(body.disadvantages),
      recommended_uses: arrayValue(body.recommended_uses),
      attack: scoreValue(body.attack),
      defense: scoreValue(body.defense),
      stamina: scoreValue(body.stamina),
      balance: scoreValue(body.balance)
    };
  }

  if (resource === "guides") {
    const title = stringValue(body.title);
    return {
      id: uuidOrUndefined(body.id),
      slug: stringValue(body.slug) || slugify(title),
      title,
      category: stringValue(body.category),
      excerpt: stringValue(body.excerpt),
      content: stringValue(body.content),
      published_at: stringValue(body.published_at) || new Date().toISOString().slice(0, 10)
    };
  }

  return {
    id: uuidOrUndefined(body.id),
    name: stringValue(body.name),
    tier: allowedValue(body.tier, ["S", "A", "B", "C"], "B"),
    format: stringValue(body.format) || "Beyblade X",
    notes: stringValue(body.notes)
  };
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function scoreValue(value: unknown) {
  return Math.min(10, Math.max(1, Math.round(numberValue(value) || 5)));
}

function arrayValue(value: unknown) {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  if (typeof value !== "string") return [];
  return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
}

function allowedValue<T extends string>(value: unknown, allowed: T[], fallback: T) {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

function uuidOrUndefined(value: unknown) {
  return typeof value === "string" && isUuid(value) ? value : undefined;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
