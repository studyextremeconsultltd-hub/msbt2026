const checkoutApiUrl = (
  import.meta.env.VITE_CHECKOUT_API_URL ||
  "https://msbt-checkout.engr-noumanfaiz.workers.dev"
).replace(/\/$/, "");

export type CheckoutPaymentOption = "full" | "deposit";
export type CheckoutProvider = "stripe" | "paypal";

type CheckoutRequest = {
  courseSlug: string;
  paymentOption: CheckoutPaymentOption;
  provider?: CheckoutProvider;
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
};

type CheckoutResponse = {
  status?: string;
  url?: string;
  provider?: string;
  message?: string;
};

const STRIPE_HOSTS = new Set(["checkout.stripe.com"]);
const PAYPAL_HOSTS = new Set([
  "www.paypal.com",
  "paypal.com",
  "www.sandbox.paypal.com",
  "sandbox.paypal.com",
]);

function assertOfficialCheckoutUrl(url: string, provider: CheckoutProvider): string {
  const destination = new URL(url);
  if (destination.protocol !== "https:") {
    throw new Error("Checkout returned an insecure destination.");
  }

  const host = destination.hostname.toLowerCase();
  if (provider === "stripe" && STRIPE_HOSTS.has(host)) return destination.toString();
  if (provider === "paypal" && PAYPAL_HOSTS.has(host)) return destination.toString();

  throw new Error("Checkout returned an unexpected destination.");
}

export async function startCheckout(payload: CheckoutRequest): Promise<string> {
  const provider: CheckoutProvider = payload.provider === "paypal" ? "paypal" : "stripe";

  const response = await fetch(`${checkoutApiUrl}/api/checkout/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, provider }),
  });

  const data = (await response.json().catch(() => ({}))) as CheckoutResponse;
  if (!response.ok || data.status !== "success" || !data.url) {
    throw new Error(data.message || "Secure checkout is unavailable right now.");
  }

  return assertOfficialCheckoutUrl(data.url, provider);
}

/** @deprecated Prefer startCheckout({ provider: "stripe" }) */
export async function startStripeCheckout(payload: CheckoutRequest): Promise<string> {
  return startCheckout({ ...payload, provider: "stripe" });
}
