import {fetchAPI} from "@/app/utils/fetch-api";

export async function getPageBySlug(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/pages`;
    const urlParamsObject = {filters: {slug}};
    const options = {headers: {Authorization: `Bearer ${token}`}};
    return await fetchAPI(path, urlParamsObject, options);
}