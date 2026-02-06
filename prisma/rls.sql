-- Enable RLS for tenant-isolated tables
ALTER TABLE "Site" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SiteSchema" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SiteVersion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Domain" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Asset" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BuildLog" ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_site_isolation ON "Site"
USING (tenant_id = current_setting('app.current_tenant_id', true));
CREATE POLICY tenant_schema_isolation ON "SiteSchema"
USING (tenant_id = current_setting('app.current_tenant_id', true));
CREATE POLICY tenant_version_isolation ON "SiteVersion"
USING (tenant_id = current_setting('app.current_tenant_id', true));
CREATE POLICY tenant_domain_isolation ON "Domain"
USING (tenant_id = current_setting('app.current_tenant_id', true));
CREATE POLICY tenant_lead_isolation ON "Lead"
USING (tenant_id = current_setting('app.current_tenant_id', true));
CREATE POLICY tenant_asset_isolation ON "Asset"
USING (tenant_id = current_setting('app.current_tenant_id', true));
CREATE POLICY tenant_buildlog_isolation ON "BuildLog"
USING (tenant_id = current_setting('app.current_tenant_id', true));
