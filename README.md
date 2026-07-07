# MSBT — Manchester School of Business and Technology

Standalone Next.js website for MSBT (light mode). Separate from the Rose Empire repo.

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

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, courses |
| `/about` | About MSBT (tabbed content) |
| `/courses` | All programmes |
| `/courses/[slug]` | Course detail + enquiry sidebar |

## Content

Course data and site copy: `src/data/msbt.ts`

## Build

```bat
npm run build
npm start
```

## Deploy (GitHub + GoDaddy domain)

This site is a **Next.js** app. The recommended setup is:

1. **GitHub** — store the code (this repo).
2. **Vercel** — free hosting built for Next.js (automatic deploys on every push).
3. **GoDaddy** — keep your domain; point DNS to Vercel (you do not need GoDaddy web hosting).

### 1. Push to GitHub

```bat
gh auth login
git add -A
git commit -m "Initial MSBT website"
gh repo create msbt-website --public --source=. --remote=origin --push
```

Use a private repo instead of `--public` if you prefer.

### 2. Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
2. **Add New Project** → import this repository.
3. Framework: **Next.js** (auto-detected). Root directory: `.` (repo root).
4. Click **Deploy**. You will get a URL like `https://msbt-website.vercel.app`.

### 3. Connect your GoDaddy domain

In **Vercel** → Project → **Settings** → **Domains** → add your domain (e.g. `msbt.org.uk`).

In **GoDaddy** → **DNS** for that domain:

| Type | Name | Value |
|------|------|--------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

(Use the exact records Vercel shows after you add the domain—they may vary slightly.)

DNS can take up to 24–48 hours; often it works within an hour.

### 4. Optional: `www` redirect

In Vercel Domains, set the apex (`yourdomain.com`) as primary and redirect `www` to it (or the reverse).

