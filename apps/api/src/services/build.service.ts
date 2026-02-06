import { generateStaticSite } from "@aiwebbuilder/build-engine";

export class BuildService {
  async buildAndUpload(schema: unknown, tenantId: string, siteId: string) {
    const files = generateStaticSite(schema);
    // Placeholder: upload each file to Cloudflare R2 and trigger Pages deployment.
    return {
      buildPath: `${tenantId}/${siteId}/${Date.now()}`,
      files,
      pagesUrl: `https://${siteId}.pages.dev`
    };
  }
}
