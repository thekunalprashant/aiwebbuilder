export interface DomainRecordResult {
  type: "TXT" | "CNAME";
  name: string;
  value: string;
}

export class DomainService {
  private readonly cfBase = "https://api.cloudflare.com/client/v4";

  async createVerificationRecord(zoneId: string, token: string, domain: string): Promise<DomainRecordResult> {
    const body = { type: "TXT", name: `_awverify.${domain}`, content: token, ttl: 300 };
    const result = await fetch(`${this.cfBase}/zones/${zoneId}/dns_records`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (!result.ok) throw new Error("Failed to create DNS verification record");
    return { type: "TXT", name: body.name, value: token };
  }

  async requestUniversalSsl(zoneId: string): Promise<void> {
    await fetch(`${this.cfBase}/zones/${zoneId}/ssl/universal/settings`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ enabled: true })
    });
  }
}
