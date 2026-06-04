insert into public.beyblades (slug, name, series, type, weight, release_date, image_url, description, strengths, weaknesses, recommended_combos, anime_info) values
('dran-sword-3-60f', 'Dran Sword 3-60F', 'Beyblade X', 'Attack', 36.80, '2023-07-15', '/placeholder-bey.svg', 'A fast attack-type Beyblade built for aggressive Xtreme Dash movement and early knockouts.', array['Explosive contact power', 'Strong stadium movement', 'Excellent opening pressure'], array['Can self-KO when over-launched', 'Lower stamina in long battles'], array['Dran Sword 3-60F', 'Dran Sword 5-60R'], 'Associated with the high-speed battle style that defines Beyblade X.'),
('hells-scythe-4-60t', 'Hells Scythe 4-60T', 'Beyblade X', 'Balance', 37.20, '2023-07-15', '/placeholder-bey.svg', 'A balanced release with flexible matchups and smooth transitions.', array['Reliable into mixed fields', 'Stable contact shape'], array['Less burst pressure than pure attack builds'], array['Hells Scythe 4-60T', 'Hells Scythe 5-60B'], 'A technical option for bladers who value control.'),
('wizard-arrow-4-80b', 'Wizard Arrow 4-80B', 'Beyblade X', 'Stamina', 34.90, '2023-07-15', '/placeholder-bey.svg', 'A stamina-focused Beyblade designed to preserve spin.', array['Strong late-game spin', 'Calm movement'], array['Vulnerable to heavy smash attacks'], array['Wizard Arrow 4-80B', 'Wizard Arrow 5-60O'], 'Represents patient, precision-driven battling.')
on conflict (slug) do nothing;

insert into public.parts (slug, name, category, weight, description, advantages, disadvantages, recommended_uses, attack, defense, stamina, balance) values
('dran-sword', 'Dran Sword', 'Blade', 34.60, 'An aggressive blade with pronounced contact points.', array['High attack ceiling'], array['Risky recoil'], array['Attack combos'], 9, 4, 3, 5),
('3-60', '3-60', 'Ratchet', 6.30, 'A low-profile ratchet for compact attack builds.', array['Low height'], array['Moderate burst resistance'], array['Attack'], 8, 5, 4, 5),
('flat', 'Flat', 'Bit', 2.20, 'A high-speed bit for wide movement.', array['Fast movement'], array['Lower stamina'], array['Attack launches'], 10, 3, 2, 4),
('hells-scythe', 'Hells Scythe', 'Blade', 35.30, 'A versatile blade with smoother contact.', array['Flexible matchups'], array['Average pure attack'], array['Balance'], 6, 7, 6, 8),
('4-60', '4-60', 'Ratchet', 6.50, 'A standard-height ratchet with good stability.', array['Stable profile'], array['Average specialization'], array['Balance'], 5, 7, 6, 8),
('taper', 'Taper', 'Bit', 2.30, 'A controlled movement bit.', array['Controlled aggression'], array['Lower KO threat than Flat'], array['Balance combos'], 6, 6, 6, 9),
('ball', 'Ball', 'Bit', 2.10, 'A stamina bit with low movement.', array['Long spin time'], array['Can be pushed around'], array['Stamina'], 2, 6, 10, 6)
on conflict (slug) do nothing;

insert into public.guides (slug, title, category, excerpt, content, published_at) values
('launch-control-for-beyblade-x', 'Launch Control for Beyblade X', 'Beginner Strategy', 'How angle, power, and rail timing change your opening pattern.', 'Launch control decides whether an attack combo creates pressure or wastes stamina. Test launch angles and record results.', '2026-01-10'),
('building-balance-combos', 'Building Reliable Balance Combos', 'Combo Theory', 'A practical framework for mixing attack threat with late-game stability.', 'A good balance combo should have one clear win condition and one backup route.', '2026-02-02')
on conflict (slug) do nothing;

insert into public.combos (name, blade, ratchet, bit, play_style, rating) values
('Sword Rush', 'Dran Sword', '3-60', 'Flat', 'Attack', 88),
('Scythe Control', 'Hells Scythe', '4-60', 'Taper', 'Balance', 84),
('Arrow Endurance', 'Hells Scythe', '4-60', 'Ball', 'Stamina', 79);

insert into public.characters (name, series, description, signature_bey) values
('Ekusu Kurosu', 'Beyblade X', 'A high-level blader known for explosive attack patterns.', 'Dran Sword'),
('Multi Nanairo', 'Beyblade X', 'A technical blader whose flexible style highlights part selection.', 'Wizard Arrow');

insert into public.tier_lists (name, tier, format, notes) values
('Dran Sword 3-60F', 'S', 'Beyblade X', 'Elite attack pressure when launch control is consistent.'),
('Hells Scythe 4-60T', 'A', 'Beyblade X', 'Stable balance pick with broad testing value.'),
('Wizard Arrow 4-80B', 'B', 'Beyblade X', 'Good stamina option, but matchup dependent.');
