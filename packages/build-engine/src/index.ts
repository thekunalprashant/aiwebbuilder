import { WebsiteSchema, WebsiteSchemaType } from "@aiwebbuilder/schema";
import { sanitizeText } from "@aiwebbuilder/utils";

function renderSection(section: WebsiteSchemaType["sections"][number]): string {
  const safeTitle = sanitizeText(String(section.inputs.title ?? ""));
  const safeBody = sanitizeText(String(section.inputs.body ?? ""));
  return `<section data-type="${section.type}"><h2>${safeTitle}</h2><p>${safeBody}</p></section>`;
}

export function generateStaticSite(schemaInput: unknown): Record<string, string> {
  const schema = WebsiteSchema.parse(schemaInput);

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="Content-Security-Policy" content="${schema.security.csp}" />
<title>${sanitizeText(schema.metadata.title)}</title>
<meta name="description" content="${sanitizeText(schema.metadata.description)}" />
<link rel="stylesheet" href="/styles.css" />
</head>
<body>
<main>${schema.sections.map(renderSection).join("\n")}</main>
</body>
</html>`;

  const css = `:root{--primary:${schema.theme.colors.primary};--secondary:${schema.theme.colors.secondary};--bg:${schema.theme.colors.background};--text:${schema.theme.colors.text};}
body{font-family:${schema.theme.fonts.body};background:var(--bg);color:var(--text);margin:0;padding:2rem;}
h1,h2{font-family:${schema.theme.fonts.heading};color:var(--primary);}`;

  return {
    "index.html": html,
    "styles.css": css
  };
}
