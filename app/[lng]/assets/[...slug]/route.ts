import { Asset, AssetError } from "@/_sdk/types";
import { CUSTOM_URL_PREFIX, CUSTOM_URL_ROUTE_PREFIX } from "@/_sdk/settings";

import { NextRequest } from "next/server";
import { getAssetByTag } from "@/_sdk/sdk";
import { notFound } from "next/navigation";

export async function GET(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string[] } }
) {
  //TODO: Implement the following logic:
  //1. Populate the tag from the slug, and according to the requirements
  //2. Get the asset by url, you can use the available method getAssetByTag 
  // available in the _sdk/sdk.ts file
  //3. If the asset is not found, return a 404 response
  //4. If the asset is found:  
  //4.1 if more than one asset is found, return a 500 response with an error message
  // Review the getAssetByTag method in the _sdk/sdk.ts file. You will notice it  returns an AssetError object if more than one asset is found.
  //4.2 if only one asset is found, return a 200 response with the asset by:
  //4.2.1 Retrieve the asset using its URL
  //4.2.2 Return the asset as an asset according to the asset's
  return notFound();
  
}
