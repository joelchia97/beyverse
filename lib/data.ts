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
    description: descriptionFor(record.name, record.type, record.series),
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
      "Launch control decides whether an attack combo creates pressure or wastes stamina. A strong Beyblade X launch is not only about pulling hard; it is about choosing a pattern that matches the combo's win condition.\n\nFor attack builds, begin by testing three launches: flat launch, slight-angle launch, and controlled flower pattern. Flat launches usually create direct speed but can waste stamina if the Beyblade circles without contact. Slight-angle launches can help the Beyblade touch the rail and enter the Xtreme line earlier. Flower launches create repeated approach angles, which is useful when you need several chances to land a knockout.\n\nFor stamina and defense builds, the goal is usually the opposite. You want the Beyblade to settle safely, avoid unnecessary wall hits, and force the opponent to spend energy first. Try a calmer launch with less tilt, then compare whether your combo survives the first ten seconds more consistently.\n\nKeep a testing notebook. Write down the combo, opponent, launch angle, launch strength, and result. After ten matches, patterns become clearer. You may discover that a combo loses not because the parts are weak, but because the launch pattern is giving away its best matchup.",
    published_at: "2026-01-10"
  },
  {
    id: "guide-building-balance",
    slug: "building-balance-combos",
    title: "Building Reliable Balance Combos",
    category: "Combo Theory",
    excerpt: "A practical framework for mixing attack threat with late-game stability.",
    content:
      "A good balance combo should have one clear win condition and one backup route. If a build tries to do everything equally, it often ends up doing nothing well enough to matter.\n\nStart with the Blade. A balanced Blade should either have safe contact points or enough attack shape to punish opponents that lose control. Then choose a Ratchet that supports the height plan. Low Ratchets are better when you want direct contact and less exposure. Taller Ratchets can help stamina or defense ideas, but they may become easier to destabilize.\n\nThe Bit is where the combo's personality becomes obvious. Point-style Bits can move aggressively early and settle later. Ball-style Bits preserve spin but may lack pressure. Gear Bits can create dramatic rail movement but demand launch control. Pick the Bit based on your intended win condition, not only the highest score.\n\nWhen testing balance builds, do not only record wins and losses. Record how they win. If the combo wins by spin finish, protect that strength. If it wins by late knockouts, keep enough movement. If it only wins when the opponent makes a mistake, the combo probably needs a clearer identity.",
    published_at: "2026-02-02"
  },
  {
    id: "guide-bx-ux-cx",
    slug: "bx-ux-cx-lines-explained",
    title: "BX, UX, and CX Lines Explained",
    category: "Product Guide",
    excerpt: "A plain-language guide to Beyblade X product lines and how they affect customization.",
    content:
      "BX, UX, and CX are useful labels, but they should not be treated as automatic power rankings. They describe product direction more than guaranteed performance.\n\nBX is the basic Beyblade X line. It introduces many foundational parts, including important attack, stamina, defense, and balance releases. Many BX parts remain useful because simple shapes can be easier to understand, test, and customize.\n\nUX stands for Unique Line. These releases usually highlight a stronger identity, special gimmick, or more focused performance idea. UX parts can be powerful, but they still need the right Ratchet and Bit to turn their gimmick into a consistent win condition.\n\nCX is the Custom Line. It expands customization by making the Blade itself more modular. This is exciting for collectors and competitive players because it creates more build paths, but it also means testing becomes more important. A CX setup that looks strong on paper may need several part swaps before it becomes tournament-ready.\n\nUse the product line as a map, not a final answer. The best BeyVerse approach is to test the actual Blade, Ratchet, Bit, stadium behavior, and matchup data together.",
    published_at: "2026-05-27"
  },
  {
    id: "guide-attack-stamina-defense",
    slug: "attack-defense-stamina-balance-types",
    title: "Attack, Defense, Stamina, and Balance Types",
    category: "Beginner Strategy",
    excerpt: "Understand the four main Beyblade roles before building combos.",
    content:
      "Every Beyblade type is a shortcut for understanding its most natural win condition. Attack wants to end the battle quickly. Defense wants to survive heavy contact. Stamina wants to keep spinning longer. Balance tries to combine two or more of those ideas.\n\nAttack types need movement and contact. They often use aggressive Bits and lower setups to reach the opponent quickly. Their weakness is that missed attacks cost stamina. A strong attack combo is not just fast; it must reach the opponent at the right time.\n\nDefense types are built to take hits. They often prefer stable shapes, safer Bits, and setups that avoid unnecessary movement. Their challenge is pressure. If a defense combo only survives but cannot outspin or counter, it may still lose.\n\nStamina types focus on efficiency. They try to avoid bad contact, preserve spin, and win late. Their biggest danger is being knocked out before stamina matters. A good stamina build needs enough stability to survive early attacks.\n\nBalance types are the most flexible but also the easiest to misunderstand. A real balance combo should still have a primary plan. The backup plan is what makes it flexible; the primary plan is what makes it dangerous.",
    published_at: "2026-05-30"
  },
  {
    id: "guide-ratchet-height",
    slug: "ratchet-height-guide",
    title: "Ratchet Height Guide",
    category: "Parts Guide",
    excerpt: "How low, mid, and tall Ratchets change contact, stability, and risk.",
    content:
      "Ratchet height changes how a combo makes contact. In Beyblade X, this can affect attack angles, burst risk, stamina stability, and how easily the combo gets destabilized.\n\nLow Ratchets such as 1-60, 3-60, 5-60, and 9-60 are popular because they keep the combo compact. Attack builds often like low height because they can make direct contact and reduce exposure. Stamina and balance builds also use low Ratchets when they want safer, more stable movement.\n\nMid-height Ratchets such as 5-70 and 9-70 can be useful when a combo needs a little more clearance. They may help certain Bits move properly or help a Blade avoid awkward scraping. The tradeoff is that they can expose more of the combo to hits.\n\nTall Ratchets such as 3-80, 4-80, 5-80, 9-80, and 3-85 are useful for experiments, defense ideas, and specific stamina plans. They can also become easier to destabilize if the opponent lands clean upward or side contact.\n\nThe best Ratchet is not always the lowest or newest one. Choose height based on the Blade's shape, Bit behavior, and matchup. If you change only the Ratchet and the combo suddenly loses less often, you found a real tuning point.",
    published_at: "2026-06-01"
  },
  {
    id: "guide-testing-method",
    slug: "how-to-test-beyblade-combos",
    title: "How to Test Beyblade Combos Properly",
    category: "Testing Method",
    excerpt: "A simple testing system for turning casual battles into useful data.",
    content:
      "Good combo testing is boring in the best way. It repeats the same conditions enough times that your results become useful instead of random.\n\nStart with one question. For example: can Phoenix Wing 9-60GF beat Wizard Rod stamina builds often enough to justify the risk? If you test too many questions at once, the results become confusing.\n\nRun sets of ten battles. Keep the same stadium, launchers, launch order, and matchup. Switch launch order after a set if you want to reduce player-side bias. Record win type: knockout, spin finish, burst, or self-KO. A combo with many self-KOs may have high power but low reliability.\n\nChange one part at a time. If you swap the Blade, Ratchet, and Bit together, you will not know which change mattered. Try one Ratchet swap first. Then try one Bit swap. This makes your notes more valuable.\n\nAfter testing, write a short conclusion. Do not just write 'good' or 'bad'. Write when it is good. A combo might be excellent into stamina, average into defense, and risky into attack. That kind of detail is what turns BeyVerse from a list into a real encyclopedia.",
    published_at: "2026-06-03"
  },
  {
    id: "guide-beginner-attack-combos",
    slug: "best-attack-combos-for-beginners",
    title: "Best Attack Combos for Beginners",
    category: "Beginner Strategy",
    excerpt: "Simple attack combo ideas that teach speed, contact timing, and launch control.",
    content:
      "Beginner attack combos should teach control before they chase maximum power. A combo that knocks itself out often may look exciting, but it will not help a new player understand why a battle was won or lost.\n\nStart with a strong attack Blade, a low Ratchet, and a Bit that moves quickly but still gives you a chance to aim. Dran Sword, Shark Edge, Phoenix Wing, Dran Buster, and Impact Drake are useful attack examples because they clearly show how contact timing changes results.\n\nFor the Ratchet, low options such as 3-60, 5-60, 9-60, or 1-60 are easy to understand. They keep the combo compact and make direct contact more likely. For the Bit, Flat and Low Flat are more aggressive, while Rush, Point, or Gear Flat can teach different styles of attack movement.\n\nA good beginner test is simple: launch the same attack combo ten times against a stamina setup. Count how often it gets an early knockout, how often it misses, and how often it self-KOs. If the combo wins only when the opponent makes a mistake, adjust the launch before blaming the parts.",
    published_at: "2026-06-04"
  },
  {
    id: "guide-beginner-stamina-combos",
    slug: "best-stamina-combos-for-beginners",
    title: "Best Stamina Combos for Beginners",
    category: "Beginner Strategy",
    excerpt: "How to build stamina combos that survive early hits and win late.",
    content:
      "Stamina combos are often easier to understand than attack combos, but they are not automatic wins. A stamina build must survive the opening, avoid bad movement, and preserve spin long enough for its advantage to matter.\n\nStart with a Blade that has smooth contact and good stability. Wizard Rod, Wizard Arrow, Silver Wolf, Ghost Circle, Phoenix Rudder, and Wolf Hunt are examples of stamina-leaning ideas that can teach efficient movement. Pair them with Ratchets that keep the combo safe, such as 9-60, 5-70, 9-70, or 9-80.\n\nBits such as Ball, Orb, Disk Ball, Free Ball, Gear Ball, and Low Orb can help stamina builds stay calm. The choice depends on whether you need more center control, more spin time, or more resistance to being pushed around.\n\nWhen testing stamina, do not only ask whether it wins by spin finish. Ask whether it survives attack, whether it gets destabilized, and whether it loses because the launch was too weak. The best beginner stamina combo is one that teaches consistency, not one that wins only in a perfect quiet battle.",
    published_at: "2026-06-05"
  },
  {
    id: "guide-choose-bit",
    slug: "how-to-choose-a-beyblade-x-bit",
    title: "How to Choose a Beyblade X Bit",
    category: "Parts Guide",
    excerpt: "Bits decide movement, stamina behavior, and how your combo uses the Xtreme line.",
    content:
      "The Bit is one of the most important choices in Beyblade X because it decides how the combo moves. Two combos with the same Blade and Ratchet can behave completely differently if the Bit changes.\n\nAttack Bits such as Flat, Low Flat, Rush, Gear Flat, Low Rush, and Under Flat create speed and pressure. They are useful when your win condition is knockout, but they can spend stamina quickly. If your attack combo misses too often, the Bit may be too wild for the launch style.\n\nStamina Bits such as Ball, Orb, Disk Ball, Free Ball, Gear Ball, and Low Orb usually move more calmly. They help preserve spin, but they may not create enough pressure to stop an opponent from setting up safely.\n\nDefense and balance Bits such as Needle, High Needle, Hexa, Point, Taper, Wedge, and Trans Point can be used to tune risk. They may not be the most extreme choice, but they can make a combo easier to control and more consistent across matchups.\n\nChoose the Bit after you know the combo's job. If the combo needs early contact, choose movement. If it needs to survive, choose stability. If it needs to adapt, choose a Bit that can change behavior during the battle.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-choose-ratchet",
    slug: "how-to-choose-a-beyblade-x-ratchet",
    title: "How to Choose a Beyblade X Ratchet",
    category: "Parts Guide",
    excerpt: "A practical way to choose Ratchet height and shape for your combo plan.",
    content:
      "A Ratchet is easy to overlook because it does not move as visibly as the Bit, but it changes height, exposure, contact angles, and how the combo handles pressure.\n\nLow Ratchets are usually the safest starting point. Options such as 3-60, 5-60, 9-60, 1-60, and 2-60 keep the combo compact. Attack players like low setups for direct contact, while stamina and balance players like them because they reduce unnecessary exposure.\n\nMid Ratchets such as 5-70, 9-70, and 3-70 are useful when the combo needs slightly more height or better clearance. They can help certain Bits behave more naturally, but they may also change how the Blade receives hits.\n\nTall Ratchets such as 3-80, 4-80, 5-80, 9-80, and 3-85 should be tested carefully. They can support defense or stamina experiments, but they may become easier to tilt or destabilize.\n\nWhen choosing a Ratchet, change only the Ratchet during testing. If the combo suddenly becomes more stable or more dangerous, the Ratchet was doing real work. That is the kind of detail worth recording in your BeyVerse notes.",
    published_at: "2026-06-07"
  },
  {
    id: "guide-tier-list-reading",
    slug: "how-to-read-a-beyblade-tier-list",
    title: "How to Read a Beyblade Tier List",
    category: "Meta Guide",
    excerpt: "Use tier lists as testing maps instead of absolute truth.",
    content:
      "A tier list is a snapshot of testing, not a permanent law. It can help you decide what to test first, but it should never replace your own results.\n\nS-tier usually means a combo or part has strong performance across many matchups. That does not mean it wins every battle. It means the option is worth respecting and preparing for. A-tier options may be very strong but more matchup dependent. B-tier options can still win in the right hands or local meta.\n\nThe most useful tier lists explain why something is ranked. Does it win by knockout? Does it survive attack? Does it dominate stamina mirrors? Without notes, a tier list becomes a popularity chart instead of a testing tool.\n\nLocal environment matters. Your stadium, launch strength, available parts, and opponent habits can make a lower-ranked combo perform better than expected. Use tier lists to ask smarter questions, then answer those questions through repeated battles.",
    published_at: "2026-06-08"
  },
  {
    id: "guide-combo-builder-mistakes",
    slug: "common-combo-builder-mistakes",
    title: "Common Combo Builder Mistakes",
    category: "Combo Theory",
    excerpt: "Avoid the most common mistakes when building custom Beyblade X combos.",
    content:
      "The most common combo building mistake is chasing the highest overall score without understanding how the combo actually wins. A balanced-looking score can hide a weak plan.\n\nMistake one is mixing parts with opposite goals. A very aggressive Blade on a very passive Bit may become inconsistent unless the player knows exactly why that pairing works. Mistake two is ignoring height. A Ratchet change can turn a stable combo into one that scrapes, tilts, or exposes itself to bad contact.\n\nMistake three is judging too quickly. A combo that loses three times may still be good if the launch was wrong. A combo that wins three times may still be bad if the opponent made mistakes. Testing needs enough battles to show patterns.\n\nMistake four is copying a combo without copying the launch. In Beyblade X, movement and Xtreme line timing matter. If you use a strong combo with the wrong launch pattern, it may feel weaker than it really is.\n\nThe fix is simple: build around one primary win condition, test one change at a time, and write down how the combo wins or loses.",
    published_at: "2026-06-09"
  },
  {
    id: "guide-maintain-parts",
    slug: "how-to-maintain-beyblade-parts",
    title: "How to Maintain Beyblade Parts",
    category: "Care Guide",
    excerpt: "Keep parts clean, legal, and consistent for better testing results.",
    content:
      "Part condition matters. A dirty Bit, worn contact point, or damaged Ratchet can change how a combo performs. If you want useful test results, your parts need to be consistent.\n\nKeep Bits clean and dry. Dust or small debris can change movement, especially on Bits that rely on smooth contact with the stadium. Wipe parts gently with a dry soft cloth after play. Avoid harsh chemicals that may damage plastic or rubber-like surfaces.\n\nInspect Ratchets for cracks or unusual wear. A Ratchet that no longer locks properly can make testing unreliable and may create safety issues. If a part feels loose, compare it with another copy before using it for serious testing.\n\nStore Beyblades separately when possible. Throwing all parts together in a bag can scratch surfaces and make it harder to find damage. A simple organizer box is enough for most players.\n\nMaintenance is not about making parts perform better than intended. It is about keeping them clean, safe, and consistent so your battles reflect the combo, not random part condition.",
    published_at: "2026-06-10"
  },
  {
    id: "guide-buying-guide",
    slug: "beginner-buying-guide-for-beyblade-x",
    title: "Beginner Buying Guide for Beyblade X",
    category: "Buying Guide",
    excerpt: "How new players can choose first purchases without buying random parts.",
    content:
      "A good beginner collection should cover roles, not just favorite designs. Before buying many releases, try to own at least one attack option, one stamina option, one defense or balance option, and a few useful Ratchets and Bits.\n\nAttack releases teach movement and knockout timing. Stamina releases teach spin preservation and safe launches. Defense releases teach survival and impact control. Balance releases teach tuning and adaptation. Having all four roles makes practice more useful.\n\nAvoid buying only based on tier lists. A strong competitive part may not help if you do not understand how to launch or tune it. It is often better to buy a small set of useful parts and test them deeply than to buy many releases and never learn their behavior.\n\nFor a first upgrade path, focus on variety: a low Ratchet, a stable Ratchet, an attack Bit, a stamina Bit, and a balance Bit. That gives you enough pieces to learn why combos behave differently.\n\nThe best purchase is the one that helps you play more, test more, and understand your own style. BeyVerse can guide choices, but your local battles should shape the final decision.",
    published_at: "2026-06-11"
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

function descriptionFor(name: string, type: Beyblade["type"], series: BeyRecord["series"]) {
  const intro = `${name} is a ${type.toLowerCase()}-type Beyblade X release from the ${series}.`;
  const detail = {
    Attack:
      "It is best understood as a pressure tool: the goal is to create meaningful contact early, force the opponent out of position, and convert speed into a knockout before stamina becomes a problem.",
    Defense:
      "Its main value is control. The build should be tested around impact resistance, safe movement, and whether it can survive the opening attacks long enough to win by stability or spin.",
    Stamina:
      "It rewards calm launches and efficient movement. The most important testing question is whether it can avoid early knockouts and preserve enough spin to win the late game.",
    Balance:
      "It gives players a flexible platform for tuning. The strongest setups usually choose one primary plan, then use secondary traits to cover bad matchups."
  }[type];
  return `${intro} ${detail}`;
}
