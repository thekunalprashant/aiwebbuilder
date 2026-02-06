import { NextRequest, NextResponse } from "next/server";
import { WebsiteSchema } from "@aiwebbuilder/schema";

export async function POST(request: NextRequest) {
  const { brief } = await request.json();
  const draft = {
    metadata: { title: `${brief} Website`, description: "AI-generated schema" },
    theme: { colors: { primary: "#312E81", secondary: "#0EA5E9", background: "#FFFFFF", text: "#111827" }, fonts: { heading: "Inter", body: "Inter" } },
    sections: [{ id: "hero", type: "hero", inputs: { title: brief, body: "Generated safely through schema" } }],
    security: { allowExternalScripts: false, csp: "default-src 'self'; script-src 'none'; object-src 'none'" }
  };

  return NextResponse.json({ schema: WebsiteSchema.parse(draft) });
}
