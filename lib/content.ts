import { createClient } from "@supabase/supabase-js";
import {
  beyblades as fallbackBeyblades,
  characters as fallbackCharacters,
  combos as fallbackCombos,
  guides as fallbackGuides,
  parts as fallbackParts,
  tierList as fallbackTierList
} from "@/lib/data";
import type { Beyblade, Character, Combo, Guide, Part, TierListItem } from "@/types/database";

export const revalidate = 300;

function supabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

function mergeByKey<T>(fallback: T[], remote: T[], key: keyof T) {
  const map = new Map<string, T>();
  fallback.forEach((item) => map.set(String(item[key]), item));
  remote.forEach((item) => map.set(String(item[key]), item));
  return Array.from(map.values());
}

async function fetchTable<T>(table: string, fallback: T[], orderColumn = "created_at") {
  const client = supabaseClient();
  if (!client) return fallback;

  const { data, error } = await client.from(table).select("*").order(orderColumn, { ascending: false });
  if (error || !data || data.length === 0) return fallback;
  return data as T[];
}

export async function getBeyblades() {
  const remote = await fetchTable<Beyblade>("beyblades", [], "release_date");
  return mergeBeyblades(fallbackBeyblades, normalizeBeyblades(remote));
}

export async function getBeybladeBySlug(slug: string) {
  return (await getBeyblades()).find((item) => item.slug === slug);
}

export async function getParts() {
  const remote = await fetchTable<Part>("parts", [], "created_at");
  return mergeByKey(fallbackParts, normalizeParts(remote), "slug");
}

export async function getPartBySlug(slug: string) {
  return (await getParts()).find((item) => item.slug === slug);
}

export async function getGuides() {
  const remote = await fetchTable<Guide>("guides", [], "published_at");
  return mergeGuides(fallbackGuides, remote);
}

export async function getGuideBySlug(slug: string) {
  return (await getGuides()).find((item) => item.slug === slug);
}

export async function getCombos() {
  const remote = await fetchTable<Combo>("combos", [], "created_at");
  return remote.length ? remote : fallbackCombos;
}

export async function getCharacters() {
  const remote = await fetchTable<Character>("characters", [], "created_at");
  return remote.length ? remote : fallbackCharacters;
}

export async function getTierList() {
  const remote = await fetchTable<TierListItem>("tier_lists", [], "created_at");
  return remote.length ? remote : fallbackTierList;
}

function normalizeBeyblades(items: Beyblade[]) {
  return items.map((item) => ({
    ...item,
    product_code: item.product_code || extractProductCode(item.series),
    series: cleanSeries(item.series),
    weight: Number(item.weight || 0),
    image_url: item.image_url || "/placeholder-bey.svg",
    strengths: item.strengths || [],
    weaknesses: item.weaknesses || [],
    recommended_combos: item.recommended_combos || [],
    anime_info: item.anime_info || ""
  }));
}

function mergeBeyblades(fallback: Beyblade[], remote: Beyblade[]) {
  const map = new Map<string, Beyblade>();
  fallback.forEach((item) => map.set(item.slug, item));
  remote.forEach((item) => {
    const base = map.get(item.slug);
    map.set(item.slug, {
      ...base,
      ...item,
      product_code: item.product_code || base?.product_code || "",
      series: cleanSeries(item.series || base?.series || "")
    });
  });
  return Array.from(map.values());
}

function extractProductCode(series: string) {
  return series.match(/\b(?:BXG|BX|UX|CX)-\d{2}\b/)?.[0] || "";
}

function cleanSeries(series: string) {
  return series.replace(/\s*\/\s*(?:BXG|BX|UX|CX)-\d{2}\b/g, "");
}

function normalizeParts(items: Part[]) {
  return items.map((item) => ({
    ...item,
    weight: Number(item.weight || 0),
    advantages: item.advantages || [],
    disadvantages: item.disadvantages || [],
    recommended_uses: item.recommended_uses || [],
    attack: Number(item.attack || 5),
    defense: Number(item.defense || 5),
    stamina: Number(item.stamina || 5),
    balance: Number(item.balance || 5)
  }));
}

function mergeGuides(fallback: Guide[], remote: Guide[]) {
  const map = new Map<string, Guide>();
  fallback.forEach((item) => map.set(item.slug, item));
  remote.forEach((item) => {
    const current = map.get(item.slug);
    if (!current || item.content.length > current.content.length) {
      map.set(item.slug, item);
    }
  });
  return Array.from(map.values()).sort((a, b) => b.published_at.localeCompare(a.published_at));
}
