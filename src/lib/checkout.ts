const checkoutApiUrl = (
  import.meta.env.VITE_CHECKOUT_API_URL ||
  "https://msbt-checkout.studyextreme.workers.dev"
).replace(/\/$/, "");

export type CheckoutPaymentOption = "full" | "deposit";

type CheckoutRequest = {
  courseSlug: string;
  paymentOption: CheckoutPaymentOption;
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
};

type CheckoutResponse = {
  status?: string;
  url?: string;
  message?: string;
};

export async function startStripeCheckout(payload: CheckoutRequest): Promise<string> {
  const response = await fetch(`${checkoutApiUrl}/api/checkout/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as CheckoutResponse;
  if (!response.ok || data.status !== "success" || !data.url) {
    throw new Error(data.message || "Secure checkout is unavailable right now.");
  }

  const destination = new URL(data.url);
  if (destination.protocol !== "https:" || destination.hostname !== "checkout.stripe.com") {
    throw new Error("Checkout returned an unexpected destination.");
  }

  return destination.toString();
}
