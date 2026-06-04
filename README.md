# BeyVerse

Everything About Beyblade In One Universe.

BeyVerse is a Next.js 15, TypeScript, TailwindCSS, Shadcn-style UI, Supabase, Vercel, and GitHub-ready Beyblade encyclopedia website with AdSense-safe monetization support.

## Features

- Home page with hero, search, latest Beyblades, guides, combos, tier preview, ad space, and updates
- Beyblade database and detail pages
- Parts database and detail pages
- Combo Builder for Blade, Ratchet, and Bit scoring
- Strategy Guides with article ad slots
- Meta Tier List
- Anime Lore
- Search page
- Admin Dashboard UI with demo add, edit, and delete interactions
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

NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ENABLE_ADS=false
```

Keep `NEXT_PUBLIC_ENABLE_ADS=false` until AdSense approval. The site reserves clean ad spaces without rendering broken ads.

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql`.
5. Copy the project URL and anon key into `.env.local`.
6. The included admin page demonstrates add, edit, and delete workflows in-browser. Protect `/admin` with Supabase Auth before wiring those actions to production database writes.

Tables included:

- `beyblades`
- `parts`
- `combos`
- `guides`
- `characters`
- `tier_lists`

## AdSense Setup

1. Replace `ca-pub-XXXXXXXXXXXXXXXX` in `.env.local`, Vercel, and `public/ads.txt`.
2. Keep `NEXT_PUBLIC_ENABLE_ADS=false` while applying for approval.
3. After approval, set `NEXT_PUBLIC_ENABLE_ADS=true` in Vercel production environment variables.
4. Replace demo ad slot names with real AdSense slot IDs:
   - Homepage top banner
   - Homepage middle banner
   - Article top ad
   - Article middle ad
   - Article bottom ad
   - Sidebar ad
   - Beyblade detail page ad
   - Parts detail page ad

The site intentionally uses restrained ad placement because AdSense approval depends on original content, clear navigation, and a good user experience.

## GitHub Push Instructions

```bash
git init
git add .
git commit -m "Initial BeyVerse website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/beyverse.git
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
8. After deployment, update your Supabase Auth settings and allowed URLs to include the Vercel domain.

## Recommended Production Next Steps

- Connect all database pages to Supabase queries instead of demo data.
- Add Supabase Auth and role checks for `/admin`.
- Add protected server actions or route handlers for create, edit, and delete operations.
- Replace placeholder policy text with legally reviewed Privacy and Terms pages.
- Add original long-form guide content before submitting to Google AdSense.
