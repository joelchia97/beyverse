import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin, createAdminClient } from "@/lib/admin-server";
import { beyblades, characters, combos, guides, parts, tierList } from "@/lib/data";

type SyncResult = Record<string, number>;
type SyncGroup = { table: string; rows: Record<string, unknown>[] };
type UpsertGroup = SyncGroup & { conflict: string };

export async function POST(request: NextRequest) {
  const auth = await authorizeAdmin(request);
  if (auth) return auth;

  const client = createAdminClient();
  if (!client) {
    return NextResponse.json({ error: "Supabase admin environment variables are missing." }, { status: 503 });
  }

  const result: SyncResult = {};

  const upsertGroups: UpsertGroup[] = [
    { table: "beyblades", conflict: "slug", rows: beyblades.map(({ id: _id, ...row }) => row) },
    { table: "parts", conflict: "slug", rows: parts.map(({ id: _id, ...row }) => row) },
    { table: "guides", conflict: "slug", rows: guides.map(({ id: _id, ...row }) => row) }
  ];

  for (const group of upsertGroups) {
    const { error } = await client.from(group.table).upsert(group.rows, { onConflict: group.conflict });
    if (error) return syncError(group.table, error.message);
    result[group.table] = group.rows.length;
  }

  const replaceGroups: SyncGroup[] = [
    { table: "combos", rows: combos.map(({ id: _id, ...row }) => row) },
    { table: "characters", rows: characters.map(({ id: _id, ...row }) => row) },
    { table: "tier_lists", rows: tierList.map(({ id: _id, ...row }) => row) }
  ];

  for (const group of replaceGroups) {
    const { error: deleteError } = await client.from(group.table).delete().not("id", "is", null);
    if (deleteError) return syncError(group.table, deleteError.message);

    const { error: insertError } = await client.from(group.table).insert(group.rows);
    if (insertError) return syncError(group.table, insertError.message);
    result[group.table] = group.rows.length;
  }

  return NextResponse.json({
    ok: true,
    counts: result,
    total: Object.values(result).reduce((sum, count) => sum + count, 0)
  });
}

function syncError(table: string, message: string) {
  return NextResponse.json({ error: `Could not sync ${table}: ${message}` }, { status: 400 });
}
