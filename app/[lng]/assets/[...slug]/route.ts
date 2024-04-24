import { Asset, AssetError } from "@/_sdk/types";
import { CUSTOM_URL_PREFIX, CUSTOM_URL_ROUTE_PREFIX } from "@/_sdk/settings";

import { NextRequest } from "next/server";
import { getAssetByTag } from "@/_sdk/sdk";
import { notFound } from "next/navigation";

export async function GET(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string[] } }
) {
  const tagUrl = `${CUSTOM_URL_ROUTE_PREFIX}/${slug.join("/")}`;
  const tag = `${CUSTOM_URL_PREFIX}${tagUrl}`;
  
  console.log("GET</images> request ", request.nextUrl.pathname, slug, tag);
  
  const asset = await getAssetByTag<Asset>(tag);
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
