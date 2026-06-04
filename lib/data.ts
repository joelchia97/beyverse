import type { Beyblade, Character, Combo, Guide, Part, TierListItem } from "@/types/database";

type BeyRecord = {
  code: string;
  name: string;
  series: "Basic Line" | "Unique Line" | "Custom Line" | "X-Over Project" | "Event Release";
  type: Beyblade["type"];
  release: string;
};

type PartRecord = {
  code: string;
  name: string;
  category: Part["category"];
  system: "Basic Line" | "Unique Line" | "Custom Line" | "X-Over Project";
  role: Beyblade["type"];
};

const catalogUpdated = "2026-05-27";

const beyRecords: BeyRecord[] = [
  { code: "BXG-01", name: "Dranzer Spiral 3-80T", series: "X-Over Project", type: "Balance", release: "2023-07-15" },
  { code: "BX-01", name: "Dran Sword 3-60F", series: "Basic Line", type: "Attack", release: "2023-07-15" },
  { code: "BX-02", name: "Hells Scythe 4-60T", series: "Basic Line", type: "Balance", release: "2023-07-15" },
  { code: "BX-03", name: "Wizard Arrow 4-80B", series: "Basic Line", type: "Stamina", release: "2023-07-15" },
  { code: "BX-04", name: "Knight Shield 3-80N", series: "Basic Line", type: "Defense", release: "2023-07-15" },
  { code: "BX-13", name: "Knight Lance 4-80HN", series: "Basic Line", type: "Defense", release: "2023-08-10" },
  { code: "BX-14", name: "Shark Edge 3-60LF", series: "Basic Line", type: "Attack", release: "2023-09-09" },
  { code: "BX-15", name: "Leon Claw 5-60P", series: "Basic Line", type: "Balance", release: "2023-10-07" },
  { code: "BX-16", name: "Viper Tail 5-80O", series: "Basic Line", type: "Balance", release: "2023-10-07" },
  { code: "BX-19", name: "Rhino Horn 3-80S", series: "Basic Line", type: "Defense", release: "2023-11-02" },
  { code: "BX-20", name: "Dran Dagger 4-60R", series: "Basic Line", type: "Attack", release: "2023-11-02" },
  { code: "BX-21", name: "Hells Chain 5-60HT", series: "Basic Line", type: "Balance", release: "2023-11-02" },
  { code: "BX-23", name: "Phoenix Wing 9-60GF", series: "Basic Line", type: "Attack", release: "2023-12-27" },
  { code: "BX-24", name: "Wyvern Gale 5-80GB", series: "Basic Line", type: "Stamina", release: "2023-12-27" },
  { code: "BX-26", name: "Unicorn Sting 5-60GP", series: "Basic Line", type: "Balance", release: "2024-01-27" },
  { code: "BX-27", name: "Sphinx Cowl 9-80GN", series: "Basic Line", type: "Defense", release: "2024-02-22" },
  { code: "BX-33", name: "Weiss Tiger 3-60U", series: "Basic Line", type: "Balance", release: "2024-06-15" },
  { code: "BX-34", name: "Cobalt Dragoon 2-60C", series: "Basic Line", type: "Attack", release: "2024-07-13" },
  { code: "BX-35", name: "Black Shell 4-60D", series: "Basic Line", type: "Defense", release: "2024-07-13" },
  { code: "BX-36", name: "Whale Wave 5-80E", series: "Basic Line", type: "Stamina", release: "2024-09-14" },
  { code: "BX-38", name: "Crimson Garuda 4-70TP", series: "Basic Line", type: "Balance", release: "2024-11-02" },
  { code: "BX-44", name: "Tricera Press M-85BS", series: "Basic Line", type: "Defense", release: "2025-06-28" },
  { code: "BX-45", name: "Samurai Calibur 6-70M", series: "Basic Line", type: "Attack", release: "2025-08-09" },
  { code: "BX-00", name: "Samurai Steel 5-70GF", series: "Event Release", type: "Attack", release: "2025-06-15" },
  { code: "UX-00", name: "Aero Pegasus 3-70A", series: "Unique Line", type: "Attack", release: "2024-07-30" },
  { code: "UX-00", name: "Wyvern Hover 2-80GN", series: "Unique Line", type: "Defense", release: "2025-10-24" },
  { code: "UX-01", name: "Dran Buster 1-60A", series: "Unique Line", type: "Attack", release: "2024-03-30" },
  { code: "UX-02", name: "Hells Hammer 3-70H", series: "Unique Line", type: "Attack", release: "2024-03-30" },
  { code: "UX-03", name: "Wizard Rod 5-70DB", series: "Unique Line", type: "Stamina", release: "2024-03-30" },
  { code: "UX-05", name: "Shinobi Shadow 1-80MN", series: "Unique Line", type: "Defense", release: "2024-05-18" },
  { code: "UX-06", name: "Leon Crest 7-60GN", series: "Unique Line", type: "Defense", release: "2024-08-10" },
  { code: "UX-07", name: "Phoenix Rudder 9-70G", series: "Unique Line", type: "Stamina", release: "2024-08-10" },
  { code: "UX-08", name: "Silver Wolf 3-80FB", series: "Unique Line", type: "Stamina", release: "2024-10-12" },
  { code: "UX-09", name: "Samurai Saber 2-70L", series: "Unique Line", type: "Attack", release: "2024-11-02" },
  { code: "UX-10", name: "Knight Mail 3-85BS", series: "Unique Line", type: "Defense", release: "2024-11-02" },
  { code: "UX-11", name: "Impact Drake 9-60LR", series: "Unique Line", type: "Attack", release: "2024-12-28" },
  { code: "UX-12", name: "Ghost Circle 0-80GB", series: "Unique Line", type: "Stamina", release: "2024-12-28" },
  { code: "UX-13", name: "Golem Rock 1-60UN", series: "Unique Line", type: "Defense", release: "2025-01-25" },
  { code: "UX-14", name: "Scorpio Spear 0-70Z", series: "Unique Line", type: "Attack", release: "2025-04-26" },
  { code: "UX-15", name: "Shark Scale 4-50UF", series: "Unique Line", type: "Attack", release: "2025-08-09" },
  { code: "UX-16", name: "Clock Mirage 9-65BS", series: "Unique Line", type: "Balance", release: "2025-10-11" },
  { code: "UX-17", name: "Meteor Dragoon 3-70J", series: "Unique Line", type: "Attack", release: "2025-12-27" },
  { code: "UX-18", name: "Mummy Curse 7-55W", series: "Unique Line", type: "Defense", release: "2025-12-27" },
  { code: "CX-01", name: "Dran Brave S6-60V", series: "Custom Line", type: "Attack", release: "2025-03-29" },
  { code: "CX-02", name: "Wizard Arc R4-55LO", series: "Custom Line", type: "Stamina", release: "2025-03-29" },
  { code: "CX-03", name: "Perseus Dark B6-80W", series: "Custom Line", type: "Balance", release: "2025-03-29" },
  { code: "CX-07", name: "Pegasus Blast ATr", series: "Custom Line", type: "Attack", release: "2025-07-19" },
  { code: "CX-08", name: "Cerberus Flame W5-80WB", series: "Custom Line", type: "Defense", release: "2025-07-19" },
  { code: "CX-09", name: "Sol Eclipse D5-70TK", series: "Custom Line", type: "Balance", release: "2025-09-27" },
  { code: "CX-10", name: "Wolf Hunt F0-60DB", series: "Custom Line", type: "Stamina", release: "2025-11-01" }
];

const partRecords: PartRecord[] = [
  { code: "BX-00", name: "Dranzer Spiral", category: "Blade", system: "X-Over Project", role: "Balance" },
  { code: "BX-00", name: "Cobalt Drake", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-00", name: "Phoenix Feather", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-00", name: "Samurai Steel", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-01", name: "Dran Sword", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-02", name: "Hells Scythe", category: "Blade", system: "Basic Line", role: "Balance" },
  { code: "BX-03", name: "Wizard Arrow", category: "Blade", system: "Basic Line", role: "Stamina" },
  { code: "BX-04", name: "Knight Shield", category: "Blade", system: "Basic Line", role: "Defense" },
  { code: "BX-13", name: "Knight Lance", category: "Blade", system: "Basic Line", role: "Defense" },
  { code: "BX-14", name: "Shark Edge", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-15", name: "Leon Claw", category: "Blade", system: "Basic Line", role: "Balance" },
  { code: "BX-16", name: "Viper Tail", category: "Blade", system: "Basic Line", role: "Balance" },
  { code: "BX-19", name: "Rhino Horn", category: "Blade", system: "Basic Line", role: "Defense" },
  { code: "BX-20", name: "Dran Dagger", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-21", name: "Hells Chain", category: "Blade", system: "Basic Line", role: "Balance" },
  { code: "BX-23", name: "Phoenix Wing", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-24", name: "Wyvern Gale", category: "Blade", system: "Basic Line", role: "Stamina" },
  { code: "BX-26", name: "Unicorn Sting", category: "Blade", system: "Basic Line", role: "Balance" },
  { code: "BX-27", name: "Sphinx Cowl", category: "Blade", system: "Basic Line", role: "Defense" },
  { code: "BX-33", name: "Weiss Tiger", category: "Blade", system: "Basic Line", role: "Balance" },
  { code: "BX-34", name: "Cobalt Dragoon", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-35", name: "Black Shell", category: "Blade", system: "Basic Line", role: "Defense" },
  { code: "BX-36", name: "Whale Wave", category: "Blade", system: "Basic Line", role: "Stamina" },
  { code: "BX-38", name: "Crimson Garuda", category: "Blade", system: "Basic Line", role: "Balance" },
  { code: "BX-44", name: "Tricera Press", category: "Blade", system: "Basic Line", role: "Defense" },
  { code: "BX-45", name: "Samurai Calibur", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "UX-00", name: "Aero Pegasus", category: "Blade", system: "Unique Line", role: "Attack" },
  { code: "UX-00", name: "Wyvern Hover", category: "Blade", system: "Unique Line", role: "Defense" },
  { code: "UX-01", name: "Dran Buster", category: "Blade", system: "Unique Line", role: "Attack" },
  { code: "UX-02", name: "Hells Hammer", category: "Blade", system: "Unique Line", role: "Attack" },
  { code: "UX-03", name: "Wizard Rod", category: "Blade", system: "Unique Line", role: "Stamina" },
  { code: "UX-05", name: "Shinobi Shadow", category: "Blade", system: "Unique Line", role: "Defense" },
  { code: "UX-06", name: "Leon Crest", category: "Blade", system: "Unique Line", role: "Defense" },
  { code: "UX-07", name: "Phoenix Rudder", category: "Blade", system: "Unique Line", role: "Stamina" },
  { code: "UX-08", name: "Silver Wolf", category: "Blade", system: "Unique Line", role: "Stamina" },
  { code: "UX-09", name: "Samurai Saber", category: "Blade", system: "Unique Line", role: "Attack" },
  { code: "UX-10", name: "Knight Mail", category: "Blade", system: "Unique Line", role: "Defense" },
  { code: "UX-11", name: "Impact Drake", category: "Blade", system: "Unique Line", role: "Attack" },
  { code: "UX-12", name: "Ghost Circle", category: "Blade", system: "Unique Line", role: "Stamina" },
  { code: "UX-13", name: "Golem Rock", category: "Blade", system: "Unique Line", role: "Defense" },
  { code: "UX-14", name: "Scorpio Spear", category: "Blade", system: "Unique Line", role: "Attack" },
  { code: "UX-15", name: "Shark Scale", category: "Blade", system: "Unique Line", role: "Attack" },
  { code: "UX-16", name: "Clock Mirage", category: "Blade", system: "Unique Line", role: "Balance" },
  { code: "UX-17", name: "Meteor Dragoon", category: "Blade", system: "Unique Line", role: "Attack" },
  { code: "UX-18", name: "Mummy Curse", category: "Blade", system: "Unique Line", role: "Defense" },
  { code: "CX-01", name: "Dran Brave", category: "Blade", system: "Custom Line", role: "Attack" },
  { code: "CX-02", name: "Wizard Arc", category: "Blade", system: "Custom Line", role: "Stamina" },
  { code: "CX-03", name: "Perseus Dark", category: "Blade", system: "Custom Line", role: "Balance" },
  { code: "CX-07", name: "Pegasus Blast", category: "Blade", system: "Custom Line", role: "Attack" },
  { code: "CX-08", name: "Cerberus Flame", category: "Blade", system: "Custom Line", role: "Defense" },
  { code: "CX-09", name: "Sol Eclipse", category: "Blade", system: "Custom Line", role: "Balance" },
  { code: "CX-10", name: "Wolf Hunt", category: "Blade", system: "Custom Line", role: "Stamina" },
  ...[
    "0-60", "0-70", "0-80", "1-60", "1-70", "1-80", "2-60", "2-70", "2-80", "3-60", "3-70", "3-80", "3-85",
    "4-50", "4-55", "4-60", "4-70", "4-80", "5-60", "5-70", "5-80", "6-60", "6-70", "6-80", "7-55", "7-60",
    "9-60", "9-65", "9-70", "9-80", "M-85"
  ].map((name): PartRecord => ({ code: "Catalog", name, category: "Ratchet", system: "Basic Line", role: ratchetRole(name) })),
  ...[
    ["F", "Flat", "Attack"], ["T", "Taper", "Balance"], ["B", "Ball", "Stamina"], ["N", "Needle", "Defense"],
    ["HN", "High Needle", "Defense"], ["LF", "Low Flat", "Attack"], ["P", "Point", "Balance"], ["O", "Orb", "Stamina"],
    ["S", "Spike", "Defense"], ["R", "Rush", "Attack"], ["HT", "High Taper", "Balance"], ["GF", "Gear Flat", "Attack"],
    ["GB", "Gear Ball", "Stamina"], ["GP", "Gear Point", "Balance"], ["GN", "Gear Needle", "Defense"], ["U", "Unite", "Balance"],
    ["C", "Cyclone", "Attack"], ["E", "Elevate", "Stamina"], ["TP", "Trans Point", "Balance"], ["M", "Merge", "Balance"],
    ["A", "Accel", "Attack"], ["H", "Hexa", "Defense"], ["DB", "Disk Ball", "Stamina"], ["MN", "Metal Needle", "Defense"],
    ["G", "Glide", "Stamina"], ["FB", "Free Ball", "Stamina"], ["L", "Level", "Attack"], ["BS", "Bound Spike", "Defense"],
    ["LR", "Low Rush", "Attack"], ["UN", "Under Needle", "Defense"], ["Z", "Zap", "Attack"], ["J", "Jolt", "Attack"],
    ["UF", "Under Flat", "Attack"], ["V", "Vortex", "Attack"], ["LO", "Low Orb", "Stamina"], ["W", "Wedge", "Balance"],
    ["K", "Kick", "Attack"], ["GR", "Gear Rush", "Attack"], ["Tr", "Turbo", "Attack"], ["WB", "Wall Ball", "Defense"],
    ["TK", "Trans Kick", "Balance"], ["Op", "Operate", "Balance"]
  ].map(([code, name, role]): PartRecord => ({ code, name, category: "Bit", system: "Basic Line", role: role as Beyblade["type"] }))
];

export const beyblades: Beyblade[] = beyRecords.map((record, index) => {
  const parts = splitCombo(record.name);
  return {
    id: `${record.code.toLowerCase()}-${index}`,
    slug: slugify(record.name),
    name: record.name,
    series: `Beyblade X ${record.series} / ${record.code}`,
    type: record.type,
    weight: estimateBeyWeight(record.type, record.series),
    release_date: record.release,
    image_url: "/placeholder-bey.svg",
    description: `${record.name} is a ${record.type.toLowerCase()}-type Beyblade X release from the ${record.series}. This catalog entry is prepared for encyclopedia expansion with matchup notes, photos, and testing results.`,
    strengths: strengthsFor(record.type),
    weaknesses: weaknessesFor(record.type),
    recommended_combos: [record.name, `${parts.blade} 9-60 ${parts.bit}`, `${parts.blade} 5-70 ${parts.bit}`],
    anime_info: `${record.name} belongs to the Beyblade X era. Add episode-specific lore and character usage notes as your content library grows. Catalog checked ${catalogUpdated}.`
  };
});

export const parts: Part[] = dedupeParts(partRecords).map((record, index) => ({
  id: `${record.category.toLowerCase()}-${slugify(record.name)}-${index}`,
  slug: slugify(record.name),
  name: record.name,
  category: record.category,
  weight: estimatePartWeight(record),
  description: `${record.name} is a Beyblade X ${record.category.toLowerCase()} from the ${record.system}. It is listed for combo building, search, and encyclopedia coverage.`,
  advantages: strengthsFor(record.role),
  disadvantages: weaknessesFor(record.role),
  recommended_uses: [record.role, `${record.role} testing`, "Tournament notebook"],
  ...scoresFor(record.role, record.category)
}));

export const guides: Guide[] = [
  {
    id: "guide-launch-control",
    slug: "launch-control-for-beyblade-x",
    title: "Launch Control for Beyblade X",
    category: "Beginner Strategy",
    excerpt: "How angle, power, and rail timing change your opening pattern.",
    content:
      "Launch control decides whether an attack combo creates pressure or wastes stamina. Start by testing flat, angled, and flower-pattern launches, then record which pattern reaches the opponent fastest without self-KO risk.",
    published_at: "2026-01-10"
  },
  {
    id: "guide-building-balance",
    slug: "building-balance-combos",
    title: "Building Reliable Balance Combos",
    category: "Combo Theory",
    excerpt: "A practical framework for mixing attack threat with late-game stability.",
    content:
      "A good balance combo should have one clear win condition and one backup route. Pair a stable blade with a ratchet that protects your height plan, then choose a bit that gives enough movement to contest the center.",
    published_at: "2026-02-02"
  },
  {
    id: "guide-bx-ux-cx",
    slug: "bx-ux-cx-lines-explained",
    title: "BX, UX, and CX Lines Explained",
    category: "Product Guide",
    excerpt: "A plain-language guide to Beyblade X product lines and how they affect customization.",
    content:
      "BX is the basic Beyblade X line, UX focuses on unique gimmicks and special performance identity, and CX introduces custom blade construction. Treat the line label as a starting point, then test the actual Blade, Ratchet, and Bit together.",
    published_at: "2026-05-27"
  }
];

export const combos: Combo[] = [
  { id: "combo-1", name: "Phoenix Break", blade: "Phoenix Wing", ratchet: "9-60", bit: "Gear Flat", play_style: "Attack", rating: 91 },
  { id: "combo-2", name: "Rod Control", blade: "Wizard Rod", ratchet: "5-70", bit: "Disk Ball", play_style: "Stamina", rating: 90 },
  { id: "combo-3", name: "Impact Rush", blade: "Impact Drake", ratchet: "9-60", bit: "Low Rush", play_style: "Attack", rating: 89 },
  { id: "combo-4", name: "Wolf Hold", blade: "Silver Wolf", ratchet: "9-80", bit: "Free Ball", play_style: "Stamina", rating: 87 },
  { id: "combo-5", name: "Unicorn Point", blade: "Unicorn Sting", ratchet: "5-60", bit: "Point", play_style: "Balance", rating: 85 },
  { id: "combo-6", name: "Knight Wall", blade: "Knight Mail", ratchet: "3-85", bit: "Bound Spike", play_style: "Defense", rating: 84 },
  { id: "combo-7", name: "Buster Low", blade: "Dran Buster", ratchet: "1-60", bit: "Low Flat", play_style: "Attack", rating: 87 },
  { id: "combo-8", name: "Scorpio Zap", blade: "Scorpio Spear", ratchet: "0-70", bit: "Zap", play_style: "Attack", rating: 83 }
];

export const characters: Character[] = [
  {
    id: "char-1",
    name: "Ekusu Kurosu",
    series: "Beyblade X",
    signature_bey: "Dran Sword",
    description: "A high-level blader known for explosive attack patterns and bold stadium control."
  },
  {
    id: "char-2",
    name: "Multi Nanairo",
    series: "Beyblade X",
    signature_bey: "Wizard Arrow",
    description: "A technical blader whose flexible style highlights the depth of part selection."
  }
];

export const tierList: TierListItem[] = [
  { id: "tier-1", name: "Phoenix Wing 9-60GF", tier: "S", format: "Beyblade X", notes: "Heavy attack option with strong knockout threat." },
  { id: "tier-2", name: "Wizard Rod 5-70DB", tier: "S", format: "Beyblade X", notes: "Excellent stamina benchmark for testing." },
  { id: "tier-3", name: "Impact Drake 9-60LR", tier: "S", format: "Beyblade X", notes: "Powerful attack pick for aggressive testing." },
  { id: "tier-4", name: "Silver Wolf 3-80FB", tier: "A", format: "Beyblade X", notes: "Strong stamina and control profile." },
  { id: "tier-5", name: "Unicorn Sting 5-60GP", tier: "A", format: "Beyblade X", notes: "Flexible balance choice with adaptable movement." },
  { id: "tier-6", name: "Shark Edge 3-60LF", tier: "A", format: "Beyblade X", notes: "High-risk attack build with dangerous smash potential." },
  { id: "tier-7", name: "Knight Mail 3-85BS", tier: "B", format: "Beyblade X", notes: "Defensive custom-line testing option." },
  { id: "tier-8", name: "Wizard Arrow 4-80B", tier: "B", format: "Beyblade X", notes: "Good stamina option, but matchup dependent." }
];

function splitCombo(name: string) {
  const tokens = name.split(" ");
  const bitToken = tokens.at(-1) || "";
  return {
    blade: tokens.slice(0, -1).join(" "),
    bit: bitToken.replace(/^[A-Z]*\d+-\d+/, "") || "Point"
  };
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function dedupeParts(records: PartRecord[]) {
  const seen = new Set<string>();
  return records.filter((record) => {
    const key = `${record.category}-${record.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function ratchetRole(name: string): Beyblade["type"] {
  if (name.includes("-60") || name.includes("-55") || name.includes("-50")) return "Attack";
  if (name.includes("-80") || name.includes("-85")) return "Defense";
  if (name.includes("-70") || name.includes("-65")) return "Stamina";
  return "Balance";
}

function scoresFor(role: Beyblade["type"], category: Part["category"]) {
  const base = {
    Attack: { attack: 9, defense: 4, stamina: 3, balance: 5 },
    Defense: { attack: 3, defense: 9, stamina: 6, balance: 6 },
    Stamina: { attack: 2, defense: 6, stamina: 10, balance: 6 },
    Balance: { attack: 6, defense: 6, stamina: 6, balance: 9 }
  }[role];

  if (category === "Ratchet") {
    return { attack: Math.max(1, base.attack - 1), defense: base.defense, stamina: base.stamina, balance: base.balance };
  }
  return base;
}

function estimatePartWeight(record: PartRecord) {
  if (record.category === "Blade") return record.system === "Custom Line" ? 37.4 : record.system === "Unique Line" ? 36.8 : 35.6;
  if (record.category === "Ratchet") return record.name.includes("85") ? 7.1 : record.name.includes("80") ? 6.9 : 6.5;
  return record.name.includes("Gear") || record.name.includes("Disk") ? 2.5 : 2.2;
}

function estimateBeyWeight(type: Beyblade["type"], series: BeyRecord["series"]) {
  const typeWeight = { Attack: 37.2, Defense: 38.1, Stamina: 37.6, Balance: 37.4 }[type];
  const lineBonus = series === "Custom Line" ? 1.1 : series === "Unique Line" ? 0.5 : 0;
  return Number((typeWeight + lineBonus).toFixed(1));
}

function strengthsFor(type: Beyblade["type"]) {
  return {
    Attack: ["High knockout pressure", "Strong early-game tempo", "Rewards launch control"],
    Defense: ["Good impact resistance", "Stable center control", "Useful against reckless attack"],
    Stamina: ["Strong late-game spin", "Efficient movement", "Good into passive matchups"],
    Balance: ["Flexible matchup coverage", "Can change game plan", "Good testing platform"]
  }[type];
}

function weaknessesFor(type: Beyblade["type"]) {
  return {
    Attack: ["Can self-KO", "Lower stamina if attacks miss", "Needs precise launch angle"],
    Defense: ["Can be outspun", "Lower offensive pressure", "May struggle against tall stamina"],
    Stamina: ["Vulnerable to clean knockouts", "Less immediate pressure", "Needs safe positioning"],
    Balance: ["Less specialized", "Requires matchup knowledge", "Can lose to extreme builds"]
  }[type];
}
