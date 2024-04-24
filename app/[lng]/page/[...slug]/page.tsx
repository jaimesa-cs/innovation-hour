import { CUSTOM_URL_PREFIX, DEFAULT_IMAGE_URL } from "@/_sdk/settings";
import { IQueryParameters, Page } from "@/_sdk/types";
import { getContent, getUrlFromParams } from "@/_sdk/sdk";

import Image from "next/image";
import OptimizedImageWithFallback from "@/components/OptimizedImageWithFallback";
import { notFound } from "next/navigation";

const ct = "page";

// Async function to get the entry
const getEntry = async (routeParams: any, searchParams?: any) => {
  const {lng} = routeParams;
  
  //query parameters, we filter by locale, content type and url
  const params: IQueryParameters = {
    locale: lng,
    contentType: ct,
    includes: [],
    jsonRteFields: [],
    queryParams: [{ key: "url", value: getUrlFromParams(routeParams, ct) }],
  };
  
  //get the content, calling using the SDK.
  return await getContent<Page>(params);
  
}


// Function to get the custom url, if the asset has a tag with the path, we use it, otherwise we use the url
function getCustomUrl(lng:string, asset?: any) {  
  //if there is no asset, we return the default image
  if(!asset) {
    return DEFAULT_IMAGE_URL;
  }
  const tags = asset.tags.filter((tag: any) => tag.startsWith(CUSTOM_URL_PREFIX));
  if(tags.length > 0) {    
    return `/${lng}${tags[0].split(":")[1]}`;
  }
  return asset.url;
}

async function Home({ params }: any) {
  const page = await getEntry(params);  
  const {lng} = params;
  const assetUrl = getCustomUrl(lng, page?.asset);

  if(page === null) {
    return notFound();
  }
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex pb-10">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Innovation Hour:&nbsp;
          <code className="font-mono font-bold">Using Custom Urls on Assets</code>
        </p>
        
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            
            <Image
              src="/spicy-santos.png"
              alt="Vercel Logo"
              className="dark:invert"
              width={50}
              height={12}
              priority
            />
          </a>
        </div>
      </div>
      <div className="grid grid-rows-2 place-items-center pb-10">
        <div className="text-s uppercase">{page?.title || "SELECT A PAGE ABOVE"}</div>
        {page?.asset && <div className="text-m">(<a href={`${assetUrl.startsWith("http") ? assetUrl :`http://localhost:3000${assetUrl}`}`}>{assetUrl}</a>)</div>}
      </div>
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        
        {page?.asset && 
        <OptimizedImageWithFallback          
          src={getCustomUrl(lng, page?.asset)}
          alt={page?.asset?.title || "Image not found"}
        />}
      </div>

     
    </main>
  );
}
export default Home;
