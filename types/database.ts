export type Beyblade = {
  id: string;
  slug: string;
  name: string;
  product_code: string;
  series: string;
  type: "Attack" | "Defense" | "Stamina" | "Balance";
  weight: number;
  weight_status?: "Recorded" | "Estimated" | "Unverified";
  release_date: string;
  image_url: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  recommended_combos: string[];
  anime_info: string;
};

export type Part = {
  id: string;
  slug: string;
  name: string;
  category: "Blade" | "Ratchet" | "Bit";
  weight: number;
  description: string;
  advantages: string[];
  disadvantages: string[];
  recommended_uses: string[];
  attack: number;
  defense: number;
  stamina: number;
  balance: number;
};

export type Guide = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  published_at: string;
};

export type Combo = {
  id: string;
  name: string;
  blade: string;
  ratchet: string;
  bit: string;
  play_style: string;
  rating: number;
};

export type Character = {
  id: string;
  name: string;
  series: string;
  description: string;
  signature_bey: string;
};

export type TierListItem = {
  id: string;
  name: string;
  tier: "S" | "A" | "B" | "C";
  format: string;
  notes: string;
};
