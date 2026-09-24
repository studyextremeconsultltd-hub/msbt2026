# MSBT Contact / Enquiry Worker

Delivers website enquiries straight to **`admissions@msbt.co.uk`** via [Resend](https://resend.com).
The Resend API key never reaches the Vite frontend.

## One-time setup

### 1. Resend account + domain

1. Create an account at [resend.com](https://resend.com).
2. Add and verify domain **`msbt.co.uk`** (DNS records Resend shows: SPF / DKIM).
3. Create an API key (`re_...`).
4. Sending address used by this worker:
   - **From:** `MSBT Admissions <admissions@msbt.co.uk>`
   - **To:** `admissions@msbt.co.uk`
   - **Reply-To:** the visitor’s email (so Naveed can reply in one click)

### 2. Deploy the Worker

```powershell
cd "e:\MSBT\msbt-main\cloudflare\contact-worker"
npm install
npx wrangler login
npx wrangler secret put RESEND_API_KEY
npm run deploy
```

Paste the Resend `re_...` key when prompted. Do not put it in source, `.env`, GitHub, or chat.

The frontend defaults to:

```text
https://msbt-contact.engr-noumanfaiz.workers.dev
```

If Cloudflare deploys under another URL, set `VITE_CONTACT_API_URL` during the website build.

Optional vars (already set in `wrangler.jsonc`):

| Variable | Default |
|----------|---------|
| `CONTACT_TO_EMAIL` | `admissions@msbt.co.uk` |
| `CONTACT_FROM_EMAIL` | `MSBT Admissions <admissions@msbt.co.uk>` |
| `SITE_URL` | `https://www.msbt.co.uk` |

## Local test

Create `cloudflare/contact-worker/.dev.vars`:

```text
RESEND_API_KEY=re_...
```

Then:

```powershell
npm run dev
```

Point the site at the local worker with:

```text
VITE_CONTACT_API_URL=http://127.0.0.1:8787
```

## Endpoint

`POST /api/enquiry`

```json
{
  "type": "contact",
  "name": "Sarah Ahmed",
  "email": "sarah@example.com",
  "phone": "+44 7XXX XXXXXX",
  "subject": "Admissions question",
  "message": "I would like information about Level 5 Business."
}
```

`type` may be `contact`, `hero`, or `course`.
