# AL-TAWAKKAL TOURISM — Website

Premium Umrah & Islamic tourism website built with **Next.js 15 (App Router)**, **TypeScript**
and **Tailwind CSS**. Prepared as a demonstration build for the ₹35,000 Standard Website
Development package, and configured to deploy to **Cloudflare Pages** as a fully static
site (no Node server, no Vercel).

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local development server |
| `npm run build` | Type-checks, lints, builds and exports the static site to `./out` |
| `npm run typecheck` | Runs `tsc --noEmit` only |
| `npm run lint` | Runs ESLint only |
| `npm run preview` | Serves the exported `./out` folder locally (verifies the real output) |
| `npm run deploy` | Builds, then uploads `./out` to Cloudflare Pages with Wrangler |

---

## What is included

**Public website**

| Route | Description |
| --- | --- |
| `/` | Hero, four service pillars, trust statistics, featured packages, how-it-works, why-choose-us, FAQ preview, CTA band and an inline enquiry form |
| `/packages` | All packages as cards, plus a side-by-side comparison table |
| `/packages/luxury-umrah` | Package detail page (also `/packages/premium-umrah`, `/packages/economy-umrah`) |
| `/about` | About, mission, why choose us, journey assistance, customer-focused service |
| `/faq` | Filterable FAQ accordion plus a complete numbered list |
| `/contact` | Phone, WhatsApp, email, address, business hours, map placeholder and the enquiry form |
| `*` (404) | Styled not-found page with the full site header and footer |

**Admin dashboard demo** (`/admin`, protected by a front-end-only lock screen)

| Route | Description |
| --- | --- |
| `/admin` | Overview — total packages, total enquiries, new enquiries, pending enquiries |
| `/admin/packages` | Package table with **Add / Edit / Delete** and a full package form |
| `/admin/enquiries` | Enquiry table with status changes (New → Contacted → Confirmed → Closed), search, detail view and WhatsApp reply |
| `/admin/hotels` | Hotel records — name, city, stars, distance from Haram, description, image, status |
| `/admin/settings` | Business contact details, WhatsApp number and demo-data controls |

> **Demo credentials** — `demo@altawakkaltourism.com` / `demo1234` (shown pre-filled on the
> lock screen). No real authentication is performed and nothing is sent to a server.

---

## Project structure

```
.
├── app/
│   ├── layout.tsx              # Root layout, metadata, JSON-LD, global providers
│   ├── globals.css             # Design tokens, typography, component classes
│   ├── not-found.tsx
│   ├── (site)/                 # Public routes (own layout with Navbar + Footer)
│   │   ├── page.tsx            # Home
│   │   ├── about/  faq/  contact/  packages/
│   │   └── packages/[slug]/    # Package detail, pre-rendered with generateStaticParams
│   └── admin/                  # Admin routes (own layout, no site chrome)
│       ├── page.tsx  packages/  enquiries/  hotels/  settings/
├── components/
│   ├── admin/
│   │   ├── AdminShell.tsx      # Lock screen, sidebar, top bar
│   │   ├── AdminUi.tsx         # StatCard, DataTable, StatusPill, Modal, IconButton
│   │   └── views/              # One client view per admin screen
│   ├── layout/                 # Navbar, Footer
│   ├── site/                   # Hero, sections, PackageCard, EnquiryForm, FAQ, CTAs
│   └── ui/                     # Button, Accordion, SectionHeading, Reveal, Icons, Media
├── data/                       # Editable demo data: packages, hotels, faqs, enquiries
├── lib/
│   ├── config.ts               # ★ ALL business details in one place
│   ├── demo-store.tsx          # Client store for packages / hotels / enquiries
│   ├── whatsapp.ts             # Every WhatsApp link builder
│   ├── format.ts               # INR, date and label formatting
│   └── types.ts
├── public/
│   ├── images/                 # Hand-authored SVG artwork (no stock photography)
│   ├── _headers                # Cache + security headers
│   └── _redirects
├── next.config.ts              # output: 'export' + unoptimized images
├── tailwind.config.ts
├── wrangler.jsonc
└── README.md
```

---

## Editing the content

### Business details (phone, WhatsApp, email, address, hours)

Everything lives in **`lib/config.ts`**. No other file hard-codes a contact detail.

```ts
export const contactConfig = {
  whatsappNumber: '919876543210',   // digits only, with country code
  phone: '+91 00000 00000',
  email: 'info@altawakkaltourism.com',
  addressLine1: 'Office Address Placeholder',
  mapEmbedUrl: 'https://www.google.com/maps?q=…&output=embed',
  businessHours: [ /* … */ ],
};
```

Replacing `whatsappNumber` updates **every** WhatsApp button and pre-filled message on the site.

### Packages, hotels, FAQs and sample enquiries

Edit the arrays in `data/`:

- `data/packages.ts` — name, price, nights, hotels, flight, transport, ziyarat, inclusions,
  exclusions, important information, artwork, status, featured flag.
- `data/hotels.ts` — Makkah and Madinah property records.
- `data/faqs.ts` — questions, answers and their filter category.
- `data/enquiries.ts` — the sample enquiries that pre-load the admin dashboard.

> ⚠️ **All prices, hotel names, flight options and night counts in this repository are sample
> content for the demonstration.** They are labelled as such on the public site and are not a
> confirmed offer. Replace them with real, verified figures before launch.

### Google Maps

1. Open the real office in Google Maps → **Share → Embed a map → Copy HTML**.
2. Paste the `src="…"` value into `contactConfig.mapEmbedUrl`.
3. Put the shareable link into `contactConfig.mapLinkUrl`.

### Artwork

All imagery is hand-authored SVG in `public/images/` — cream, sand, charcoal and muted gold
throughout, with no photography and no green backgrounds behind the Kaaba. To swap in
photography later, drop files into `public/images/` and update the `src` in
`components/site/PackageCard.tsx` and the page heroes.

---

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Ivory | `#FCFAF6` | Page background |
| Cream | `#F6F0E4` / `#EFE6D6` | Alternating sections, inputs |
| Sand | `#DCCDB2` | Hairlines, dividers |
| Charcoal | `#1B1A17` / `#2A2823` | Headings, primary buttons, admin chrome |
| Muted gold | `#B08A4A` (accent only) | Eyebrows, icons, accents, focus rings |
| Espresso | `#221F1A` | Footer, CTA bands, admin lock screen |

- **Headings** — an elegant serif stack (Cormorant Garamond / Iowan Old Style / Palatino /
  Georgia fallback), loaded without a network request.
- **Body** — a clean sans-serif stack (Inter / Segoe UI / system fallback).
- **Corners** — subtle (5–12px), never fully rounded.
- **Motion** — short fade and 14px lift on scroll, plus a 400ms accordion transition.
  Fully disabled under `prefers-reduced-motion: reduce`.
- No gradients on large surfaces, no glassmorphism, no glow effects, no people photography.

> To use a self-hosted webfont, drop the files in `public/fonts/`, declare an `@font-face` rule
> in `app/globals.css` and set `--font-display` / `--font-sans` in `app/layout.tsx` or
> `:root`. Using `next/font/google` also works, but it downloads fonts at build time, so the
> Cloudflare build must have network access.

---

## Cloudflare Pages deployment

The project uses `output: 'export'`, so `npm run build` produces a folder of plain HTML, CSS,
JS and images in `./out`. Cloudflare Pages can serve that directly — no Functions, no Workers
runtime, no Node compatibility flags.

### 1. Create the Cloudflare Pages project

1. Sign in at <https://dash.cloudflare.com>.
2. **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository holding this project and **Start deployment**.
   (The project name, branch and build settings on the next screen can all be changed later.)

### 2. Build settings

| Setting | Value |
| --- | --- |
| Framework preset | `Next.js` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | *(leave blank if the repo root is the project)* |
| Node.js version | `20` or newer — set `NODE_VERSION=20` in **Environment variables** if the default is older |

Cloudflare detects `wrangler.jsonc` automatically; if you prefer to set the output directory in
the dashboard, it must be exactly `out` (it is also declared in `wrangler.jsonc` as
`pages_build_output_dir`).

### 3. Environment variables

There are **no required environment variables** — the site builds and runs with the placeholder
values in `lib/config.ts`. The following are supported for production and can be set under
**Settings → Environment variables** (set them for **both** *Production* and *Preview*):

| Variable | Purpose | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by metadata and JSON-LD | `https://www.altawakkaltourism.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business WhatsApp number, digits only | `919876543210` |
| `NEXT_PUBLIC_PHONE` | Display phone and `tel:` link | `+91 98765 43210` |
| `NEXT_PUBLIC_EMAIL` | Business email | `info@altawakkaltourism.com` |
| `NEXT_PUBLIC_MAP_EMBED_URL` | Google Maps embed `src` | `https://www.google.com/maps?q=…&output=embed` |
| `NEXT_PUBLIC_MAP_LINK_URL` | Google Maps shareable link | `https://maps.app.goo.gl/…` |

> `NEXT_PUBLIC_*` variables are inlined into the client bundle at build time, so **changing one
> requires a new deployment** — Cloudflare does this automatically on the next commit, or via
> **Settings → Builds → Retry deployment**.

### 4. Deploy from the command line (Wrangler)

```bash
# one-time auth
npx wrangler login

# build + upload ./out
npm run deploy
# or, to deploy an existing build:
npx wrangler pages deploy out
```

For CI, set an API token instead of logging in:

```bash
npx wrangler login            # local machines
# or export CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID
```

### 5. Custom domain

1. **Workers & Pages → your project → Custom domains → Set up a custom domain**.
2. Enter the apex domain, for example `altawakkaltourism.com`.
3. Cloudflare adds the required `CNAME` / `A` records automatically if the zone is already on
   Cloudflare DNS.
4. For the `www` subdomain, add it as a second custom domain and set the first one as the
   **Redirect to** target (or add a redirect in `_redirects`).
5. SSL/TLS is provisioned automatically. Wait for the certificate to issue (usually a few
   minutes) and the site is live over HTTPS.

### 6. After deployment — checklist

- [ ] Homepage, `/packages`, all three `/packages/<slug>` pages, `/about`, `/faq`, `/contact`
      load over HTTPS.
- [ ] `/admin` shows the lock screen; the pre-filled demo credentials open the dashboard.
- [ ] Dashboard → Packages → **Add Package** saves and the new package appears on `/packages`.
- [ ] Submit the enquiry form on `/contact`; the success message appears and the new record is
      visible under Dashboard → Enquiries.
- [ ] Every **WhatsApp** button opens WhatsApp with the correct number and a pre-filled message.
- [ ] Google Maps placeholder is replaced with the real office location.
- [ ] The 404 page renders for an unknown URL.

### Cloudflare configuration already in this repo

| File | Purpose |
| --- | --- |
| `next.config.ts` | `output: 'export'`, `trailingSlash: true`, `images.unoptimized` |
| `wrangler.jsonc` | `pages_build_output_dir: "out"`, `name`, `compatibility_date` |
| `public/_headers` | Long-lived immutable caching for `/_next/static`, security headers, HSTS |
| `public/_redirects` | Trailing-slash normalisation for the main routes |

`next build` writes a pre-rendered `out/404.html` (from `app/not-found.tsx`) alongside the other
routes, so Cloudflare Pages serves the styled 404 — with a correct `404` status — for any
unmatched URL without any extra configuration.

> **No Workers, no Vercel.** There is no `vercel.json`, no `@vercel/*` dependency, no
> `NEXT_PUBLIC_VERCEL_URL`, no server actions, no ISR/revalidation and no image-optimisation
> server. The build is platform-agnostic and runs anywhere Node 20+ is available.

---

## Notes on the demonstration data

- Prices, hotel names, flight carriers and night counts are **illustrative sample content** and
  are labelled as such on the public pages.
- No certifications, licences, government approvals, awards, years of experience or religious
  endorsements are claimed anywhere on the site.
- Enquiries submitted in the demo are stored in the browser (`localStorage` key
  `att-enquiries-v1`) and are never transmitted. Package and hotel edits use
  `att-packages-v1` and `att-hotels-v1`. **Dashboard → Reset data** (or Settings → Restore
  sample data) restores the original records.
- In a live build, `lib/demo-store.tsx` is the single seam to swap: replace the
  `readStorage` / `writeStorage` helpers with API calls and every screen keeps working.

---

## Quality checks performed

```bash
npm run typecheck   # 0 TypeScript errors
npm run lint        # 0 ESLint errors and warnings
npm run build       # 16 static pages generated, export succeeds
```

Verified: every route returns `200`, an unknown package slug returns `404`, every internal link
and image asset resolves, WhatsApp links contain the customer name, package, traveller count and
travel date, layouts are fluid from 320px upwards with no horizontal overflow, and
`prefers-reduced-motion` is respected.
