/**
 * PayPal settings, all set in Cloudflare (Workers → eriu-sports → Settings):
 *   PAYPAL_API_URL        - variable: https://api-m.paypal.com for live payments
 *   PAYPAL_CLIENT_ID      - variable: the live REST app's client ID
 *   PAYPAL_CLIENT_SECRET  - secret: the live REST app's secret
 *   PAYPAL_WEBHOOK_ID     - secret: ID of the webhook pointing at /api/paypal/webhook
 * The browser button also needs NEXT_PUBLIC_PAYPAL_CLIENT_ID as a *build* variable,
 * because Next.js bakes it into the page when the site is built.
 */
export const PAYPAL_API =
  process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

export async function generateAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured.");
  }

  const auth = btoa(`${clientId}:${clientSecret}`);

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    throw new Error(`PayPal auth failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error("PayPal did not return an access token.");
  }

  return data.access_token as string;
}
