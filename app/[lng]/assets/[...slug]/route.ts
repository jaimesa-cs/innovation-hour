import { Asset, AssetError } from "@/_sdk/types";
import { NextRequest, NextResponse } from "next/server";

import { getAssetByTag } from "@/_sdk/sdk";
import { notFound } from "next/navigation";

export async function GET(
  request: NextRequest,
  { params: { lng, slug } }: { params: { lng: string; slug: string[] } }
) {
  const tagUrl = `/assets/${slug.join("/")}`;
  const tag = `path:${tagUrl}`;
  console.log("GET</images> request ", request.nextUrl.pathname, lng, slug, tag);
  //Split url and skip first
  

  const asset = await getAssetByTag<Asset>(lng, tag);
  if (asset === null) {
    return notFound();
  }
  if ((asset as AssetError).error_message) {
    return new Response((asset as AssetError).error_message, { status: 500 });
  }
  const a = asset as Asset;
  const res = await fetch(a.url);
  const response = new Response(res.body);
  response.headers.set("Content-Type", a.content_type);
  return response;
}
