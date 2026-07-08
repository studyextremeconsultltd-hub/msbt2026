# MSBT — Manchester School of Business and Technology

Standalone Next.js website for MSBT (light mode).

**GitHub repository:** [studyextremeconsultltd-hub/msbt2026](https://github.com/studyextremeconsultltd-hub/msbt2026)

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
| `/contact` | Contact Us form |
| `/university-progressions` | University pathways |

## Content

Course data and site copy: `src/data/msbt.ts`

## Build

```bat
npm run build
npm start
```

## Deploy (GitHub + Vercel + GoDaddy)

### 1. Push to GitHub (`msbt2026`)

```powershell
cd "e:\MSBT\msbt-main"
.\deploy.ps1
```

Or manually:

```powershell
git remote set-url origin https://github.com/studyextremeconsultltd-hub/msbt2026.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Import [studyextremeconsultltd-hub/msbt2026](https://vercel.com/new/import?s=studyextremeconsultltd-hub/msbt2026)
2. Framework: **Next.js** · Root directory: `./`
3. Click **Deploy**

### 3. Connect GoDaddy domain (`msbt.co.uk`)

**Vercel** → Settings → Domains → add `msbt.co.uk` and `www.msbt.co.uk`

**GoDaddy** DNS:

| Type | Name | Value |
|------|------|--------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Delete any **WebsiteBuilder Site** record first.
