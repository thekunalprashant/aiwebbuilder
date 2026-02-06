import { Request, Response, NextFunction } from "express";

export function requireTenant(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.header("x-tenant-id");
  if (!tenantId) return res.status(401).json({ error: "Missing tenant context" });
  (req as Request & { tenantId: string }).tenantId = tenantId;
  next();
}
