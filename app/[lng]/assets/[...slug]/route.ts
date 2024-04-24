import { Asset, AssetError } from "@/_sdk/types";
import { CUSTOM_URL_PREFIX, CUSTOM_URL_ROUTE_PREFIX } from "@/_sdk/settings";

import { NextRequest } from "next/server";
import { getAssetByTag } from "@/_sdk/sdk";
import { notFound } from "next/navigation";

export async function GET(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string[] } }
) {
  //1. Populate the tag from the slug, and according to the requirements
  const tagUrl = `${CUSTOM_URL_ROUTE_PREFIX}/${slug.join("/")}`;
  const tag = `${CUSTOM_URL_PREFIX}${tagUrl}`; 
  
  //2. Get the asset by url, you can use the available method getAssetByTag 
  // available in the _sdk/sdk.ts file
  const asset = await getAssetByTag<Asset>(tag);

  //3. If the asset is not found, return a 404 response
  if (asset === null) {
    return notFound();
  }

  //4. If the asset is found:  
  //4.1 if more than one asset is found, return a 500 response with an error message
  // Review the getAssetByTag method in the _sdk/sdk.ts file. You will notice it  returns an AssetError object if more than one asset is found.
  if ((asset as AssetError).error_message) {
    return new Response((asset as AssetError).error_message, { status: 500 });
  }

  //4.2 if only one asset is found, return a 200 response with the asset by:
  //4.2.1 Retrieve the asset using its URL
  const a = asset as Asset;  
  const res = await fetch(a.url);
  //4.2.2 Return the asset as an asset according to the asset's content type
  const response = new Response(res.body);
  response.headers.set("Content-Type", a.content_type);
  return response;  
  
}
