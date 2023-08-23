import {sectionRenderer} from './utils/section-renderer';
import {getPageBySlug} from "@/app/utils/get-page-by-slug";


export default async function RootRoute() {
    const page = await getPageBySlug('home');
    if (page.data.length === 0) return null;
    const contentSections = page.data[0].attributes.contentSections;
    return contentSections.map((section: any, index: number) => sectionRenderer(section, index));
}
