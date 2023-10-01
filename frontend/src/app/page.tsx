import Menu from "./components/Menu";
import { fetchAPI } from "./utils/fetch-api";
import { sectionRenderer } from "./utils/section-renderer";
import { getPageBySlug } from "@/app/utils/get-page-by-slug";

async function fetchSideMenuData() {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI(
      "/categories",
      { populate: "*" },
      options
    );

    return {
      categories: categoriesResponse.data,
    };
  } catch (error) {
    console.error(error);
  }
}
export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    icon: any;
    products: {
      data: Array<{}>;
    };
  };
}

interface Data {
  categories: Category[];
}

export default async function RootRoute() {
  const page = await getPageBySlug("home");
  if (page.data.length === 0) return null;
  const { categories } = (await fetchSideMenuData()) as Data;
  const contentSections = page.data[0].attributes.contentSections;
  return (
    <div className="flex">
      <Menu links={categories} />
      <section className="block mt-6 mr-2 w-full">
        {contentSections.map((section: any, index: number) =>
          sectionRenderer(section, index)
        )}
      </section>
    </div>
  );
}
