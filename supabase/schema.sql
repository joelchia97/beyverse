create extension if not exists "pgcrypto";

create table if not exists public.beyblades (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  series text not null,
  type text not null check (type in ('Attack', 'Defense', 'Stamina', 'Balance')),
  weight numeric(6,2),
  release_date date,
  image_url text,
  description text not null,
  strengths text[] not null default '{}',
  weaknesses text[] not null default '{}',
  recommended_combos text[] not null default '{}',
  anime_info text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.parts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null check (category in ('Blade', 'Ratchet', 'Bit')),
  weight numeric(6,2),
  description text not null,
  advantages text[] not null default '{}',
  disadvantages text[] not null default '{}',
  recommended_uses text[] not null default '{}',
  attack int not null default 5 check (attack between 1 and 10),
  defense int not null default 5 check (defense between 1 and 10),
  stamina int not null default 5 check (stamina between 1 and 10),
  balance int not null default 5 check (balance between 1 and 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.combos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  blade text not null,
  ratchet text not null,
  bit text not null,
  play_style text not null,
  rating int not null check (rating between 1 and 100),
  created_at timestamptz not null default now()
);

create table if not exists public.guides (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  excerpt text not null,
  content text not null,
  published_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  series text not null,
  description text not null,
  signature_bey text,
  created_at timestamptz not null default now()
);

create table if not exists public.tier_lists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier text not null check (tier in ('S', 'A', 'B', 'C')),
  format text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.beyblades enable row level security;
alter table public.parts enable row level security;
alter table public.combos enable row level security;
alter table public.guides enable row level security;
alter table public.characters enable row level security;
alter table public.tier_lists enable row level security;

create policy "Public read beyblades" on public.beyblades for select using (true);
create policy "Public read parts" on public.parts for select using (true);
create policy "Public read combos" on public.combos for select using (true);
create policy "Public read guides" on public.guides for select using (true);
create policy "Public read characters" on public.characters for select using (true);
create policy "Public read tier lists" on public.tier_lists for select using (true);

create policy "Authenticated manage beyblades" on public.beyblades for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage parts" on public.parts for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage combos" on public.combos for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage guides" on public.guides for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage characters" on public.characters for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage tier lists" on public.tier_lists for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
