# BEYBUKU

The Ultimate Beyblade X Encyclopedia.

BEYBUKU is a Next.js 15, TypeScript, TailwindCSS, Shadcn-style UI, Supabase, Vercel, and GitHub-ready Beyblade encyclopedia website with AdSense-safe monetization support.

## Features

- Home page with hero, search, latest Beyblades, guides, combos, tier preview, ad space, and updates
- Beyblade database and detail pages
- Parts database and detail pages
- Combo Builder for Blade, Ratchet, and Bit scoring
- Strategy Guides with article ad slots
- Meta Tier List
- Anime Lore
- Search page
- Admin Dashboard with private-key protected Supabase add, edit, and delete workflows
- Privacy Policy, Terms, Contact, and About pages
- Dynamic metadata, Open Graph tags, sitemap, robots.txt, and structured data
- Google AdSense script placeholder, reusable lazy `AdBanner`, and `public/ads.txt`
- Supabase schema and seed data
- GitHub Actions CI workflow

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_API_KEY=choose-a-private-admin-password

NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ENABLE_ADS=false
```

Keep `NEXT_PUBLIC_ENABLE_ADS=false` until AdSense approval. The site reserves clean ad spaces without rendering broken ads.
Keep `ADMIN_API_KEY` private. You will type this same value in `/admin` before saving or deleting database content.

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql`.
5. Copy the project URL, anon key, and service role key into `.env.local`.
6. Add a private `ADMIN_API_KEY` value locally and in Vercel.
7. Use `/admin` to add, edit, or delete Beyblades, Parts, Guides, and Tier List records.

Tables included:

- `beyblades`
- `parts`
- `combos`
- `guides`
- `characters`
- `tier_lists`

## AdSense Setup

1. In Google AdSense, copy your publisher ID, for example `ca-pub-1234567890123456`.
2. In Vercel environment variables, set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` to that full `ca-pub-...` value.
3. Update `public/ads.txt` with the matching `pub-...` value:

```txt
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

4. Keep `NEXT_PUBLIC_ENABLE_ADS=false` while applying for approval. The site will show clean reserved spaces and will not request broken ads.
5. After AdSense approval, create ad units in AdSense and set the slot IDs in Vercel:
   - `NEXT_PUBLIC_AD_SLOT_HOMEPAGE_TOP`
   - `NEXT_PUBLIC_AD_SLOT_HOMEPAGE_MIDDLE`
   - `NEXT_PUBLIC_AD_SLOT_ARTICLE_TOP`
   - `NEXT_PUBLIC_AD_SLOT_ARTICLE_MIDDLE`
   - `NEXT_PUBLIC_AD_SLOT_ARTICLE_BOTTOM`
   - `NEXT_PUBLIC_AD_SLOT_SIDEBAR`
   - `NEXT_PUBLIC_AD_SLOT_BEYBLADE_DETAIL`
   - `NEXT_PUBLIC_AD_SLOT_PARTS_DETAIL`
6. Set `NEXT_PUBLIC_ENABLE_ADS=true` only after the publisher ID and the needed slot IDs are real.

The site intentionally uses restrained ad placement because AdSense approval depends on original content, clear navigation, and a good user experience.

## GitHub Push Instructions

```bash
git init
git add .
git commit -m "Initial BEYBUKU website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/beybuku.git
git push -u origin main
```

GitHub Actions will run typecheck and build on pushes and pull requests to `main`.

## Vercel Deployment

1. Push the repository to GitHub.
2. In Vercel, choose **Add New Project**.
3. Import the GitHub repository.
4. Framework preset should be **Next.js**.
5. Add environment variables from `.env.example`.
6. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
7. Deploy.
8. After deployment, update your Supabase Auth settings and allowed URLs to include the Vercel domain if you add full login later.

## Recommended Production Next Steps

- Replace the simple `ADMIN_API_KEY` gate with Supabase Auth and role checks when you are ready for multiple editors.
- Replace placeholder policy text with legally reviewed Privacy and Terms pages.
- Add original long-form guide content before submitting to Google AdSense.
