import type { Beyblade, Character, Combo, Guide, Part, TierListItem } from "@/types/database";

type BeyRecord = {
  code: string;
  name: string;
  series: "Basic Line" | "Unique Line" | "Custom Line" | "X-Over Project" | "Event Release" | "Hasbro Release";
  type: Beyblade["type"];
  release: string;
  weight?: number;
};

type PartRecord = {
  code: string;
  name: string;
  category: Part["category"];
  system: "Basic Line" | "Unique Line" | "Custom Line" | "X-Over Project" | "Hasbro Release";
  role: Beyblade["type"];
};

const catalogUpdated = "2026-06-19";

const beyRecords: BeyRecord[] = [
  { code: "BXG-01", name: "Dranzer Spiral 3-80T", series: "X-Over Project", type: "Balance", release: "2023-07-15" },
  { code: "BX-00", name: "Driger Slash 4-80P", series: "X-Over Project", type: "Balance", release: "2024-04-27" },
  { code: "BX-00", name: "Lightning L-Drago 1-60F", series: "X-Over Project", type: "Attack", release: "2024-09-14" },
  { code: "BX-00", name: "Lightning L-Drago 1-60R", series: "X-Over Project", type: "Attack", release: "2024-09-14" },
  { code: "UX-00", name: "Xeno Xcalibur 3-60GF", series: "X-Over Project", type: "Attack", release: "2025-03-21" },
  { code: "BX-00", name: "Rock Leone 5-70WB", series: "X-Over Project", type: "Defense", release: "2025-12-27" },
  { code: "BX-00", name: "Dragoon Storm 4-60RA", series: "X-Over Project", type: "Attack", release: "2026-05-23" },
  { code: "BX-00", name: "Storm Pegasus 3-70RA", series: "X-Over Project", type: "Attack", release: "2026-07-18" },
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
  { code: "BX-48", name: "Cobalt Dragoon 9-80F", series: "Basic Line", type: "Attack", release: "2026-02-14" },
  { code: "BX-48", name: "Shark Edge 4-70E", series: "Basic Line", type: "Attack", release: "2026-02-14" },
  { code: "BX-48", name: "Mammoth Tusk 7-60S", series: "Basic Line", type: "Defense", release: "2026-02-14" },
  { code: "BX-48", name: "Hells Scythe 3-85GB", series: "Basic Line", type: "Balance", release: "2026-02-14" },
  { code: "BX-48", name: "Dran Buster 2-80Q", series: "Basic Line", type: "Attack", release: "2026-02-14" },
  { code: "BX-49", name: "Dran Strike 4-50FF", series: "Basic Line", type: "Attack", release: "2026-05-16" },
  { code: "BX-50", name: "Hells Reaper T4-70K", series: "Basic Line", type: "Attack", release: "2026-07-18" },
  { code: "BX-50", name: "Shark Scale 3-60F", series: "Basic Line", type: "Attack", release: "2026-07-18" },
  { code: "BX-50", name: "Dran Dagger 4-55GU", series: "Basic Line", type: "Balance", release: "2026-07-18" },
  { code: "BX-50", name: "Mammoth Tusk 7-60Z", series: "Basic Line", type: "Defense", release: "2026-07-18" },
  { code: "BX-00", name: "Samurai Steel 5-70GF", series: "Event Release", type: "Attack", release: "2025-06-15" },
  { code: "BX-00", name: "Storm Spriggan 2-70M", series: "X-Over Project", type: "Balance", release: "2026-03-28", weight: 40.7 },
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
  { code: "UX-19", name: "Bullet Griffon H", series: "Unique Line", type: "Balance", release: "2026-04-25" },
  { code: "UX-20", name: "Glory Valkyrie 4-70V", series: "Unique Line", type: "Attack", release: "2026-07-18" },
  { code: "UX-00", name: "Samurai Saber 5-60K", series: "Event Release", type: "Balance", release: "2026-06-13" },
  { code: "CX-01", name: "Dran Brave S6-60V", series: "Custom Line", type: "Attack", release: "2025-03-29" },
  { code: "CX-02", name: "Wizard Arc R4-55LO", series: "Custom Line", type: "Stamina", release: "2025-03-29" },
  { code: "CX-03", name: "Perseus Dark B6-80W", series: "Custom Line", type: "Balance", release: "2025-03-29" },
  { code: "CX-07", name: "Pegasus Blast ATr", series: "Custom Line", type: "Attack", release: "2025-07-19" },
  { code: "CX-08", name: "Cerberus Flame W5-80WB", series: "Custom Line", type: "Defense", release: "2025-07-19" },
  { code: "CX-09", name: "Sol Eclipse D5-70TK", series: "Custom Line", type: "Balance", release: "2025-09-27" },
  { code: "CX-10", name: "Wolf Hunt F0-60DB", series: "Custom Line", type: "Stamina", release: "2025-11-01" },
  { code: "CX-12", name: "Phoenix Flare Z9-80WW", series: "Custom Line", type: "Defense", release: "2026-01-24" },
  { code: "CX-13", name: "Bahamut Blitz BK1-50I", series: "Custom Line", type: "Attack", release: "2026-03-28", weight: 48.1 },
  { code: "CX-14", name: "Knight Fortress GV8-70UN", series: "Custom Line", type: "Defense", release: "2026-03-28", weight: 47.4 },
  { code: "CX-15", name: "Ragna Rage FE4-55Y", series: "Custom Line", type: "Stamina", release: "2026-03-28", weight: 47.6 },
  { code: "CX-17", name: "Unicorn Delta PO3-60GU", series: "Custom Line", type: "Balance", release: "2026-04-25", weight: 46.3 },
  { code: "CX-17", name: "Unicorn Delta PO1-80GR", series: "Custom Line", type: "Balance", release: "2026-04-25" },
  { code: "CX-17", name: "Tyranno Beat 3-60N", series: "Custom Line", type: "Attack", release: "2026-04-25" },
  { code: "CX-17", name: "Crimson Garuda 7-80GU", series: "Custom Line", type: "Balance", release: "2026-04-25" },
  { code: "CX-18", name: "Brachio Whip OW5-70Nr", series: "Custom Line", type: "Stamina", release: "2026-06-13" },
  { code: "CX-16", name: "Heavens Ring T4-80HN", series: "Custom Line", type: "Defense", release: "2026-07-18" },
  { code: "BX-00", name: "Iron Man 4-80B", series: "Event Release", type: "Stamina", release: "2025-04-26", weight: 41.1 },
  { code: "BX-00", name: "Thanos 4-60P", series: "Event Release", type: "Balance", release: "2025-04-26" },
  { code: "BX-00", name: "Spider-Man 3-60F", series: "Event Release", type: "Stamina", release: "2025-04-26", weight: 33.2 },
  { code: "BX-00", name: "Venom 3-80N", series: "Event Release", type: "Defense", release: "2025-04-26" },
  { code: "BX-00", name: "Luke Skywalker 4-80B", series: "Event Release", type: "Stamina", release: "2025-04-26" },
  { code: "BX-00", name: "Darth Vader 4-60P", series: "Event Release", type: "Balance", release: "2025-04-26" },
  { code: "BX-00", name: "The Mandalorian 3-60F", series: "Event Release", type: "Attack", release: "2025-04-26", weight: 38.9 },
  { code: "BX-00", name: "Moff Gideon 3-80N", series: "Event Release", type: "Defense", release: "2025-04-26" },
  { code: "BX-00", name: "Optimus Prime 4-60P", series: "Event Release", type: "Balance", release: "2025-05-17" },
  { code: "BX-00", name: "Megatron 4-80B", series: "Event Release", type: "Stamina", release: "2025-05-17" },
  { code: "CX-00", name: "Optimus Primal B4-60SB", series: "Event Release", type: "Defense", release: "2025-10-25" },
  { code: "CX-00", name: "Starscream B6-80TB", series: "Event Release", type: "Balance", release: "2025-10-25" },
  { code: "CX-00", name: "Eva Arc B0-70E", series: "Event Release", type: "Defense", release: "2026-08-29" },
  { code: "CX-00", name: "Eva Brave A1-70V", series: "Event Release", type: "Attack", release: "2026-08-29" },
  { code: "CX-00", name: "Eva Brush T2-70A", series: "Event Release", type: "Balance", release: "2026-08-29" },
  { code: "F9580", name: "Sword Dran 3-60F", series: "Hasbro Release", type: "Attack", release: "2024-06-01" },
  { code: "F9581", name: "Helm Knight 3-80N", series: "Hasbro Release", type: "Defense", release: "2024-06-01" },
  { code: "F9582", name: "Arrow Wizard 4-80B", series: "Hasbro Release", type: "Stamina", release: "2024-06-01" },
  { code: "F9583", name: "Scythe Incendio 4-60T", series: "Hasbro Release", type: "Balance", release: "2024-06-01" },
  { code: "G0184", name: "Lance Knight 4-80HN", series: "Hasbro Release", type: "Defense", release: "2024-07-01" },
  { code: "G0193", name: "Claw Leon 5-60P", series: "Hasbro Release", type: "Balance", release: "2024-07-01" },
  { code: "G0188", name: "Steel Samurai 4-80T", series: "Hasbro Release", type: "Balance", release: "2024-06-01" },
  { code: "G0192", name: "Horn Rhino 3-80S", series: "Hasbro Release", type: "Defense", release: "2024-06-01" },
  { code: "G0194", name: "Keel Shark 3-60LF", series: "Hasbro Release", type: "Attack", release: "2024-06-01" },
  { code: "G0195", name: "Talon Ptera 3-80B", series: "Hasbro Release", type: "Stamina", release: "2024-06-01" },
  { code: "G0283", name: "Sting Unicorn 5-60GP", series: "Hasbro Release", type: "Balance", release: "2024-07-01" },
  { code: "G0284", name: "Roar Tyranno 9-60GF", series: "Hasbro Release", type: "Attack", release: "2024-07-01" },
  { code: "G1536", name: "Buster Dran 1-60A", series: "Hasbro Release", type: "Attack", release: "2024-12-01" },
  { code: "G1537", name: "Wand Wizard 5-70DB", series: "Hasbro Release", type: "Stamina", release: "2024-12-01" },
  { code: "G1538", name: "Wand Wizard 1-60R", series: "Hasbro Release", type: "Stamina", release: "2025-03-07" },
  { code: "G1539", name: "Shadow Shinobi 1-80MN", series: "Hasbro Release", type: "Defense", release: "2025-03-07" },
  { code: "G1751", name: "Buster Dran 5-70DB", series: "Hasbro Release", type: "Attack", release: "2025-03-07" },
  { code: "G1752", name: "Hammer Incendio 3-70H", series: "Hasbro Release", type: "Attack", release: "2025-03-07" },
  { code: "G1673", name: "Scarlet Garuda 4-70TP", series: "Hasbro Release", type: "Balance", release: "2025-06-01" },
  { code: "G1674", name: "Sterling Wolf 3-80FB", series: "Hasbro Release", type: "Stamina", release: "2025-06-01" },
  { code: "G1675", name: "Shelter Drake 7-80GP", series: "Hasbro Release", type: "Balance", release: "2025-08-01" },
  { code: "G1676", name: "Rock Golem 1-60UN", series: "Hasbro Release", type: "Defense", release: "2025-08-01" },
  { code: "G1677", name: "Courage Dran S 6-60V", series: "Hasbro Release", type: "Attack", release: "2025-06-01" },
  { code: "G1678", name: "Reaper Incendio T 4-70K", series: "Hasbro Release", type: "Balance", release: "2025-06-01" },
  { code: "G1679", name: "Arc Wizard R 4-55LO", series: "Hasbro Release", type: "Stamina", release: "2025-06-01" },
  { code: "G1680", name: "Dark Perseus B 6-80W", series: "Hasbro Release", type: "Balance", release: "2025-06-01" },
  { code: "G1681", name: "Brush Fox J 9-70GR", series: "Hasbro Release", type: "Balance", release: "2025-08-01" },
  { code: "G1682", name: "Fort Hornet R 7-60T", series: "Hasbro Release", type: "Defense", release: "2025-08-01" },
  { code: "G1683", name: "Wriggle Kraken S 3-85O", series: "Hasbro Release", type: "Stamina", release: "2025-08-01" },
  { code: "G1684", name: "Antler Stag B 2-60HN", series: "Hasbro Release", type: "Defense", release: "2025-08-01" },
  { code: "G2738", name: "Stun Medusa 9-60GB", series: "Hasbro Release", type: "Balance", release: "2026-01-30" },
  { code: "G2739", name: "Rudder Phoenix 4-70LF", series: "Hasbro Release", type: "Stamina", release: "2026-01-30" },
  { code: "G2740", name: "Feather Phoenix 2-60N", series: "Hasbro Release", type: "Defense", release: "2026-01-30" },
  { code: "G2746", name: "Reaper Rhino C 4-55D", series: "Hasbro Release", type: "Defense", release: "2026-01-30" },
  { code: "G2747", name: "Flame Cerberus W 5-80WB", series: "Hasbro Release", type: "Defense", release: "2026-01-30" },
  { code: "G2748", name: "Fang Leon T 4-60U", series: "Hasbro Release", type: "Balance", release: "2026-01-30" },
  { code: "G2731", name: "Scale Shark 4-50UF", series: "Hasbro Release", type: "Attack", release: "2026-01-30" },
  { code: "G2732", name: "Shelter Drake 5-70O", series: "Hasbro Release", type: "Balance", release: "2026-01-30" },
  { code: "G2733", name: "Gust Bat 3-85GP", series: "Hasbro Release", type: "Balance", release: "2026-04-01" },
  { code: "G2734", name: "Curse Mummy 7-55W", series: "Hasbro Release", type: "Defense", release: "2026-04-01" },
  { code: "G2735", name: "Savage Bear 5-60F", series: "Hasbro Release", type: "Attack", release: "2026-04-01" },
  { code: "G3392", name: "Ridge Triceratops 9-80GN", series: "Hasbro Release", type: "Defense", release: "2026-01-30" },
  { code: "G3611", name: "Buster Dran 5-70DB Booster", series: "Hasbro Release", type: "Attack", release: "2026-04-01" },
  { code: "F9584", name: "Dranzer Spiral 3-80T Red", series: "Hasbro Release", type: "Balance", release: "2024-06-01" },
  { code: "G2218", name: "Draciel Shield 7-60D", series: "Hasbro Release", type: "Defense", release: "2026-01-01" },
  { code: "G2742", name: "Strike Dran 4-50FF", series: "Hasbro Release", type: "Attack", release: "2026-07-15" },
  { code: "G4561", name: "Rocket Griffon H", series: "Hasbro Release", type: "Balance", release: "2026-07-15" },
  { code: "G4562", name: "Rage Ragna FE 4-55Y", series: "Hasbro Release", type: "Stamina", release: "2026-07-15" },
  { code: "G4563", name: "Armor Knight GV 8-70UN", series: "Hasbro Release", type: "Defense", release: "2026-07-15" },
  { code: "G4572", name: "Blitz Bahamut BK 1-50I", series: "Hasbro Release", type: "Attack", release: "2026-07-15" }
];

const partRecords: PartRecord[] = [
  { code: "BX-00", name: "Dranzer Spiral", category: "Blade", system: "X-Over Project", role: "Balance" },
  { code: "BX-00", name: "Driger Slash", category: "Blade", system: "X-Over Project", role: "Balance" },
  { code: "BX-00", name: "Lightning L-Drago", category: "Blade", system: "X-Over Project", role: "Attack" },
  { code: "UX-00", name: "Xeno Xcalibur", category: "Blade", system: "X-Over Project", role: "Attack" },
  { code: "BX-00", name: "Rock Leone", category: "Blade", system: "X-Over Project", role: "Defense" },
  { code: "BX-00", name: "Dragoon Storm", category: "Blade", system: "X-Over Project", role: "Attack" },
  { code: "BX-00", name: "Storm Pegasus", category: "Blade", system: "X-Over Project", role: "Attack" },
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
  { code: "BX-48", name: "Mammoth Tusk", category: "Blade", system: "Basic Line", role: "Defense" },
  { code: "BX-49", name: "Dran Strike", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-50", name: "Heavens Ring", category: "Blade", system: "Basic Line", role: "Defense" },
  { code: "BX-50", name: "Hells Reaper", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-00", name: "Storm Spriggan", category: "Blade", system: "X-Over Project", role: "Balance" },
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
  { code: "UX-19", name: "Bullet Griffon", category: "Blade", system: "Unique Line", role: "Balance" },
  { code: "UX-20", name: "Glory Valkyrie", category: "Blade", system: "Unique Line", role: "Attack" },
  { code: "CX-01", name: "Dran Brave", category: "Blade", system: "Custom Line", role: "Attack" },
  { code: "CX-02", name: "Wizard Arc", category: "Blade", system: "Custom Line", role: "Stamina" },
  { code: "CX-03", name: "Perseus Dark", category: "Blade", system: "Custom Line", role: "Balance" },
  { code: "CX-07", name: "Pegasus Blast", category: "Blade", system: "Custom Line", role: "Attack" },
  { code: "CX-08", name: "Cerberus Flame", category: "Blade", system: "Custom Line", role: "Defense" },
  { code: "CX-09", name: "Sol Eclipse", category: "Blade", system: "Custom Line", role: "Balance" },
  { code: "CX-10", name: "Wolf Hunt", category: "Blade", system: "Custom Line", role: "Stamina" },
  { code: "CX-12", name: "Phoenix Flare", category: "Blade", system: "Custom Line", role: "Defense" },
  { code: "CX-13", name: "Bahamut Blitz", category: "Blade", system: "Custom Line", role: "Attack" },
  { code: "CX-14", name: "Knight Fortress", category: "Blade", system: "Custom Line", role: "Defense" },
  { code: "CX-15", name: "Ragna Rage", category: "Blade", system: "Custom Line", role: "Stamina" },
  { code: "CX-17", name: "Unicorn Delta", category: "Blade", system: "Custom Line", role: "Balance" },
  { code: "CX-17", name: "Tyranno Beat", category: "Blade", system: "Custom Line", role: "Attack" },
  { code: "CX-18", name: "Brachio Whip", category: "Blade", system: "Custom Line", role: "Stamina" },
  { code: "CX-00", name: "Optimus Primal", category: "Blade", system: "Custom Line", role: "Defense" },
  { code: "CX-00", name: "Starscream", category: "Blade", system: "Custom Line", role: "Balance" },
  { code: "BX-00", name: "Iron Man", category: "Blade", system: "Basic Line", role: "Stamina" },
  { code: "BX-00", name: "Thanos", category: "Blade", system: "Basic Line", role: "Balance" },
  { code: "BX-00", name: "Spider-Man", category: "Blade", system: "Basic Line", role: "Stamina" },
  { code: "BX-00", name: "Venom", category: "Blade", system: "Basic Line", role: "Defense" },
  { code: "BX-00", name: "Luke Skywalker", category: "Blade", system: "Basic Line", role: "Stamina" },
  { code: "BX-00", name: "Darth Vader", category: "Blade", system: "Basic Line", role: "Balance" },
  { code: "BX-00", name: "The Mandalorian", category: "Blade", system: "Basic Line", role: "Attack" },
  { code: "BX-00", name: "Moff Gideon", category: "Blade", system: "Basic Line", role: "Defense" },
  { code: "BX-00", name: "Optimus Prime", category: "Blade", system: "Basic Line", role: "Balance" },
  { code: "BX-00", name: "Megatron", category: "Blade", system: "Basic Line", role: "Stamina" },
  { code: "CX-00", name: "Eva Arc", category: "Blade", system: "Custom Line", role: "Defense" },
  { code: "CX-00", name: "Eva Brave", category: "Blade", system: "Custom Line", role: "Attack" },
  { code: "CX-00", name: "Eva Brush", category: "Blade", system: "Custom Line", role: "Balance" },
  { code: "F9580", name: "Sword Dran", category: "Blade", system: "Hasbro Release", role: "Attack" },
  { code: "F9581", name: "Helm Knight", category: "Blade", system: "Hasbro Release", role: "Defense" },
  { code: "F9582", name: "Arrow Wizard", category: "Blade", system: "Hasbro Release", role: "Stamina" },
  { code: "F9583", name: "Scythe Incendio", category: "Blade", system: "Hasbro Release", role: "Balance" },
  { code: "G0194", name: "Keel Shark", category: "Blade", system: "Hasbro Release", role: "Attack" },
  { code: "G0195", name: "Talon Ptera", category: "Blade", system: "Hasbro Release", role: "Stamina" },
  { code: "G0284", name: "Roar Tyranno", category: "Blade", system: "Hasbro Release", role: "Attack" },
  { code: "G1537", name: "Wand Wizard", category: "Blade", system: "Hasbro Release", role: "Stamina" },
  { code: "G1674", name: "Sterling Wolf", category: "Blade", system: "Hasbro Release", role: "Stamina" },
  { code: "G1675", name: "Shelter Drake", category: "Blade", system: "Hasbro Release", role: "Balance" },
  { code: "G2738", name: "Stun Medusa", category: "Blade", system: "Hasbro Release", role: "Balance" },
  { code: "G2739", name: "Rudder Phoenix", category: "Blade", system: "Hasbro Release", role: "Stamina" },
  { code: "G2740", name: "Feather Phoenix", category: "Blade", system: "Hasbro Release", role: "Defense" },
  { code: "G1677", name: "Courage Dran", category: "Blade", system: "Hasbro Release", role: "Attack" },
  { code: "G1678", name: "Reaper Incendio", category: "Blade", system: "Hasbro Release", role: "Balance" },
  { code: "G1679", name: "Arc Wizard", category: "Blade", system: "Hasbro Release", role: "Stamina" },
  { code: "G1680", name: "Dark Perseus", category: "Blade", system: "Hasbro Release", role: "Balance" },
  { code: "G1681", name: "Brush Fox", category: "Blade", system: "Hasbro Release", role: "Balance" },
  { code: "G1682", name: "Fort Hornet", category: "Blade", system: "Hasbro Release", role: "Defense" },
  { code: "G1683", name: "Wriggle Kraken", category: "Blade", system: "Hasbro Release", role: "Stamina" },
  { code: "G1684", name: "Antler Stag", category: "Blade", system: "Hasbro Release", role: "Defense" },
  { code: "G2733", name: "Gust Bat", category: "Blade", system: "Hasbro Release", role: "Balance" },
  { code: "G2734", name: "Curse Mummy", category: "Blade", system: "Hasbro Release", role: "Defense" },
  { code: "G2735", name: "Savage Bear", category: "Blade", system: "Hasbro Release", role: "Attack" },
  { code: "G3392", name: "Ridge Triceratops", category: "Blade", system: "Hasbro Release", role: "Defense" },
  { code: "G2218", name: "Draciel Shield", category: "Blade", system: "Hasbro Release", role: "Defense" },
  { code: "G4561", name: "Rocket Griffon", category: "Blade", system: "Hasbro Release", role: "Balance" },
  { code: "G4562", name: "Rage Ragna", category: "Blade", system: "Hasbro Release", role: "Stamina" },
  { code: "G4563", name: "Armor Knight", category: "Blade", system: "Hasbro Release", role: "Defense" },
  { code: "G4572", name: "Blitz Bahamut", category: "Blade", system: "Hasbro Release", role: "Attack" },
  ...[
    "0-60", "0-70", "0-80", "1-50", "1-60", "1-70", "1-80", "2-60", "2-70", "2-80", "3-60", "3-70", "3-80", "3-85",
    "4-50", "4-55", "4-60", "4-70", "4-80", "5-60", "5-70", "5-80", "6-60", "6-70", "6-80", "7-55", "7-60",
    "8-70", "9-60", "9-65", "9-70", "9-80", "B0-70", "A1-70", "T2-70", "M-85"
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
    ["TK", "Trans Kick", "Balance"], ["Op", "Operate", "Balance"], ["FF", "Final Flat", "Attack"], ["I", "Ignition", "Attack"],
    ["WW", "Wave Wide", "Defense"], ["Y", "Yielding", "Stamina"], ["Nr", "Narrow", "Stamina"], ["GU", "Gear Unite", "Balance"],
    ["Q", "Quake", "Attack"]
  ].map(([code, name, role]): PartRecord => ({ code, name, category: "Bit", system: "Basic Line", role: role as Beyblade["type"] }))
];

export const beyblades: Beyblade[] = beyRecords.map((record, index) => {
  const parts = splitCombo(record.name);
  const profile = beyProfileFor(record.name);
  return {
    id: `${record.code.toLowerCase()}-${index}`,
    slug: slugify(record.name),
    name: record.name,
    product_code: record.code,
    series: `Beyblade X ${record.series}`,
    type: record.type,
    weight: record.weight ?? estimateBeyWeight(record.type, record.series),
    release_date: record.release,
    image_url: `/beyblades/${slugify(record.name)}.svg`,
    description: profile?.description ?? descriptionFor(record.name, record.type, record.series),
    strengths: profile?.strengths ?? strengthsFor(record.type),
    weaknesses: profile?.weaknesses ?? weaknessesFor(record.type),
    recommended_combos: profile?.combos ?? [record.name, `${parts.blade} 9-60 ${parts.bit}`, `${parts.blade} 5-70 ${parts.bit}`],
    anime_info: profile?.animeInfo ?? `${record.name} belongs to the Beyblade X era. Add episode-specific lore and character usage notes as your content library grows. Catalog checked ${catalogUpdated}.`
  };
});

export const parts: Part[] = dedupeParts(partRecords).map((record, index) => ({
  id: `${record.category.toLowerCase()}-${slugify(record.name)}-${index}`,
  slug: slugify(record.name),
  name: record.name,
  category: record.category,
  weight: estimatePartWeight(record),
  description: partDescriptionFor(record),
  advantages: partAdvantagesFor(record),
  disadvantages: partDisadvantagesFor(record),
  recommended_uses: partUsesFor(record),
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
      "BX, UX, and CX are useful labels, but they should not be treated as automatic power rankings. They describe product direction more than guaranteed performance.\n\nBX is the basic Beyblade X line. It introduces many foundational parts, including important attack, stamina, defense, and balance releases. Many BX parts remain useful because simple shapes can be easier to understand, test, and customize.\n\nUX stands for Unique Line. These releases usually highlight a stronger identity, special gimmick, or more focused performance idea. UX parts can be powerful, but they still need the right Ratchet and Bit to turn their gimmick into a consistent win condition.\n\nCX is the Custom Line. It expands customization by making the Blade itself more modular. This is exciting for collectors and competitive players because it creates more build paths, but it also means testing becomes more important. A CX setup that looks strong on paper may need several part swaps before it becomes tournament-ready.\n\nUse the product line as a map, not a final answer. The best BEYBUKU approach is to test the actual Blade, Ratchet, Bit, stadium behavior, and matchup data together.",
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
      "Good combo testing is boring in the best way. It repeats the same conditions enough times that your results become useful instead of random.\n\nStart with one question. For example: can Phoenix Wing 9-60GF beat Wizard Rod stamina builds often enough to justify the risk? If you test too many questions at once, the results become confusing.\n\nRun sets of ten battles. Keep the same stadium, launchers, launch order, and matchup. Switch launch order after a set if you want to reduce player-side bias. Record win type: knockout, spin finish, burst, or self-KO. A combo with many self-KOs may have high power but low reliability.\n\nChange one part at a time. If you swap the Blade, Ratchet, and Bit together, you will not know which change mattered. Try one Ratchet swap first. Then try one Bit swap. This makes your notes more valuable.\n\nAfter testing, write a short conclusion. Do not just write 'good' or 'bad'. Write when it is good. A combo might be excellent into stamina, average into defense, and risky into attack. That kind of detail is what turns BEYBUKU from a list into a real encyclopedia.",
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
      "A Ratchet is easy to overlook because it does not move as visibly as the Bit, but it changes height, exposure, contact angles, and how the combo handles pressure.\n\nLow Ratchets are usually the safest starting point. Options such as 3-60, 5-60, 9-60, 1-60, and 2-60 keep the combo compact. Attack players like low setups for direct contact, while stamina and balance players like them because they reduce unnecessary exposure.\n\nMid Ratchets such as 5-70, 9-70, and 3-70 are useful when the combo needs slightly more height or better clearance. They can help certain Bits behave more naturally, but they may also change how the Blade receives hits.\n\nTall Ratchets such as 3-80, 4-80, 5-80, 9-80, and 3-85 should be tested carefully. They can support defense or stamina experiments, but they may become easier to tilt or destabilize.\n\nWhen choosing a Ratchet, change only the Ratchet during testing. If the combo suddenly becomes more stable or more dangerous, the Ratchet was doing real work. That is the kind of detail worth recording in your BEYBUKU notes.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-tier-list-reading",
    slug: "how-to-read-a-beyblade-tier-list",
    title: "How to Read a Beyblade Tier List",
    category: "Meta Guide",
    excerpt: "Use tier lists as testing maps instead of absolute truth.",
    content:
      "A tier list is a snapshot of testing, not a permanent law. It can help you decide what to test first, but it should never replace your own results.\n\nS-tier usually means a combo or part has strong performance across many matchups. That does not mean it wins every battle. It means the option is worth respecting and preparing for. A-tier options may be very strong but more matchup dependent. B-tier options can still win in the right hands or local meta.\n\nThe most useful tier lists explain why something is ranked. Does it win by knockout? Does it survive attack? Does it dominate stamina mirrors? Without notes, a tier list becomes a popularity chart instead of a testing tool.\n\nLocal environment matters. Your stadium, launch strength, available parts, and opponent habits can make a lower-ranked combo perform better than expected. Use tier lists to ask smarter questions, then answer those questions through repeated battles.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-combo-builder-mistakes",
    slug: "common-combo-builder-mistakes",
    title: "Common Combo Builder Mistakes",
    category: "Combo Theory",
    excerpt: "Avoid the most common mistakes when building custom Beyblade X combos.",
    content:
      "The most common combo building mistake is chasing the highest overall score without understanding how the combo actually wins. A balanced-looking score can hide a weak plan.\n\nMistake one is mixing parts with opposite goals. A very aggressive Blade on a very passive Bit may become inconsistent unless the player knows exactly why that pairing works. Mistake two is ignoring height. A Ratchet change can turn a stable combo into one that scrapes, tilts, or exposes itself to bad contact.\n\nMistake three is judging too quickly. A combo that loses three times may still be good if the launch was wrong. A combo that wins three times may still be bad if the opponent made mistakes. Testing needs enough battles to show patterns.\n\nMistake four is copying a combo without copying the launch. In Beyblade X, movement and Xtreme line timing matter. If you use a strong combo with the wrong launch pattern, it may feel weaker than it really is.\n\nThe fix is simple: build around one primary win condition, test one change at a time, and write down how the combo wins or loses.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-maintain-parts",
    slug: "how-to-maintain-beyblade-parts",
    title: "How to Maintain Beyblade Parts",
    category: "Care Guide",
    excerpt: "Keep parts clean, legal, and consistent for better testing results.",
    content:
      "Part condition matters. A dirty Bit, worn contact point, or damaged Ratchet can change how a combo performs. If you want useful test results, your parts need to be consistent.\n\nKeep Bits clean and dry. Dust or small debris can change movement, especially on Bits that rely on smooth contact with the stadium. Wipe parts gently with a dry soft cloth after play. Avoid harsh chemicals that may damage plastic or rubber-like surfaces.\n\nInspect Ratchets for cracks or unusual wear. A Ratchet that no longer locks properly can make testing unreliable and may create safety issues. If a part feels loose, compare it with another copy before using it for serious testing.\n\nStore Beyblades separately when possible. Throwing all parts together in a bag can scratch surfaces and make it harder to find damage. A simple organizer box is enough for most players.\n\nMaintenance is not about making parts perform better than intended. It is about keeping them clean, safe, and consistent so your battles reflect the combo, not random part condition.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-buying-guide",
    slug: "beginner-buying-guide-for-beyblade-x",
    title: "Beginner Buying Guide for Beyblade X",
    category: "Buying Guide",
    excerpt: "A practical first-purchase plan covering stadiums, launchers, roles, useful parts, and common buying mistakes.",
    content:
      "The best first Beyblade X purchase is not automatically the newest or highest-ranked release. A useful beginner setup needs a stadium, dependable launchers, and enough different parts to teach attack, stamina, defense, and balance. Buying around those roles gives you more useful practice than buying several products that all behave the same way.\n\nStart with the stadium. Beyblade X is designed around the Xtreme Line, so a proper X stadium matters more than a large collection of Blades. A different stadium can change rail speed, knockout frequency, and the value of aggressive Bits. If two players will battle regularly, make sure the set includes two compatible launchers or budget for a second launcher.\n\nYour first attack option should make early contact easy to understand. Dran Sword, Phoenix Wing, Shark Edge, and Dran Buster are clear examples, but they demand different levels of control. Dran Sword is a friendly teaching choice. Phoenix Wing offers heavier pressure. Shark Edge and Dran Buster can be more punishing when the launch angle is wrong.\n\nYour first stamina option should give attack combos something meaningful to test against. Wizard Arrow is simple, while Wizard Rod and Silver Wolf are stronger reference points for late-game spin. A stamina purchase is useful even if you prefer attack because it becomes the benchmark that teaches whether your attack setup is actually reliable.\n\nAdd one defense or balance option after that. Knight Shield and Knight Mail demonstrate survival and center control. Hells Scythe and Unicorn Sting help explain flexible movement. These releases are valuable because they show that winning is not only about speed or spin time; stability and matchup planning matter too.\n\nPart variety is more important than owning many similar stock combos. Try to collect at least one low Ratchet such as 3-60, 5-60, or 9-60; one mid-height option such as 5-70 or 9-70; an attack Bit such as Flat or Rush; a stamina Bit such as Ball or Orb; and a flexible Bit such as Point or Taper. That small pool already creates several meaningful experiments.\n\nTakara Tomy and Hasbro names can differ, so check the actual Blade, Ratchet, and Bit before buying. Sword Dran and Dran Sword may point to closely related products, while Wand Wizard and Wizard Rod use different regional naming. Product codes and stock combinations are more dependable than a listing title alone.\n\nAvoid buying only from tier lists. Competitive rankings change with rules, releases, stadium conditions, and player skill. A highly ranked part may be frustrating if you do not own the launcher, Ratchet, Bit, or practice time needed to use it properly. A smaller, balanced collection usually teaches more.\n\nA sensible beginner plan is: buy one stadium set, add one release from a missing role, then play at least twenty battles before purchasing again. Write down what your collection cannot currently test. Your next purchase should fill that gap rather than duplicate a part you already understand.\n\nBefore ordering, verify whether the product is a starter, booster, random booster, set, recolor, or collaboration release. Confirm seller reliability and packaging condition, especially for collector products. BEYBUKU can help compare names and parts, but availability and pricing should always be checked with current local retailers.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-2026-release-watch",
    slug: "beyblade-x-2026-release-watch",
    title: "Beyblade X 2026 Release Watch",
    category: "Release Watch",
    excerpt: "A BEYBUKU watchlist for 2026 Beyblade X releases, random boosters, and parts worth tracking.",
    content:
      "The 2026 Beyblade X release cycle is moving quickly, so BEYBUKU tracks new releases as a living catalog instead of treating the database as finished. The biggest recent updates are the Expand Blade era, new CX random boosters, and limited or event versions that can be easy to miss.\n\nFor Basic Line coverage, BX-48 Random Booster Vol. 9 is important because it brings several usable stock combinations back into circulation, including Cobalt Dragoon 9-80F, Shark Edge 4-70E, Mammoth Tusk 7-60S, Hells Scythe 3-85GB, and Dran Buster 2-80Q. These are not all brand-new blades, but they matter for collectors and testing because they introduce different Ratchet and Bit pairings.\n\nBX-49 Dran Strike 4-50FF is one of the most important new attack-focused entries to track. Its low Ratchet and fast Bit profile make it useful for players who want repeated pressure, but it still needs launch testing to separate real knockout reliability from raw speed.\n\nFor Unique Line coverage, UX-19 Bullet Griffon H adds a newer balance-style direction, while the Samurai Saber 5-60K Samurai Blue version is notable as a themed event release. Event releases should be marked clearly because they may be harder to find and may not represent the same buying priority as standard boosters or starters.\n\nFor Custom Line coverage, CX-17 Random Booster Vol. 10 is especially important because Unicorn Delta PO3-60GU is a prize Beyblade with a mode-oriented balance identity. CX-18 Brachio Whip OW5-70Nr is also worth watching because it adds another stamina-focused Custom Line entry after the early 2026 CX wave of Bahamut Blitz, Knight Fortress, and Ragna Rage.\n\nThe best way to use this watchlist is to treat it as a research queue. Add the product to the database first, then improve each page with original testing notes, launch behavior, matchup observations, and real images when available. That approach keeps BEYBUKU useful for readers while staying safer for SEO and AdSense than copying descriptions from another wiki.",
    published_at: "2026-06-05"
  },
  {
    id: "guide-best-beginner-combos",
    slug: "best-beyblade-x-combos-for-beginners",
    title: "Best Beyblade X Combos for Beginners",
    category: "Beginner Strategy",
    excerpt: "Simple Beyblade X combo ideas that teach attack, defense, stamina, and balance without overwhelming new players.",
    content:
      "The best beginner combo is not always the strongest combo on a tier list. A beginner combo should teach one clear idea: attack pressure, defense survival, stamina control, or balance tuning.\n\nFor attack, start with Dran Sword 3-60F, Phoenix Wing 9-60GF, or Dran Buster 1-60A. These combos make it easy to see whether your launch creates early contact. If the Beyblade circles without touching the opponent, adjust angle before changing parts.\n\nFor stamina, Wizard Rod 5-70DB, Wizard Arrow 4-80B, and Silver Wolf 3-80FB are useful learning points. They teach smooth launches, safe positioning, and the importance of surviving the first attack.\n\nFor defense, Knight Shield 3-80N and Knight Mail 3-85BS help players learn why survival is only half the plan. A defensive combo still needs enough stability or stamina to win after it absorbs contact.\n\nFor balance, Unicorn Sting 5-60GP and Hells Scythe 4-60T are good starting points. They are useful because new players can feel how one part change shifts movement, safety, and pressure. Test one change at a time and write down how each combo wins.",
    published_at: "2026-06-05"
  },
  {
    id: "guide-best-defense-combos",
    slug: "best-beyblade-x-defense-combos",
    title: "Best Beyblade X Defense Combos",
    category: "Combo Guide",
    excerpt: "Build defense combos around survival, low recoil, and enough late-game value to finish battles.",
    content:
      "Defense combos are built to survive pressure, but survival alone is not enough. A good Beyblade X defense combo must absorb attack, avoid unstable movement, and still have a way to win by spin, counter contact, or opponent stamina loss.\n\nKnight Shield 5-60N is a simple teaching setup for center control. It helps players understand why calmer movement can punish attack combos that overcommit. Knight Mail 3-85BS is more experimental because the tall setup can create defensive presence, but it also needs testing for destabilization risk.\n\nDefense players should test against real attack benchmarks such as Phoenix Wing, Shark Edge, Dran Buster, and Impact Drake. Do not only count wins. Record how often the defense combo survives the first ten seconds, how often it gets knocked out, and whether it loses by spin finish afterward.\n\nUseful defense tuning usually starts with the Ratchet. Lower Ratchets can reduce exposure, while taller Ratchets may help specific contact plans but increase tilt risk. Bits such as Needle, High Needle, Hexa, Orb, and Bound Spike should be compared one at a time.\n\nThe best defense combo for your local meta is the one that survives common attack patterns without becoming helpless in the late game.",
    published_at: "2026-06-05"
  },
  {
    id: "guide-build-strong-combo",
    slug: "how-to-build-a-strong-beyblade-x-combo",
    title: "How to Build a Strong Beyblade X Combo",
    category: "Combo Theory",
    excerpt: "A practical step-by-step framework for choosing Blade, Ratchet, Bit, and launch plan.",
    content:
      "A strong Beyblade X combo starts with a win condition, not with random strong parts. Before choosing pieces, decide how the combo should win: knockout, spin finish, defense survival, or flexible balance pressure.\n\nChoose the Blade first because it creates the main contact identity. Attack Blades need ways to reach the opponent early. Stamina Blades need stability and low wasted movement. Defense Blades need to survive contact. Balance Blades need one primary plan plus a useful backup.\n\nChoose the Ratchet second. Low Ratchets often reduce exposure and support compact setups. Mid Ratchets can add clearance. Tall Ratchets can support experiments but should be tested carefully because they may increase destabilization risk.\n\nChoose the Bit last because it decides movement. Flat-style Bits create pressure but burn stamina. Ball-style Bits preserve spin but may lack threat. Point, Taper, Orb, Needle, and Gear-style Bits can shift the combo between safety and movement.\n\nAfter building, test one matchup at a time. Run repeated rounds, record win type, and change only one part between tests. That is how a random build becomes a real combo.",
    published_at: "2026-06-05"
  },
  {
    id: "guide-best-tier-list-2026",
    slug: "best-beyblade-x-tier-list-2026",
    title: "Best Beyblade X Tier List 2026",
    category: "Meta Guide",
    excerpt: "How to use the 2026 Beyblade X tier list as a testing map instead of a fixed rulebook.",
    content:
      "A Beyblade X tier list is most useful when it explains what to test next. S-tier entries are not unbeatable; they are strong references that other combos should be tested against.\n\nFor 2026 testing, Phoenix Wing 9-60GF, Wizard Rod 5-70DB, and Impact Drake 9-60LR are important benchmarks because they represent powerful attack, stamina, and pressure plans. Silver Wolf 3-80FB, Unicorn Sting 5-60GP, and Shark Edge 3-60LF are strong follow-up references for stamina control, balance flexibility, and risky attack.\n\nUse the tier list together with matchup notes. If a combo loses to Phoenix Wing but beats Wizard Rod, that tells you something different than a combo that beats attack but loses every stamina mirror. The win condition matters more than the letter grade alone.\n\nLocal rules, stadium condition, launch style, and part wear can change results. Treat BEYBUKU rankings as fan-made testing references, then confirm them with your own repeated sets.",
    published_at: "2026-06-05"
  },
  {
    id: "guide-collaboration-releases",
    slug: "beyblade-x-collaboration-releases-guide",
    title: "Beyblade X Collaboration Releases Guide",
    category: "Release Watch",
    excerpt: "Track Beyblade X collaboration releases from Marvel, Star Wars, Transformers, Evangelion, and other licensed collections.",
    content:
      "Collaboration releases are special Beyblade X products based on licensed characters, franchises, or event themes. They are important for collectors because they can disappear faster than normal boosters, but players should still judge them by the actual Blade, Ratchet, and Bit combination.\n\nThe Marvel collaboration includes Iron Man 4-80B, Thanos 4-60P, Spider-Man 3-60F, and Venom 3-80N. These releases are best treated as collector-friendly event entries first, then tested like any other stock combo after you confirm the parts and condition.\n\nThe Star Wars collaboration includes Luke Skywalker 4-80B, Darth Vader 4-60P, The Mandalorian 3-60F, and Moff Gideon 3-80N. For BEYBUKU, these pages are useful because many fans search by character name instead of part name, so each collaboration entry needs clean names, codes, and simple role labels.\n\nThe Transformers collaboration includes Optimus Prime 4-60P and Megatron 4-80B. These are useful to separate from regular competitive releases because a collector may care about character theme, packaging, and availability more than tournament priority.\n\nThe Evangelion collaboration is an upcoming CX event set with Eva Arc B0-70E, Eva Brave A1-70V, and Eva Brush T2-70A. Because these are Custom Line style entries, BEYBUKU marks their parts separately so future updates can add more detailed testing notes once the set is available.\n\nThe safest way to cover collaboration Beyblades is to avoid copying promotional text and instead build original notes: release date, stock combo, likely play role, collector status, and whether the parts are new, recolored, or borrowed from another release. That keeps the page useful for readers and healthier for long-term search quality.",
    published_at: "2026-06-05"
  },
  {
    id: "guide-hasbro-release-names",
    slug: "beyblade-x-hasbro-release-names-guide",
    title: "Beyblade X Hasbro Release Names Guide",
    category: "Product Guide",
    excerpt: "Understand Hasbro Beyblade X names, product codes, western releases, and how they relate to Takara Tomy releases.",
    content:
      "Hasbro Beyblade X releases are important for players in western markets because many products use English-localized names. A player may search for Sword Dran, Helm Knight, Arrow Wizard, Scythe Incendio, Keel Shark, Wand Wizard, or Sterling Wolf even when another region uses a different naming style.\n\nBEYBUKU tracks Hasbro entries separately when the product name, product code, or release context is useful for search and collecting. This does not mean every Hasbro entry is a brand-new performance design. Some are localized names, some are alternate releases, and some are western-market packs or boosters.\n\nFor beginners, Hasbro names are often easier to find in stores and online listings. If you are buying locally in the United States, Canada, Australia, or other Hasbro-supported markets, search both the Hasbro name and the Japanese-style name before deciding that a product is missing.\n\nFor collectors, product codes such as F9580, G0194, G1537, G1677, G2738, and G2742 matter because they separate similar-looking releases. BEYBUKU includes these codes so the database can help with checklist building, duplicate checking, and future image updates.\n\nFor competitive players, the name matters less than the actual Blade, Ratchet, and Bit. Always check the stock combo, part condition, and whether the release is a recolor, alternate pack, or distinct part combination before treating it as a new testing priority.",
    published_at: "2026-06-05"
  },
  {
    id: "guide-dran-sword",
    slug: "dran-sword-combo-guide",
    title: "Dran Sword Combo Guide",
    category: "Beyblade Guide",
    excerpt: "How to use Dran Sword for controlled attack pressure and beginner-friendly knockout testing.",
    content:
      "Dran Sword is one of the clearest attack-style Beyblade X Blades for learning how contact timing works. It rewards players who can reach the opponent quickly, but it also punishes launches that waste movement around the stadium.\n\nThe first thing to learn with Dran Sword is control. A new player may want to launch as hard as possible, but too much power can create wide movement with no meaningful contact. Start with a slightly angled launch and watch whether Dran Sword enters the Xtreme line before or after the opponent settles.\n\nFor beginner testing, try Dran Sword 3-60 Flat, Dran Sword 5-60 Rush, and Dran Sword 9-60 Point. Flat teaches raw speed. Rush gives a little more control while keeping pressure. Point turns Dran Sword into an attack-balance experiment that can still threaten knockouts without becoming completely wild.\n\nDran Sword is strongest when it pressures stamina builds before they stabilize. It can struggle when a defense combo absorbs the first hit or when the launch pattern causes a self-KO. If Dran Sword loses often, test launch angle first before changing parts.\n\nA useful testing question is simple: does Dran Sword make contact in the first five seconds? If the answer is no, the combo is not using its main advantage. Tune the Bit, Ratchet, or launch until early contact becomes repeatable.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-phoenix-wing",
    slug: "phoenix-wing-combo-guide",
    title: "Phoenix Wing Best Competitive Combos",
    category: "Beyblade Guide",
    excerpt: "Competitive Phoenix Wing setups for knockout pressure, controlled attack, balance play, and matchup testing.",
    content:
      "Phoenix Wing remains an important Beyblade X attack reference because its weight and contact shape can convert a clean opening into a knockout. Competitive success, however, depends on choosing how much movement the matchup actually needs. Maximum speed is not always maximum reliability.\n\nPhoenix Wing 9-60 Gear Flat is the stock benchmark. Gear Flat can reach the Xtreme Line quickly and create dramatic pressure, making this setup useful for learning explosive attack routes. Its main cost is stamina. Wide movement, missed contact, or repeated rail use can leave Phoenix Wing vulnerable if the battle continues.\n\nPhoenix Wing 5-60 Rush is a more controlled competitive starting point. Rush keeps the attack identity while helping the combo repeat contact attempts with less wasted movement. This setup is useful when Gear Flat produces too many self-KOs or when the opponent survives the first exchange.\n\nPhoenix Wing 9-60 Point creates an attack-balance plan. Point can move aggressively after launch and settle later, giving Phoenix Wing a backup route when the early knockout fails. It may lose some immediate speed compared with Gear Flat, but the improved stability can be valuable across mixed matchups.\n\nPhoenix Wing 3-60 Low Rush is a lower, more direct pressure experiment. The compact height can help it reach certain opponents cleanly, while Low Rush maintains attack movement. Test Ratchet exposure and scraping carefully because a lower setup is not automatically safer in every matchup.\n\nAgainst stamina combinations such as Wizard Rod, Phoenix Wing should create meaningful contact before the opponent settles. A controlled angled launch often performs better than pulling at maximum strength. Record whether the first contact pushes, destabilizes, or completely misses the target.\n\nAgainst defense, avoid spending all of Phoenix Wing's energy on repeated weak impacts. If a defense setup absorbs the opening, Rush or Point may provide better late value than Gear Flat. The goal is to create fewer, cleaner attacks rather than constant movement without conversion.\n\nIn attack mirrors, stadium position and launch timing become critical. A launch that is excellent against a calm stamina opponent may collide badly with another fast attacker. Test both launch orders and separate opponent knockouts from self-KOs when recording results.\n\nFor a useful comparison, run each Phoenix Wing setup through three ten-battle sets: one against stamina, one against defense, and one against attack. Keep the launcher, stadium, and launch order consistent. Record knockout, spin finish, burst, and self-KO separately.\n\nThere is no single best Phoenix Wing combo for every player. Gear Flat maximizes explosive threat, Rush improves repeatability, and Point adds a backup plan. The best competitive choice is the setup whose losses you can understand and reduce through launch practice.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-wizard-rod",
    slug: "wizard-rod-combo-guide",
    title: "Wizard Rod Combo Guide",
    category: "Beyblade Guide",
    excerpt: "Use Wizard Rod as a stamina benchmark for safe launches, late-game spin, and matchup testing.",
    content:
      "Wizard Rod is best understood as a stamina benchmark. When players test a new attack or balance idea, Wizard Rod-style stamina builds are often the kind of opponent they need to prove they can beat.\n\nThe main goal with Wizard Rod is to survive the opening and reach the late game with enough spin to matter. That means the launch should be stable, the Ratchet should not expose the combo unnecessarily, and the Bit should support calm movement.\n\nBeginner-friendly setups include Wizard Rod 9-60 Ball, Wizard Rod 5-70 Orb, and Wizard Rod 9-80 Disk Ball. Ball keeps the idea simple. Orb adds calm center control. Disk Ball or Free Ball-style ideas can be tested when you want to study late-game stamina behavior more deeply.\n\nWizard Rod can do well into passive or inconsistent combos, but it must respect strong attack. If it gets knocked out too often, do not immediately chase more stamina. First ask whether the setup is stable enough to survive the first hit.\n\nThe best way to test Wizard Rod is through matchup notes. Record whether it loses by knockout, destabilization, or spin finish. Each loss type points to a different fix: more stability, safer height, better launch control, or a different Bit.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-shark-edge",
    slug: "shark-edge-combo-guide",
    title: "Shark Edge Combo Guide",
    category: "Beyblade Guide",
    excerpt: "A high-risk attack guide for Shark Edge players who want strong hits without losing control.",
    content:
      "Shark Edge is a high-risk attack Blade. It can create dangerous smash attacks, but the same contact that makes it threatening can also create recoil and missed opportunities.\n\nThe first lesson with Shark Edge is that power needs a target. If the launch sends Shark Edge into the stadium wall before it touches the opponent, the combo is wasting its best chance. Start with controlled aggression before moving into full-power launch testing.\n\nUseful test combos include Shark Edge 3-60 Low Flat, Shark Edge 5-60 Rush, and Shark Edge 1-60 Flat. Low Flat and Flat create strong early pressure, while Rush can make the movement more manageable. If the combo self-KOs too much, Point can be tested as a safer attack-balance option.\n\nShark Edge is most dangerous against combos that need time to settle. It can punish stamina builds that launch too calmly or balance builds that lack early defense. It can struggle against setups that absorb impact or survive the first exchange.\n\nWhen testing Shark Edge, count clean hits separately from wins. Sometimes it loses despite landing strong hits because the recoil is too high. If that happens, adjust the Bit or Ratchet to keep the attack path dangerous but less reckless.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-dran-buster",
    slug: "dran-buster-combo-guide",
    title: "Dran Buster Combo Guide",
    category: "Beyblade Guide",
    excerpt: "How to tune Dran Buster for compact attack, fast finishes, and practical testing.",
    content:
      "Dran Buster is an attack Blade that rewards directness. It should be tested around fast finishes, compact setups, and launch patterns that create meaningful contact before the opponent can settle.\n\nBecause Dran Buster can feel unforgiving, new players should avoid changing too many parts at once. Start with Dran Buster 1-60 Low Flat if you want pure attack testing, then compare it with Dran Buster 3-60 Rush and Dran Buster 5-60 Point. Each setup teaches a different version of attack.\n\nLow Flat gives strong speed and low-angle pressure, but it also increases self-KO risk. Rush can make Dran Buster easier to control while keeping attack identity. Point gives a backup plan if the opening attack does not end the battle immediately.\n\nDran Buster wants opponents to make decisions quickly. Against stamina, it should challenge the setup before the late game. Against defense, it needs clean contact rather than repeated weak hits. Against other attack builds, the better launch often decides the match.\n\nA good Dran Buster test is to run ten battles with the same setup and write down the first contact timing. If first contact happens late, the combo is not using its direct attack identity. If first contact happens early but results are unstable, tune for control rather than more speed.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-best-combos-2026",
    slug: "best-beyblade-x-combos-2026",
    title: "Best Beyblade X Combos 2026",
    category: "Meta Guide",
    excerpt: "A practical 2026 testing list for attack, stamina, defense, and balance combinations across different matchups.",
    content:
      "The best Beyblade X combos in 2026 should be treated as testing references, not guaranteed winners. Stadium condition, launch skill, local rules, part wear, and the opponent's setup can change results. A useful list explains what each combo is trying to do and where it can fail.\n\nPhoenix Wing 5-60 Rush is a strong controlled-attack reference. Phoenix Wing provides heavy contact, while Rush reduces some of the wasted movement associated with more extreme Bits. Test it against stamina first, then compare its knockout rate and self-KO rate with the stock Gear Flat setup.\n\nImpact Drake 9-60 Low Rush is another serious pressure option. It can punish combinations that need time to settle, but it should be tested carefully into defense and other attack builds. The important question is whether its early movement creates repeatable contact rather than occasional dramatic wins.\n\nWizard Rod 9-60 Ball is a simple stamina benchmark. The low Ratchet helps keep the setup compact, while Ball provides calm movement and efficient spin. Attack combos that cannot threaten this reference consistently may need better launch timing or a more aggressive Bit.\n\nSilver Wolf 9-60 Free Ball is useful for stamina-control testing. Free Ball can support late-game efficiency, but the setup still needs to survive early pressure. Compare it with Wizard Rod to learn whether your local matchups reward smoother spin, greater stability, or a different contact shape.\n\nKnight Mail 9-60 Hexa is a defense experiment designed to survive attack without using the tall stock configuration. Hexa can improve controlled resistance, while the lower Ratchet reduces exposure. Its weakness is late-game efficiency, so test whether it survives only to lose by spin.\n\nUnicorn Sting 5-60 Point is a practical balance reference. It can create early movement and settle later, giving it more than one win route. The setup is useful for players who want matchup flexibility, but it may lose to specialized attack or stamina if the launch plan is unclear.\n\nShark Edge 3-60 Low Flat remains a high-risk knockout option. Its value comes from clean early contact, not long battles. Record recoil and self-KOs separately. If it lands dangerous hits but loses control, Rush or Point may improve match reliability.\n\nDran Buster 1-60 Low Flat is a compact attack test for players who value direct finishes. It can be unforgiving, so compare it with Dran Buster on Rush before deciding which setup is stronger for you. The more controlled version may produce fewer spectacular wins but better overall results.\n\nA balanced deck should not contain three combos that all lose to the same plan. Choose one reliable attack option, one stamina or control option, and one matchup answer. Check part duplication rules before finalizing a competitive deck.\n\nRun at least ten battles per matchup and switch launch order. Record knockout, burst, spin finish, and self-KO. Update your own ranking when new releases or rules change the environment; a 2026 combo list is a living test map, not a permanent verdict.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-wizard-rod-best-combos-counters",
    slug: "wizard-rod-best-combos-and-counters",
    title: "Wizard Rod Best Combos and Counters",
    category: "Beyblade Guide",
    excerpt: "Build Wizard Rod for stamina and stability, then learn which attack plans can challenge it reliably.",
    content:
      "Wizard Rod is one of the most useful stamina benchmarks in Beyblade X. Its wide circular profile supports efficient late-game spin, so a successful setup must survive the opening without giving away too much stability. Its best counters usually aim to win before that stamina advantage becomes decisive.\n\nWizard Rod 9-60 Ball is the simplest reference build. Ball creates calm movement, while 9-60 keeps the setup lower than the stock 5-70 configuration. This is a good baseline for comparing launch consistency and resistance to destabilization.\n\nWizard Rod 5-70 Disk Ball follows the stock identity more closely. Disk Ball supports stamina and a steady late-game plan, while the 5-70 Ratchet gives moderate height. Test it against low attack combinations to see whether the extra height helps clearance or creates a vulnerable contact angle.\n\nWizard Rod 9-60 Orb is a center-control alternative. Orb can reduce unnecessary travel and help the combination settle safely. It may be useful in matchups where wide Ball movement creates bad contact, but performance should be confirmed in the stadium used for actual play.\n\nWizard Rod 9-80 Free Ball is a taller stamina experiment. Free Ball can support efficient spin, but increased height may make the setup easier to destabilize. This is not automatically better than a lower build; it is a matchup-specific option that needs repeated attack testing.\n\nThe first counter plan is controlled heavy attack. Phoenix Wing on Rush or Point can apply meaningful pressure without spending all its energy immediately. The goal is to hit Wizard Rod before it settles, then maintain enough control to create a second contact chance if the first hit does not finish the battle.\n\nThe second counter plan is low, direct attack. Dran Buster and Shark Edge can use low Ratchets and aggressive Bits to reach Wizard Rod's outer profile. These combinations carry higher self-KO risk, so a successful test should track whether wins come from repeatable contact or lucky stadium exits.\n\nImpact Drake offers another pressure route. Low Rush or Rush can help it create several dangerous approaches. Against Wizard Rod, missed movement is costly, so launch strength should be reduced if the combo repeatedly reaches the rail without making useful contact.\n\nDestabilization is different from pure knockout power. Some attack-balance combinations may not throw Wizard Rod out immediately but can tilt it, force scraping, or disrupt its late-game posture. Point and Taper-style setups are worth testing when pure Flat movement is too inconsistent.\n\nWizard Rod players should respond by changing one variable at a time. If the setup loses by knockout, test lower height or safer launch placement. If it loses by destabilization, compare Bits and Ratchets for better posture. If it loses stamina mirrors, improve launch consistency before changing the entire build.\n\nFor a fair counter test, run at least twenty battles and switch launch order after ten. Record first-contact time, win type, and self-KO rate. A real Wizard Rod counter should win often enough to justify its risks, not merely produce one impressive knockout.",
    published_at: "2026-06-06"
  },
  {
    id: "guide-beat-stamina",
    slug: "how-to-beat-stamina-beyblades",
    title: "How to Beat Stamina Beyblades",
    category: "Matchup Guide",
    excerpt: "Use launch timing, controlled attack, destabilization, and matchup testing to challenge strong stamina combinations.",
    content:
      "Stamina Beyblades are designed to make the late game unfair. If a combination such as Wizard Rod or Silver Wolf settles safely and preserves spin, chasing it around the stadium usually helps the stamina player. The counter plan must create useful pressure early or disrupt stability efficiently.\n\nChoose an attack Blade that can convert contact into movement. Phoenix Wing, Impact Drake, Shark Edge, and Dran Buster are useful examples, but they do not solve the matchup automatically. The Blade must reach the opponent before its own stamina is spent.\n\nControlled attack is often more reliable than maximum speed. Rush and Low Rush can create repeated approach angles without the same level of stamina loss as the wildest Flat-style launches. Point can add a backup route if the first attack fails.\n\nLaunch angle decides whether an attack combo reaches the target. A slight tilt can create a flower pattern that crosses the center repeatedly. Too much tilt may cause scraping or an early self-KO. Start with a small angle and adjust one step at a time.\n\nLaunch strength also needs control. Pulling harder can increase speed, but it can also send the Beyblade around the outer stadium without contact. If your attack combo reaches the Xtreme Line immediately and misses, reduce power or change the angle before swapping parts.\n\nTarget the settling period. Stamina setups are most vulnerable before they establish a calm pattern. Watch the first three to five seconds. If your combo consistently makes first contact after that window, its movement plan is probably too slow or too wide.\n\nDestabilization can be as valuable as a knockout. A hit that tilts the opponent, forces scraping, or pushes it into repeated wall contact may remove enough spin to win later. Attack-balance setups on Point or Taper can sometimes create this pressure more consistently than pure Flat movement.\n\nAvoid solving every loss with a lower Ratchet. Low setups can improve direct contact and reduce exposure, but they can also change the angle of impact or increase scraping. Compare 3-60, 5-60, and 9-60 with the same Blade and Bit so the Ratchet's effect becomes clear.\n\nBuild a stamina benchmark for practice. Wizard Rod 9-60 Ball or a comparable calm setup gives you a consistent target. Test the same attack combination for ten rounds, then change only the Bit or launch angle. Randomly changing all three parts hides the real cause of improvement.\n\nRecord failure modes, not only wins. Separate clean knockouts, destabilization wins, spin finishes, missed attacks, and self-KOs. If most losses are self-KOs, tune control. If contact happens but does nothing, test a heavier or sharper attack plan. If contact arrives too late, change movement.\n\nA successful stamina counter does not need a perfect win rate. It needs a clear advantage that survives repeated testing. Choose the setup whose attack path you can reproduce under pressure, then practice it against different stamina heights and Bits.",
    published_at: "2026-06-06"
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
  const typeLabel = `${type.toLowerCase()}-type`;
  const intro = `${name} is ${articleFor(typeLabel)} ${typeLabel} Beyblade X release from ${seriesLabel(series)}.`;
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

function articleFor(value: string) {
  return /^[aeiou]/i.test(value) ? "an" : "a";
}

function seriesLabel(series: BeyRecord["series"] | PartRecord["system"]) {
  if (series === "Hasbro Release") return "Hasbro's western release catalog";
  if (series === "Event Release") return "the special event release catalog";
  if (series === "X-Over Project") return "the X-Over Project";
  return `the ${series}`;
}

function beyProfileFor(name: string) {
  const profiles: Record<string, { description: string; strengths: string[]; weaknesses: string[]; combos: string[]; animeInfo?: string }> = {
    "Dran Sword 3-60F": {
      description:
        "Dran Sword 3-60F is the original Beyblade X attack reference: a three-sided sword-style Blade on a low 3-60 Ratchet and Flat Bit. It is the cleanest entry point for learning rail timing, first contact, and how raw speed becomes reliable pressure only when the launch is controlled.",
      strengths: ["Iconic three-blade attack shape", "Excellent teaching tool for Xtreme line timing", "Low stock setup creates direct early contact"],
      weaknesses: ["Can waste stamina if it circles without contact", "Self-KO risk rises with poor launch angle", "Needs repeated practice against defense and counter-attack"],
      combos: ["Dran Sword 3-60F", "Dran Sword 5-60R", "Dran Sword 9-60P"],
      animeInfo: "Dran Sword is one of the signature early Beyblade X designs and is strongly associated with the attack-focused identity of the X era. Use this page for character, episode, and manga notes as BEYBUKU's lore database grows."
    },
    "Hells Scythe 4-60T": {
      description:
        "Hells Scythe 4-60T is a balanced early BX release that helps players understand controlled movement. It is not only about raw power; its value is in learning stable attack-balance patterns.",
      strengths: ["Flexible movement with Taper", "Useful for learning balance tuning", "Can pressure without becoming too wild"],
      weaknesses: ["May lack finishing power into heavy stamina", "Can feel average if the combo plan is unclear", "Needs part swaps to stay relevant"],
      combos: ["Hells Scythe 4-60T", "Hells Scythe 5-60P", "Hells Scythe 9-60O"]
    },
    "Wizard Arrow 4-80B": {
      description:
        "Wizard Arrow 4-80B is a stamina-focused starter that shows how calm movement and spin preservation work. It is useful for new players who want a safe benchmark before testing stronger releases.",
      strengths: ["Easy stamina behavior to understand", "Good beginner benchmark", "Works well for quiet launch practice"],
      weaknesses: ["Tall 4-80 setup can expose it to destabilization", "Low knockout pressure", "Can struggle into modern heavy attack"],
      combos: ["Wizard Arrow 4-80B", "Wizard Arrow 9-60B", "Wizard Arrow 5-70O"]
    },
    "Knight Shield 3-80N": {
      description:
        "Knight Shield 3-80N is a defense-oriented early BX release built around rounded armor, survival, and center control. It is useful for learning how tall Ratchets change exposure and how Needle-style Bits absorb pressure.",
      strengths: ["Rounded shield identity supports defensive testing", "Good against reckless attack launches", "Needle helps demonstrate center-hold behavior"],
      weaknesses: ["Can be outspun by efficient stamina", "Tall 3-80 height can become a target", "Limited pressure if the opponent avoids contact"],
      combos: ["Knight Shield 3-80N", "Knight Shield 5-60N", "Knight Shield 9-70O"],
      animeInfo: "Knight Shield represents the defensive knight motif in the early Beyblade X lineup. It is useful for lore pages that compare knight-themed releases such as Knight Lance, Knight Mail, and Knight Fortress."
    },
    "Shark Edge 3-60LF": {
      description:
        "Shark Edge 3-60LF is a high-risk attack release with dangerous smash potential. It rewards sharp launch control and punishes players who confuse speed with accuracy.",
      strengths: ["High burst of early pressure", "Strong knockout threat when contact is clean", "Useful for learning risk management"],
      weaknesses: ["Recoil and self-KO risk are real", "Missed attacks lose stamina quickly", "Can be inconsistent for new players"],
      combos: ["Shark Edge 3-60LF", "Shark Edge 5-60R", "Shark Edge 1-60F"]
    },
    "Phoenix Wing 9-60GF": {
      description:
        "Phoenix Wing 9-60GF is a heavy red-and-gold attack benchmark with strong smash pressure and dramatic rail movement. The stock 9-60GF setup can threaten quick knockouts, but it still demands discipline because Gear Flat can overspend stamina if the opening misses.",
      strengths: ["Heavy contact and strong knockout pressure", "Excellent attack testing benchmark", "Can disrupt stamina before it stabilizes"],
      weaknesses: ["Gear Flat can overspend stamina", "Needs clean contact windows", "Can lose reliability if launched too wildly"],
      combos: ["Phoenix Wing 9-60GF", "Phoenix Wing 5-60R", "Phoenix Wing 9-60P"],
      animeInfo: "Phoenix Wing is one of the most recognizable Beyblade X attack designs because of its phoenix color language and heavy contact identity. Keep matchup notes separate from character lore so competitive testing stays clear."
    },
    "Wizard Rod 5-70DB": {
      description:
        "Wizard Rod 5-70DB is a major stamina benchmark built around a wide circular Blade profile and efficient late-game spin. It is one of the most important BEYBUKU references because many attack and balance ideas should be tested by asking: can they reliably beat Wizard Rod?",
      strengths: ["Excellent stamina reference", "Strong late-game identity", "Wide profile helps preserve stable spin"],
      weaknesses: ["Must survive heavy opening contact", "Can be targeted by destabilizing attack", "Needs careful launch consistency"],
      combos: ["Wizard Rod 5-70DB", "Wizard Rod 9-60B", "Wizard Rod 9-80DB"],
      animeInfo: "Wizard Rod is a key stamina reference for the Beyblade X era. BEYBUKU treats it as both a collector entry and a testing benchmark because it shapes how many modern combos are judged."
    },
    "Dran Buster 1-60A": {
      description:
        "Dran Buster 1-60A is a compact Unique Line attack release built for fast finishes. It is best studied through first-contact timing and self-KO tracking.",
      strengths: ["Direct attack identity", "Low setup supports early contact", "Good for aggressive testing"],
      weaknesses: ["Can feel unforgiving", "Needs launch control more than raw power", "May need safer Bits for consistency"],
      combos: ["Dran Buster 1-60A", "Dran Buster 1-60LF", "Dran Buster 5-60P"]
    },
    "Cobalt Dragoon 2-60C": {
      description:
        "Cobalt Dragoon 2-60C is a blue dragon-themed attack release that rewards players who can manage movement, reverse-spin style pressure, and contact timing. It is valuable for studying matchup disruption rather than simple straight-line smash.",
      strengths: ["Dangerous disruption potential", "Good attack testing piece", "Rewards practiced launch angles"],
      weaknesses: ["Can be inconsistent without matchup knowledge", "Needs controlled movement to avoid wasted stamina", "May require several Bit tests"],
      combos: ["Cobalt Dragoon 2-60C", "Cobalt Dragoon 9-60R", "Cobalt Dragoon 5-60P"],
      animeInfo: "Cobalt Dragoon carries the dragon motif into Beyblade X and is important for pages comparing Dragoon-style releases, reverse-spin pressure, and high-skill attack testing."
    },
    "Silver Wolf 3-80FB": {
      description:
        "Silver Wolf 3-80FB is a stamina and control reference with strong late-game potential. It is useful when comparing calm Bits and taller setup behavior.",
      strengths: ["Strong spin-preservation identity", "Good control profile", "Useful stamina benchmark"],
      weaknesses: ["Needs protection from early attack", "Tall setup can be destabilized", "May lose if it cannot settle cleanly"],
      combos: ["Silver Wolf 3-80FB", "Silver Wolf 9-60FB", "Silver Wolf 5-70O"]
    },
    "Impact Drake 9-60LR": {
      description:
        "Impact Drake 9-60LR is an aggressive Unique Line attack release with serious pressure potential. It should be tested by separating clean knockouts from unstable wins.",
      strengths: ["Powerful attack pressure", "Strong benchmark for aggressive combos", "Can punish slow-start stamina"],
      weaknesses: ["Control matters heavily", "Can overshoot if launched poorly", "Needs repeated testing into defense"],
      combos: ["Impact Drake 9-60LR", "Impact Drake 5-60R", "Impact Drake 3-60P"]
    },
    "Unicorn Sting 5-60GP": {
      description:
        "Unicorn Sting 5-60GP is a flexible balance release that works well for players learning how movement changes between pressure and stability.",
      strengths: ["Adaptable balance role", "Good for mixed local metas", "Point-style behavior supports flexible testing"],
      weaknesses: ["Can be outclassed by specialists", "Needs a clear primary plan", "May feel average if tuned too safely"],
      combos: ["Unicorn Sting 5-60GP", "Unicorn Sting 9-60P", "Unicorn Sting 5-70O"]
    },
    "Knight Mail 3-85BS": {
      description:
        "Knight Mail 3-85BS is a defense-leaning Unique Line release for players who want to test survival, impact control, and high setup risk.",
      strengths: ["Good defensive testing profile", "Useful into contact-heavy opponents", "Helps study tall combo behavior"],
      weaknesses: ["Tall height can become unstable", "May lose late against efficient stamina", "Needs matchup-specific tuning"],
      combos: ["Knight Mail 3-85BS", "Knight Mail 9-60HN", "Knight Mail 5-70N"]
    },
    "Phoenix Rudder 9-70G": {
      description:
        "Phoenix Rudder 9-70G shifts the phoenix theme into a calmer stamina-control direction. Compared with Phoenix Wing, the page should be read as a stability and glide study rather than a pure knockout reference.",
      strengths: ["Good stamina-control identity", "Useful comparison point against Phoenix Wing", "Glide-style testing helps study late movement"],
      weaknesses: ["Lower immediate knockout pressure", "Needs safe launch placement", "Can be punished before it settles"],
      combos: ["Phoenix Rudder 9-70G", "Phoenix Rudder 9-60B", "Phoenix Rudder 5-70O"],
      animeInfo: "Phoenix Rudder is useful for lore and collection notes because it shows how one motif can move from aggressive wing pressure into a more controlled stamina idea."
    },
    "Whale Wave 5-80E": {
      description:
        "Whale Wave 5-80E is a stamina release with a water-heavy identity and a wave-like play pattern. It is best tested around whether Elevate-style behavior can preserve spin while avoiding early knockout danger.",
      strengths: ["Strong water-themed stamina identity", "Interesting late-game movement tests", "Good into slower matchups when it stabilizes"],
      weaknesses: ["Can be exposed by direct attack", "Tall 5-80 height needs matchup testing", "Requires launch consistency to avoid wasted movement"],
      combos: ["Whale Wave 5-80E", "Whale Wave 9-60B", "Whale Wave 5-70O"],
      animeInfo: "Whale Wave is a strong candidate for future BEYBUKU theme pages about animal motifs, water-themed releases, and stamina designs that use movement differently from simple Ball setups."
    },
    "Crimson Garuda 4-70TP": {
      description:
        "Crimson Garuda 4-70TP is a balance release with a red bird motif and a flexible movement plan. Trans Point makes it useful for learning when a combo should pressure early and when it should settle into a safer late-game route.",
      strengths: ["Flexible balance behavior", "Bird-wing motif gives it clear collection identity", "Trans Point supports pressure-to-stability testing"],
      weaknesses: ["Can lose to specialists if the plan is unclear", "Needs careful launch strength", "May require part swaps for consistent matchups"],
      combos: ["Crimson Garuda 4-70TP", "Crimson Garuda 9-60P", "Crimson Garuda 5-70O"],
      animeInfo: "Crimson Garuda is useful for BEYBUKU collection notes because it has a clear mythical-bird identity while remaining a practical balance testing platform."
    },
    "Weiss Tiger 3-60U": {
      description:
        "Weiss Tiger 3-60U is a balance release with a white tiger motif and compact low-height tuning. Unite-style behavior gives it room to shift between movement and stability depending on launch style.",
      strengths: ["Compact 3-60 setup", "Tiger motif is easy to distinguish visually", "Unite supports flexible balance testing"],
      weaknesses: ["Can be outpowered by dedicated attack", "Needs a clear role in competitive testing", "May not outspin stronger stamina benchmarks"],
      combos: ["Weiss Tiger 3-60U", "Weiss Tiger 9-60P", "Weiss Tiger 5-60R"],
      animeInfo: "Weiss Tiger is a good entry for future character and motif comparison pages because its animal theme is distinct from dragon, phoenix, shark, and knight releases."
    },
    "Samurai Saber 2-70L": {
      description:
        "Samurai Saber 2-70L is an attack-leaning Unique Line release with a blade-and-samurai identity. It should be tested as a controlled strike platform, especially when comparing Level against more aggressive Flat-style Bits.",
      strengths: ["Sharp samurai blade identity", "Good controlled attack experiments", "Level can create useful movement variety"],
      weaknesses: ["May need a stronger attack Bit for knockout pressure", "Can lose efficiency if over-launched", "Requires comparison against Dran and Phoenix attack benchmarks"],
      combos: ["Samurai Saber 2-70L", "Samurai Saber 9-60R", "Samurai Saber 5-60P"],
      animeInfo: "Samurai Saber is important for BEYBUKU's theme coverage because it gives the X era a clear swordfighter identity separate from dragon-style attack releases."
    },
    "Ghost Circle 0-80GB": {
      description:
        "Ghost Circle 0-80GB is a stamina release built around a smooth circular ghost motif. It is best studied as a late-game spin and stability option, especially when comparing 0-series Ratchets and Gear Ball movement.",
      strengths: ["Smooth circular stamina identity", "Good 0-series Ratchet comparison point", "Gear Ball can help controlled late movement"],
      weaknesses: ["Needs protection from early knockouts", "Tall setup can be destabilized", "Low pressure into passive opponents"],
      combos: ["Ghost Circle 0-80GB", "Ghost Circle 9-60B", "Ghost Circle 5-70O"],
      animeInfo: "Ghost Circle is useful for lore indexing because its visual identity is very different from animal and weapon motifs. Future notes can track character ownership and episode appearances."
    },
    "Golem Rock 1-60UN": {
      description:
        "Golem Rock 1-60UN is a defense release with a stone-armor identity and compact 1-60 setup. It should be tested around impact absorption, wall survival, and whether Under Needle improves stability without giving up too much stamina.",
      strengths: ["Heavy stone motif fits defense testing", "Compact low setup can reduce exposure", "Useful into aggressive local metas"],
      weaknesses: ["Can still be outspun by efficient stamina", "Needs enough weight and control to justify the defense role", "May struggle if the opponent avoids contact"],
      combos: ["Golem Rock 1-60UN", "Golem Rock 9-60HN", "Golem Rock 5-70N"],
      animeInfo: "Golem Rock belongs in BEYBUKU's defensive motif coverage alongside Knight, Rhino, and Shell releases. It is a good page for explaining armor-style design language."
    },
    "Shark Scale 4-50UF": {
      description:
        "Shark Scale 4-50UF is a low-height attack release that continues the shark motif with sharper, lower-pressure tuning. Under Flat should be tested for how quickly it reaches contact and how often that speed becomes self-risk.",
      strengths: ["Low 4-50 setup supports direct contact", "Sharp shark identity is visually clear", "High attack pressure when launched accurately"],
      weaknesses: ["High self-KO risk", "Can burn stamina quickly", "Needs careful launch control into defense"],
      combos: ["Shark Scale 4-50UF", "Shark Scale 3-60R", "Shark Scale 1-60F"],
      animeInfo: "Shark Scale is useful for comparing shark-themed attack evolution from Shark Edge into later, sharper low-height options."
    },
    "Dran Strike 4-50FF": {
      description:
        "Dran Strike 4-50FF is a later Dran attack release with extremely aggressive low-height intent. Final Flat makes it a serious speed test, but the same speed must be controlled or it becomes a liability.",
      strengths: ["Very aggressive Dran-family attack identity", "Low 4-50 setup creates direct contact chances", "Final Flat supports explosive rail pressure"],
      weaknesses: ["Can overshoot and self-KO", "Needs precise launch angle", "May require safer Bits for consistency testing"],
      combos: ["Dran Strike 4-50FF", "Dran Strike 3-60R", "Dran Strike 9-60P"],
      animeInfo: "Dran Strike is important for tracking the Dran attack lineage after Dran Sword, Dran Dagger, Dran Buster, and Dran Brave."
    },
    "Bahamut Blitz BK1-50I": {
      description:
        "Bahamut Blitz BK1-50I is a Custom Line attack release with a dark dragon motif, very low 1-50 setup, and Ignition-style aggression. It should be treated as a high-pressure entry where matchup testing must separate real knockout power from unstable wins.",
      strengths: ["Distinct dark dragon identity", "Low 1-50 setup supports dangerous contact", "Strong attack-pressure testing piece"],
      weaknesses: ["Needs control to avoid self-risk", "Can be matchup-sensitive", "Ignition-style aggression may overspend stamina"],
      combos: ["Bahamut Blitz BK1-50I", "Bahamut Blitz 1-60R", "Bahamut Blitz 9-60P"],
      animeInfo: "Bahamut Blitz is a major BEYBUKU catalog page because of its Custom Line identity, dragon motif, and strong collector interest. Keep official appearance notes separate from competitive testing notes."
    },
    "Knight Fortress GV8-70UN": {
      description:
        "Knight Fortress GV8-70UN is a heavy Custom Line defense release that expands the knight theme into fortress-style armor. It should be tested for survival, burst resistance, and how its taller defensive setup handles modern attack pressure.",
      strengths: ["Heavy fortress defense identity", "Strong knight-line comparison page", "Useful into hard-contact attack testing"],
      weaknesses: ["Tall defensive setups can be destabilized", "May lose late if it cannot preserve spin", "Needs matchup-specific tuning"],
      combos: ["Knight Fortress GV8-70UN", "Knight Fortress 9-60HN", "Knight Fortress 5-70N"],
      animeInfo: "Knight Fortress belongs in the same lore and collection family as Knight Shield, Knight Lance, and Knight Mail, making it useful for theme evolution pages."
    },
    "Ragna Rage FE4-55Y": {
      description:
        "Ragna Rage FE4-55Y is a Custom Line stamina release with a low 4-55 setup and Yielding-style late-game plan. It should be tested against Wizard Rod and Ghost Circle to see whether its stamina route is safer, riskier, or matchup-specific.",
      strengths: ["Clear stamina identity", "Low setup can help reduce exposure", "Good comparison against other late-game benchmarks"],
      weaknesses: ["Can still be knocked out before stamina matters", "Needs calm launch control", "May require stronger defensive tuning into attack"],
      combos: ["Ragna Rage FE4-55Y", "Ragna Rage 9-60B", "Ragna Rage 5-70DB"],
      animeInfo: "Ragna Rage is a strong candidate for BEYBUKU's stamina lineage pages because it gives the Custom Line another late-game testing benchmark."
    },
    "Unicorn Delta PO3-60GU": {
      description:
        "Unicorn Delta PO3-60GU is a Custom Line balance release that extends the unicorn motif into modular tuning. Gear Unite supports mixed movement, making it a good page for explaining how balance builds should still choose one main plan.",
      strengths: ["Flexible Custom Line balance identity", "Unicorn motif is easy to recognize", "Gear Unite supports mixed matchup testing"],
      weaknesses: ["Can become unfocused if tuned too broadly", "May lose to dedicated attack or stamina specialists", "Needs careful part comparison"],
      combos: ["Unicorn Delta PO3-60GU", "Unicorn Delta 9-60P", "Unicorn Delta 5-70O"],
      animeInfo: "Unicorn Delta helps connect the earlier Unicorn Sting identity to the Custom Line era. It is useful for future collection notes on motif evolution and modular Blade systems."
    },
    "Tyranno Beat 3-60N": {
      description:
        "Tyranno Beat 3-60N is an attack-leaning dinosaur-themed release that should be tested for heavy contact and low-height pressure. The stock Needle Bit is unusual for pure attack, so it is worth comparing against Rush, Flat, and Point.",
      strengths: ["Strong dinosaur attack identity", "Low 3-60 setup is easy to test", "Interesting stock contrast between attack Blade and defensive Bit"],
      weaknesses: ["Needle can reduce attack pressure", "May require Bit swaps to unlock aggression", "Can be outspun if it fails to create meaningful contact"],
      combos: ["Tyranno Beat 3-60N", "Tyranno Beat 3-60R", "Tyranno Beat 9-60P"],
      animeInfo: "Tyranno Beat is a useful BEYBUKU entry for dinosaur motif coverage and for explaining why stock combos are not always the only way to judge a Blade."
    },
    "Brachio Whip OW5-70Nr": {
      description:
        "Brachio Whip OW5-70Nr is a stamina-oriented dinosaur release with a long sweeping motif and Narrow Bit testing angle. It should be compared with other stamina options to see whether its movement is safer or too passive.",
      strengths: ["Distinct long-neck dinosaur identity", "Stamina-focused testing role", "Good future page for CX release tracking"],
      weaknesses: ["Limited immediate pressure", "Needs protection from hard attack", "Narrow-style behavior requires careful testing"],
      combos: ["Brachio Whip OW5-70Nr", "Brachio Whip 9-60B", "Brachio Whip 5-70DB"],
      animeInfo: "Brachio Whip is useful for future BEYBUKU dinosaur-theme coverage alongside Tyranno Beat and other prehistoric-inspired releases."
    }
  };

  return profiles[name];
}

function partDescriptionFor(record: PartRecord) {
  if (record.category === "Blade") {
    return `${record.name} is ${articleFor(record.role)} ${record.role.toLowerCase()}-leaning Beyblade X Blade from ${seriesLabel(record.system)}. Use it as the main identity of a combo: the Blade decides contact shape, recoil behavior, and the primary matchup plan.`;
  }

  if (record.category === "Ratchet") {
    return `${record.name} is a Beyblade X Ratchet used to tune height, exposure, and contact angle. Test it by changing only the Ratchet so you can see whether the setup becomes safer, faster, or easier to destabilize.`;
  }

  return `${record.name} is a Beyblade X Bit that controls movement, stamina behavior, and Xtreme line timing. The Bit often changes a combo more visibly than any other part, so test launch style together with the part choice.`;
}

function partAdvantagesFor(record: PartRecord) {
  if (record.category === "Ratchet") return ["Tunes combo height", "Changes contact angle", "Useful for one-change testing"];
  if (record.category === "Bit") return ["Defines movement pattern", "Changes launch feel", "Can shift the whole play style"];
  return strengthsFor(record.role);
}

function partDisadvantagesFor(record: PartRecord) {
  if (record.category === "Ratchet") return ["Wrong height can expose the combo", "May increase scrape or tilt risk", "Needs matchup testing"];
  if (record.category === "Bit") return ["Can waste stamina if mismatched", "Requires launch practice", "May change results by stadium condition"];
  return weaknessesFor(record.role);
}

function partUsesFor(record: PartRecord) {
  if (record.category === "Blade") return [`${record.role} combo core`, "Matchup testing", "Best paired with a matching Ratchet and Bit plan"];
  if (record.category === "Ratchet") return ["Height tuning", "Burst-risk comparison", "Testing one setup change at a time"];
  return ["Movement tuning", "Launch style practice", `${record.role} play style experiments`];
}
