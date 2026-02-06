import { hashIp, sanitizeText, encryptField } from "@aiwebbuilder/utils";
import { revalidateDomains } from "./domain-revalidate";

interface Env {
  ALLOWED_DOMAINS: string;
  IP_HASH_SALT: string;
  LEAD_ENCRYPTION_KEY: string;
  DB_URL: string;
}

const rateMap = new Map<string, { count: number; expiresAt: number }>();

function rateLimit(key: string, limit = 20, windowMs = 60_000): boolean {
  const now = Date.now();
  const value = rateMap.get(key);
  if (!value || value.expiresAt < now) {
    rateMap.set(key, { count: 1, expiresAt: now + windowMs });
    return false;
  }
  value.count += 1;
  return value.count > limit;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
    const origin = new URL(request.headers.get("origin") ?? "https://invalid").hostname;
    const allowedDomains = env.ALLOWED_DOMAINS.split(",").map((v) => v.trim());
    if (!allowedDomains.includes(origin)) return Response.json({ error: "Domain not allowed" }, { status: 403 });

    const body = await request.json<{ siteId: string; email: string; phone?: string; message?: string }>();
    if (!body.siteId || !body.email) return Response.json({ error: "Invalid payload" }, { status: 400 });

    const ip = request.headers.get("CF-Connecting-IP") ?? "0.0.0.0";
    if (rateLimit(`${origin}:${ip}`)) return Response.json({ error: "Rate limit exceeded" }, { status: 429 });

    const hashedIp = hashIp(ip, env.IP_HASH_SALT);
    const encryptedEmail = encryptField(sanitizeText(body.email), env.LEAD_ENCRYPTION_KEY);
    const encryptedPhone = body.phone ? encryptField(sanitizeText(body.phone), env.LEAD_ENCRYPTION_KEY) : null;

    // Placeholder: write encrypted lead to Supabase Postgres via pooled connection.
    console.log({ siteId: body.siteId, encryptedEmail, encryptedPhone, hashedIp });

    return Response.json({ success: true });
  }
,
  async scheduled(): Promise<void> {
    await revalidateDomains();
  }
};
