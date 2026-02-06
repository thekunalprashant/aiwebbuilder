import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  siteId: z.string(),
  domain: z.string(),
  zoneId: z.string(),
  verificationMethod: z.enum(["txt", "cname"]).default("txt")
});

export async function POST(request: NextRequest) {
  const input = payloadSchema.parse(await request.json());
  const token = crypto.randomUUID();

  return NextResponse.json({
    success: true,
    dnsInstructions: input.verificationMethod === "txt"
      ? { type: "TXT", name: `_awverify.${input.domain}`, value: token }
      : { type: "CNAME", name: input.domain, value: `${input.siteId}.company.com` },
    workerVerifyEndpoint: "/api/domains/verify",
    token
  });
}
