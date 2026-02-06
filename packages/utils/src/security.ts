import crypto from "node:crypto";

export const STRICT_CSP = "default-src 'self'; script-src 'none'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";

export function sanitizeText(input: string): string {
  return input.replace(/[<>]/g, "").trim();
}

export function hashIp(ip: string, salt: string): string {
  return crypto.createHash("sha256").update(`${ip}:${salt}`).digest("hex");
}

export function encryptField(value: string, key: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key, "hex"), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}.${tag.toString("hex")}.${encrypted.toString("hex")}`;
}

export function validateUpload(mimeType: string, sizeBytes: number): boolean {
  const allowed = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
  return allowed.includes(mimeType) && sizeBytes <= 5 * 1024 * 1024;
}
