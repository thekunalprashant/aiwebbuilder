import crypto from "node:crypto";
import { Router } from "express";
import { z } from "zod";
import { DomainService } from "../services/domain.service";

const addDomainSchema = z.object({
  siteId: z.string().min(1),
  domain: z.string().min(3),
  zoneId: z.string().min(3)
});

export const domainRoutes = Router();
const service = new DomainService();

domainRoutes.post("/domains/add", async (req, res) => {
  const input = addDomainSchema.parse(req.body);
  const token = crypto.randomUUID();
  const dnsRecord = await service.createVerificationRecord(input.zoneId, token, input.domain);
  await service.requestUniversalSsl(input.zoneId);

  res.json({
    success: true,
    verification: dnsRecord,
    token,
    nextCheckInSeconds: 60
  });
});
