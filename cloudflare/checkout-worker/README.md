# MSBT Checkout Worker (Stripe + PayPal)

Creates official Stripe Checkout Sessions and PayPal Orders. Course prices are
validated on the server. Secrets never reach the Vite frontend.

Buyers always complete payment on:

- Stripe → `https://checkout.stripe.com/...`
- PayPal → `https://www.paypal.com/...` (or sandbox)

Funds settle directly into the MSBT Stripe / PayPal merchant accounts.

## Configure and deploy

```powershell
cd cloudflare/checkout-worker
npm install
npx wrangler login

# Stripe (already used)
npx wrangler secret put STRIPE_SECRET_KEY

# PayPal REST app credentials (Live)
npx wrangler secret put PAYPAL_CLIENT_ID
npx wrangler secret put PAYPAL_CLIENT_SECRET

npm run deploy
```

### Create PayPal API credentials

1. Open [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/live)
   (or switch to **Live** from the merchant [PayPal dashboard](https://www.paypal.com/mep/dashboard)).
2. Create / open a **REST API app** linked to the MSBT business account.
3. Copy **Client ID** and **Secret**.
4. Paste them into the Wrangler secret prompts above.
5. Keep `PAYPAL_MODE` as `live` (default). For testing only, set var `PAYPAL_MODE=sandbox`.

Do **not** put Client ID / Secret in GitHub, chat, or frontend code.

## Frontend

Defaults to:

```text
https://msbt-checkout.studyextreme.workers.dev
```

Override with `VITE_CHECKOUT_API_URL` at build time if the Worker URL changes.

## Local test

`cloudflare/checkout-worker/.dev.vars`:

```text
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=sandbox
```

```powershell
npm run dev
```
