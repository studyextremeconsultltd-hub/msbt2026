# MSBT Stripe Checkout Worker

Creates fresh Stripe Checkout Sessions for the MSBT course page. Course names
and prices are validated server-side; the Stripe secret never reaches the Vite
frontend.

## Configure and deploy

```powershell
npm install
npx wrangler login
npx wrangler secret put STRIPE_SECRET_KEY
npm run deploy
```

Paste the MSBT Stripe account's `sk_live_...` key when Wrangler prompts for the
secret. Do not put the key in source code, `.env`, GitHub, or chat.

The frontend defaults to:

```text
https://msbt-checkout.studyextreme.workers.dev
```

If Cloudflare deploys the Worker under another URL, set
`VITE_CHECKOUT_API_URL` during the website build.

## Local test

Use a Stripe test secret in `cloudflare/checkout-worker/.dev.vars`:

```text
STRIPE_SECRET_KEY=sk_test_...
```

Then run:

```powershell
npm run dev
```
