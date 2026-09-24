# MSBT — Manchester School of Business and Technology

Static Vite + React website (Automexa-style). **No Next.js. No Vercel.**

**GitHub repository:** [studyextremeconsultltd-hub/msbt2026](https://github.com/studyextremeconsultltd-hub/msbt2026)

Visual effects (Framer Motion, sliders, MapLibre globe) run in the browser — same look as before.

## Run locally

```bat
run_demo.bat
```

Or:

```bat
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Preview production build:

```bat
npm run build
npm run preview
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, courses, globe, campus |
| `/about` | About MSBT |
| `/courses` | All programmes |
| `/courses/:slug` | Course detail |
| `/contact` | Contact form (direct email to admissions) |
| `/university-progressions` | University pathways |

## Deploy (GitHub Pages + GoDaddy) — like Automexa

### 1. Push to GitHub

```powershell
cd "e:\MSBT\msbt-main"
.\deploy.ps1
```

### 2. Enable GitHub Pages

Repo → **Settings → Pages → Source: GitHub Actions**

Push to `main` runs `.github/workflows/deploy-pages.yml` and publishes `dist/`.

### 3. Custom domain `msbt.co.uk`

GitHub Pages → Custom domain → `msbt.co.uk` (+ www if needed).

**GoDaddy DNS** (same pattern as Automexa → GitHub Pages):

| Type | Name | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `studyextremeconsultltd-hub.github.io` |

Remove old Vercel records (`cname.vercel-dns.com`, `76.76.21.21`, etc.).

## Contact / enquiry emails (direct delivery)

Website forms no longer use `mailto`. They POST to a Cloudflare Worker which
emails **`admissions@msbt.co.uk`** via Resend (Reply-To = visitor email).

See [`cloudflare/contact-worker/README.md`](cloudflare/contact-worker/README.md).

Quick deploy:

```powershell
cd "e:\MSBT\msbt-main\cloudflare\contact-worker"
npm install
npx wrangler login
npx wrangler secret put RESEND_API_KEY
npm run deploy
```

You need:

1. Resend account + verified `msbt.co.uk` domain
2. API key `re_...` stored as Cloudflare secret `RESEND_API_KEY`
3. From address: `MSBT Admissions <admissions@msbt.co.uk>` (after domain verify)

Optional build override if the Worker URL differs:

```text
VITE_CONTACT_API_URL=https://msbt-contact.engr-noumanfaiz.workers.dev
```
