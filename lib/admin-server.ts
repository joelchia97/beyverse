import "server-only";

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function authorizeAdmin(request: NextRequest) {
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

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
