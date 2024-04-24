import * as contentstack from "contentstack";

export const configuration = {
  CONTENTSTACK_API_KEY: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "",
  CONTENTSTACK_DELIVERY_TOKEN: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || "",
  CONTENTSTACK_ENVIRONMENT: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "",
  CONTENTSTACK_REGION: process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "us",
  CONTENTSTACK_BRANCH: process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main",
};



const getRegion = () => {
  const region = configuration.CONTENTSTACK_REGION;
  switch (region) {
    case "us":
      return contentstack.Region.US;
    case "eu":
      return contentstack.Region.EU;
    case "azure-na":
      return contentstack.Region.AZURE_NA;
    case "azure-eu":
      return contentstack.Region.AZURE_EU;
    default:
      return contentstack.Region.US;
  }
};

export const Stack = contentstack.Stack({
  api_key: configuration.CONTENTSTACK_API_KEY,
  delivery_token: configuration.CONTENTSTACK_DELIVERY_TOKEN,
  environment: configuration.CONTENTSTACK_ENVIRONMENT,
  branch: configuration.CONTENTSTACK_BRANCH,
  region: getRegion(),
  plugins: [],
});

export const renderOption = {
  span: (node: any, next: any) => next(node.children),
};
