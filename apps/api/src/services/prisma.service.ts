import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function withTenant<T>(tenantId: string, fn: () => Promise<T>): Promise<T> {
  await prisma.$executeRawUnsafe(`SELECT set_config('app.current_tenant_id', '${tenantId}', true)`);
  return fn();
}
