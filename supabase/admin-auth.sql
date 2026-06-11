-- Run once after enabling Supabase Auth for the BEYBUKU admin dashboard.
-- Public read policies remain active. Writes are performed only by the
-- server-side service role after the API verifies the signed-in admin email.

drop policy if exists "Authenticated manage beyblades" on public.beyblades;
drop policy if exists "Authenticated manage parts" on public.parts;
drop policy if exists "Authenticated manage combos" on public.combos;
drop policy if exists "Authenticated manage guides" on public.guides;
drop policy if exists "Authenticated manage characters" on public.characters;
drop policy if exists "Authenticated manage tier lists" on public.tier_lists;
