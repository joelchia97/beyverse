import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataFile = join(root, "lib", "data.ts");
const outDir = join(root, "public", "beyblades");

const source = readFileSync(dataFile, "utf8");
const records = [...source.matchAll(/\{ code: "([^"]+)", name: "([^"]+)", series: "([^"]+)", type: "([^"]+)"/g)].map(
  ([, code, name, series, type]) => ({ code, name, series, type })
);

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const profileMap = [
  {
    match: /wizard rod|wand wizard/i,
    palette: ["#e7f9cf", "#7dd3fc", "#22c55e", "#f8fafc"],
    bg: ["#0f172a", "#082f49"],
    motif: "wizardRod",
    arms: 5,
    label: "wide circular stamina ring with five rod spokes"
  },
  {
    match: /dran sword|sword dran/i,
    palette: ["#1d4ed8", "#38bdf8", "#f59e0b", "#f8fafc"],
    bg: ["#020617", "#0c4a6e"],
    motif: "swordDragon",
    arms: 3,
    label: "three blue sword wings and orange dragon accents"
  },
  {
    match: /phoenix wing|soar phoenix/i,
    palette: ["#dc2626", "#fb923c", "#facc15", "#f8fafc"],
    bg: ["#180405", "#7f1d1d"],
    motif: "phoenixWing",
    arms: 9,
    label: "red gold phoenix wings with nine outer notches"
  },
  {
    match: /dran buster|buster dran/i,
    palette: ["#0f4c81", "#60a5fa", "#f97316", "#e2e8f0"],
    bg: ["#020617", "#172554"],
    motif: "breakerDragon",
    arms: 1,
    label: "single heavy breaker blade with blue dragon cuts"
  },
  {
    match: /cobalt dragoon|meteor dragoon/i,
    palette: ["#1e3a8a", "#2563eb", "#22d3ee", "#e0f2fe"],
    bg: ["#020617", "#1e1b4b"],
    motif: "dragoon",
    arms: 4,
    label: "cobalt dragon hooks and swept spiral claws"
  },
  {
    match: /silver wolf|sterling wolf|wolf hunt/i,
    palette: ["#e5e7eb", "#94a3b8", "#38bdf8", "#0f172a"],
    bg: ["#020617", "#334155"],
    motif: "wolf",
    arms: 3,
    label: "silver wolf ears, claws, and cool stamina ring"
  },
  {
    match: /impact drake|shelter drake/i,
    palette: ["#111827", "#ef4444", "#f59e0b", "#f8fafc"],
    bg: ["#020617", "#451a03"],
    motif: "impactDrake",
    arms: 9,
    label: "black red drake impact points with lightning breaks"
  },
  {
    match: /shark edge|keel shark|shark scale|scale shark/i,
    palette: ["#0891b2", "#67e8f9", "#0f172a", "#e0f2fe"],
    bg: ["#020617", "#083344"],
    motif: "shark",
    arms: 3,
    label: "teal shark fins with sharp bite edges"
  },
  {
    match: /bahamut blitz|blitz bahamut/i,
    palette: ["#581c87", "#a855f7", "#ef4444", "#f8fafc"],
    bg: ["#020617", "#2e1065"],
    motif: "bahamut",
    arms: 1,
    label: "purple dragon horns, one heavy break wing, lightning core"
  },
  {
    match: /knight shield|helm knight/i,
    palette: ["#64748b", "#bfdbfe", "#1d4ed8", "#f8fafc"],
    bg: ["#020617", "#1e3a8a"],
    motif: "shield",
    arms: 3,
    label: "rounded knight shield panels and blue armor"
  },
  {
    match: /knight lance|lance knight/i,
    palette: ["#475569", "#93c5fd", "#f8fafc", "#1e40af"],
    bg: ["#020617", "#172554"],
    motif: "lance",
    arms: 4,
    label: "long knight lance points with armor plates"
  },
  {
    match: /knight mail|knight fortress|armor knight/i,
    palette: ["#64748b", "#cbd5e1", "#60a5fa", "#0f172a"],
    bg: ["#020617", "#1e293b"],
    motif: "fortress",
    arms: 8,
    label: "heavy mail armor blocks and fortress rim"
  },
  {
    match: /hells scythe|scythe incendio/i,
    palette: ["#7f1d1d", "#ef4444", "#a78bfa", "#f8fafc"],
    bg: ["#020617", "#450a0a"],
    motif: "scythe",
    arms: 4,
    label: "red scythe arcs with purple undercut"
  },
  {
    match: /hells hammer|hammer incendio/i,
    palette: ["#991b1b", "#f97316", "#facc15", "#e5e7eb"],
    bg: ["#020617", "#431407"],
    motif: "hammer",
    arms: 3,
    label: "chunky hammer heads and hot orange strikes"
  },
  {
    match: /wizard arrow|arrow wizard|wizard arc|arc wizard/i,
    palette: ["#facc15", "#84cc16", "#38bdf8", "#f8fafc"],
    bg: ["#020617", "#365314"],
    motif: "arrow",
    arms: 4,
    label: "wizard arrowheads and clean stamina circle"
  },
  {
    match: /leon claw|claw leon|leon crest|fang leon/i,
    palette: ["#f59e0b", "#fef3c7", "#38bdf8", "#78350f"],
    bg: ["#020617", "#451a03"],
    motif: "lion",
    arms: 5,
    label: "lion mane rim with claw marks"
  },
  {
    match: /viper tail/i,
    palette: ["#16a34a", "#a3e635", "#7c3aed", "#f8fafc"],
    bg: ["#020617", "#14532d"],
    motif: "viper",
    arms: 5,
    label: "snake tail curves and green-purple venom accents"
  },
  {
    match: /rhino horn|horn rhino|reaper rhino/i,
    palette: ["#64748b", "#cbd5e1", "#f59e0b", "#0f172a"],
    bg: ["#020617", "#334155"],
    motif: "rhino",
    arms: 3,
    label: "thick rhino horn impacts and armored rim"
  },
  {
    match: /unicorn sting|sting unicorn|unicorn delta/i,
    palette: ["#f8fafc", "#f9a8d4", "#8b5cf6", "#38bdf8"],
    bg: ["#020617", "#4c1d95"],
    motif: "unicorn",
    arms: 5,
    label: "unicorn horn, pink-violet highlights, balanced ring"
  },
  {
    match: /whale wave/i,
    palette: ["#0e7490", "#67e8f9", "#0369a1", "#e0f2fe"],
    bg: ["#020617", "#164e63"],
    motif: "wave",
    arms: 5,
    label: "blue whale wave curves and water-weighted rim"
  },
  {
    match: /crimson garuda|scarlet garuda/i,
    palette: ["#b91c1c", "#fb7185", "#facc15", "#f8fafc"],
    bg: ["#020617", "#7f1d1d"],
    motif: "garuda",
    arms: 4,
    label: "crimson bird wings and feather slashes"
  },
  {
    match: /samurai saber|samurai calibur|samurai steel|steel samurai/i,
    palette: ["#e5e7eb", "#ef4444", "#f59e0b", "#0f172a"],
    bg: ["#020617", "#450a0a"],
    motif: "samurai",
    arms: 2,
    label: "samurai blade arcs and steel guard"
  },
  {
    match: /ghost circle/i,
    palette: ["#f8fafc", "#a7f3d0", "#94a3b8", "#0f172a"],
    bg: ["#020617", "#064e3b"],
    motif: "ghost",
    arms: 0,
    label: "pale ghost circle with soft hollow ring"
  },
  {
    match: /golem rock|rock golem/i,
    palette: ["#78716c", "#d6d3d1", "#f59e0b", "#1c1917"],
    bg: ["#020617", "#292524"],
    motif: "rock",
    arms: 6,
    label: "chunky stone blocks and golem armor"
  },
  {
    match: /mummy curse|curse mummy/i,
    palette: ["#d6d3d1", "#a16207", "#fef3c7", "#0f172a"],
    bg: ["#020617", "#422006"],
    motif: "mummy",
    arms: 7,
    label: "wrapped bandage ring and cursed gold cuts"
  },
  {
    match: /brachio whip/i,
    palette: ["#65a30d", "#bef264", "#38bdf8", "#164e63"],
    bg: ["#020617", "#365314"],
    motif: "brachio",
    arms: 5,
    label: "long-neck brachio sweep and whip motion"
  }
];

const fallbackProfiles = {
  Attack: { palette: ["#ef4444", "#f97316", "#38bdf8", "#f8fafc"], bg: ["#020617", "#450a0a"], motif: "slash", arms: 3, label: "attack slash profile" },
  Defense: { palette: ["#64748b", "#bfdbfe", "#2563eb", "#f8fafc"], bg: ["#020617", "#1e3a8a"], motif: "shield", arms: 6, label: "defense armor profile" },
  Stamina: { palette: ["#22c55e", "#67e8f9", "#f8fafc", "#0f172a"], bg: ["#020617", "#064e3b"], motif: "circle", arms: 8, label: "stamina circular profile" },
  Balance: { palette: ["#8b5cf6", "#38bdf8", "#e5e7eb", "#f59e0b"], bg: ["#020617", "#312e81"], motif: "balance", arms: 4, label: "balanced mixed profile" }
};

function profileFor(record) {
  return profileMap.find((profile) => profile.match.test(record.name)) ?? fallbackProfiles[record.type] ?? fallbackProfiles.Balance;
}

function polar(radius, angleDeg, cx = 256, cy = 256) {
  const angle = (angleDeg - 90) * (Math.PI / 180);
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

function polygon(points) {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function bladePoint(angle, inner, outer, width) {
  return polygon([polar(inner, angle - width), polar(outer, angle), polar(inner, angle + width)]);
}

function bladeElements(profile) {
  const [a, b, c, d] = profile.palette;
  const arms = Math.max(profile.arms || 4, 1);
  const step = 360 / arms;
  const elements = [];

  for (let i = 0; i < arms; i += 1) {
    const angle = i * step + (profile.motif === "swordDragon" ? 10 : 0);
    const primary = i % 2 === 0 ? a : b;
    const secondary = i % 2 === 0 ? c : d;

    if (["wizardRod", "circle"].includes(profile.motif)) {
      elements.push(`<path d="M ${polar(108, angle - 18).join(" ")} Q ${polar(174, angle).join(" ")} ${polar(108, angle + 18).join(" ")}" fill="none" stroke="${primary}" stroke-width="32" stroke-linecap="round"/>`);
      elements.push(`<rect x="247" y="72" width="18" height="116" rx="9" fill="${secondary}" opacity="0.9" transform="rotate(${angle} 256 256)"/>`);
    } else if (["swordDragon", "breakerDragon", "samurai", "lance"].includes(profile.motif)) {
      elements.push(`<polygon points="${bladePoint(angle, 92, profile.motif === "breakerDragon" ? 226 : 214, 13)}" fill="${primary}" stroke="#020617" stroke-width="8" stroke-linejoin="round"/>`);
      elements.push(`<polygon points="${bladePoint(angle + 9, 112, 188, 8)}" fill="${secondary}" opacity="0.78" stroke="#020617" stroke-width="5" stroke-linejoin="round"/>`);
    } else if (["phoenixWing", "garuda"].includes(profile.motif)) {
      elements.push(`<path d="M ${polar(92, angle - 21).join(" ")} C ${polar(174, angle - 36).join(" ")} ${polar(220, angle - 15).join(" ")} ${polar(206, angle + 10).join(" ")} C ${polar(164, angle + 26).join(" ")} ${polar(126, angle + 24).join(" ")} ${polar(94, angle + 10).join(" ")} Z" fill="${primary}" stroke="#020617" stroke-width="7"/>`);
      elements.push(`<path d="M ${polar(120, angle - 8).join(" ")} Q ${polar(186, angle).join(" ")} ${polar(122, angle + 16).join(" ")}" fill="none" stroke="${secondary}" stroke-width="12" stroke-linecap="round"/>`);
    } else if (["dragoon", "bahamut", "impactDrake"].includes(profile.motif)) {
      elements.push(`<path d="M ${polar(88, angle - 18).join(" ")} L ${polar(190, angle - 34).join(" ")} L ${polar(166, angle - 5).join(" ")} L ${polar(218, angle + 16).join(" ")} L ${polar(116, angle + 28).join(" ")} Z" fill="${primary}" stroke="#020617" stroke-width="7" stroke-linejoin="round"/>`);
      elements.push(`<path d="M ${polar(112, angle + 3).join(" ")} L ${polar(190, angle + 18).join(" ")}" stroke="${secondary}" stroke-width="10" stroke-linecap="round"/>`);
    } else if (["shark", "viper", "wave", "brachio"].includes(profile.motif)) {
      elements.push(`<path d="M ${polar(94, angle - 20).join(" ")} C ${polar(158, angle - 54).join(" ")} ${polar(228, angle - 8).join(" ")} ${polar(178, angle + 23).join(" ")} C ${polar(146, angle + 42).join(" ")} ${polar(112, angle + 24).join(" ")} ${polar(94, angle + 10).join(" ")} Z" fill="${primary}" stroke="#020617" stroke-width="7"/>`);
      elements.push(`<polygon points="${bladePoint(angle + 8, 145, 213, 8)}" fill="${secondary}" opacity="0.9"/>`);
    } else if (["wolf", "lion", "unicorn", "rhino"].includes(profile.motif)) {
      elements.push(`<polygon points="${bladePoint(angle, 104, 206, profile.motif === "unicorn" ? 7 : 16)}" fill="${primary}" stroke="#020617" stroke-width="7" stroke-linejoin="round"/>`);
      elements.push(`<circle cx="${polar(166, angle)[0].toFixed(1)}" cy="${polar(166, angle)[1].toFixed(1)}" r="18" fill="${secondary}" opacity="0.75" stroke="#020617" stroke-width="4"/>`);
    } else if (["shield", "fortress", "rock", "hammer"].includes(profile.motif)) {
      elements.push(`<polygon points="${polygon([polar(108, angle - 17), polar(178, angle - 22), polar(212, angle), polar(178, angle + 22), polar(108, angle + 17)])}" fill="${primary}" stroke="#020617" stroke-width="7" stroke-linejoin="round"/>`);
      elements.push(`<rect x="234" y="62" width="52" height="82" rx="10" fill="${secondary}" opacity="0.82" transform="rotate(${angle} 256 256)"/>`);
    } else if (profile.motif === "mummy") {
      elements.push(`<path d="M ${polar(98, angle - 18).join(" ")} Q ${polar(188, angle).join(" ")} ${polar(98, angle + 18).join(" ")}" fill="none" stroke="${primary}" stroke-width="30" stroke-linecap="round"/>`);
      elements.push(`<path d="M ${polar(113, angle - 8).join(" ")} Q ${polar(174, angle + 4).join(" ")} ${polar(116, angle + 18).join(" ")}" fill="none" stroke="${secondary}" stroke-width="10" stroke-linecap="round"/>`);
    } else if (profile.motif === "ghost") {
      elements.push(`<circle cx="${polar(162, angle)[0].toFixed(1)}" cy="${polar(162, angle)[1].toFixed(1)}" r="34" fill="${primary}" opacity="0.8" stroke="#020617" stroke-width="5"/>`);
    } else {
      elements.push(`<polygon points="${bladePoint(angle, 94, 202, 14)}" fill="${primary}" stroke="#020617" stroke-width="7" stroke-linejoin="round"/>`);
    }
  }

  return elements.join("\n      ");
}

function decorativeMarks(profile) {
  const [a, b, c] = profile.palette;
  const marks = [];
  const count = profile.motif === "bahamut" || profile.motif === "breakerDragon" ? 6 : 10;

  for (let i = 0; i < count; i += 1) {
    const angle = (360 / count) * i + 12;
    if (profile.motif === "shark") {
      marks.push(`<polygon points="${bladePoint(angle, 64, 92, 8)}" fill="${c}" opacity="0.85"/>`);
    } else if (profile.motif === "phoenixWing" || profile.motif === "garuda") {
      marks.push(`<path d="M ${polar(60, angle - 5).join(" ")} Q ${polar(108, angle).join(" ")} ${polar(62, angle + 9).join(" ")}" stroke="${b}" stroke-width="8" stroke-linecap="round" fill="none"/>`);
    } else {
      marks.push(`<rect x="250" y="72" width="12" height="42" rx="6" fill="${i % 2 ? a : b}" opacity="0.72" transform="rotate(${angle} 256 256)"/>`);
    }
  }

  return marks.join("\n      ");
}

function initials(name) {
  return name
    .replace(/\b\d[-\dA-Z]+[A-Z]?\b/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function svgFor(record) {
  const profile = profileFor(record);
  const [a, b, c, d] = profile.palette;
  const [bg1, bg2] = profile.bg;
  const label = `${record.name} original 2D fan-safe visual: ${profile.label}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="${label}">
  <defs>
    <radialGradient id="bg" cx="46%" cy="38%" r="75%">
      <stop offset="0" stop-color="${bg2}"/>
      <stop offset="0.72" stop-color="${bg1}"/>
      <stop offset="1" stop-color="#020617"/>
    </radialGradient>
    <radialGradient id="core" cx="40%" cy="35%" r="70%">
      <stop offset="0" stop-color="${d}"/>
      <stop offset="0.52" stop-color="${b}"/>
      <stop offset="1" stop-color="${a}"/>
    </radialGradient>
    <filter id="glow" x="-22%" y="-22%" width="144%" height="144%">
      <feGaussianBlur stdDeviation="7" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="512" height="512" rx="44" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="216" fill="#020617" opacity="0.38" stroke="${b}" stroke-width="3"/>
  <circle cx="256" cy="256" r="184" fill="none" stroke="${c}" stroke-width="7" stroke-dasharray="18 16" opacity="0.72"/>
  <g filter="url(#glow)">
      ${bladeElements(profile)}
      ${decorativeMarks(profile)}
  </g>
  <circle cx="256" cy="256" r="124" fill="#0f172a" stroke="#020617" stroke-width="14"/>
  <circle cx="256" cy="256" r="104" fill="none" stroke="${d}" stroke-width="12" opacity="0.8"/>
  <circle cx="256" cy="256" r="82" fill="url(#core)" stroke="#f8fafc" stroke-width="8"/>
  <circle cx="256" cy="256" r="46" fill="#020617" stroke="${c}" stroke-width="9"/>
  <text x="256" y="265" text-anchor="middle" dominant-baseline="middle" font-family="Arial Black, Arial, sans-serif" font-size="28" fill="#f8fafc">${initials(record.name)}</text>
  <text x="256" y="456" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="#cbd5e1">${record.code}</text>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });

for (const record of records) {
  writeFileSync(join(outDir, `${slugify(record.name)}.svg`), svgFor(record), "utf8");
}

writeFileSync(
  join(outDir, "README.md"),
  `# BEYBUKU Beyblade Visuals

These SVG files are original, fan-safe 2D encyclopedia visuals generated from visual profiles.

They are not official product photography and are not exact copies of Takara Tomy, Hasbro, or licensed collaboration artwork. Each profile uses broad recognizable cues such as color family, blade count, silhouette rhythm, and motif language to help users distinguish releases while keeping the site copyright-conscious.

Generated count: ${records.length}
`,
  "utf8"
);

console.log(`Generated ${records.length} Beyblade visuals.`);
