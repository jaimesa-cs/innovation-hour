import { Asset, AssetError, Entry, IQueryParameters } from "./types";

import { SUPPORTED_LOCALES } from "./settings";
import { Stack } from "./contentstack";

/**
 * Retrieves an entry based on the query parameters
 * @param params
 * @returns
 */
export const getContent = <T extends Entry>(
  params: IQueryParameters
): Promise<T | null> => {
  return new Promise(async (resolve, reject) => {

    console.log(" -> Content for: ", "| locale =>", params.locale, "| contentType =>", params.contentType, "| queryParams =>", params.queryParams?.map((p) => `${p.key}=${p.value}`));

    if (!params.locale || params.locale === "" || SUPPORTED_LOCALES.indexOf(params.locale) === -1) {
      console.warn("No locale provided, returning empty object");
      resolve(null);
    }
    const query = Stack.ContentType(params.contentType)
      .Query()
      .except("publish_details")
      .toJSON()
      .language(params.locale);
    if (params.includes) query.includeReference(params.includes);
    // query.includeEmbeddedItems().toJSON();

    if (params.queryParams) {
      params.queryParams.forEach((param) => {
        query.where(param.key, param.value);
      });
    }
    const data = query.find();
    data.then(
      (result: any) => {
        resolve(result[0][0] as T)


      },
      (error) => {
        reject(error.error_message);
      }
    );
  });
};

export const getAssetByTag = <T extends Asset>(
  locale: string,
  tag: string
): Promise<T | null | AssetError> => {
  return new Promise(async (resolve, reject) => {
    const query = Stack.Assets().Query().where("tags", tag).toJSON();
    query.find().then(
      (result: any) => {

        console.log("Assets found:", result[0].length);
        if (result[0].length === 0) {
          resolve(null);
        } else if (result[0].length > 1) {
          resolve({
            error_message: `More than one asset found for tag: '${tag}'`,
          } as AssetError);
        } else {
          resolve(result[0][0] as T)
        }

      },
      (error) => {
        // console.error(error);
        // console.log(error.error_message);
        reject(error.error_message);
      }
    );
  });
};


export function getUrlFromParams(params: any, ct: string) {  
  if (Array.isArray(params?.slug)) {
    return ['', params.lng, ct, ...params.slug].join('/');
  }
  return ['', params.lng].join('/')

}
