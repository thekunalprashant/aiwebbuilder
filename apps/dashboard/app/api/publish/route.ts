import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { siteId } = await request.json();
  return NextResponse.json({
    success: true,
    pagesUrl: `https://${siteId}.company.com`,
    customDomainStatus: "pending-verification"
  });
}
