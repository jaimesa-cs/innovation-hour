interface BaseModel {
    title: string;
    uid: string;
}
export interface Entry extends BaseModel {

}
export interface AssetError {
    error_message: string;
}
export interface Asset extends BaseModel {
    description: string;
    content_type: string;
    url: string;
    tags: string[];
}
export interface Page extends BaseModel {
    url: string;
    asset: Asset;
}

export interface KeyValuePair<T> {
    key: string;
    value: T;
}

export interface IQueryParameters {
    locale: string;
    contentType: string;
    queryParams?: KeyValuePair<string | number | boolean>[];
    includes?: string[];
    jsonRteFields?: string[];
}