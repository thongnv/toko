import Products, { Product } from "@/app/components/Products";
import { getStrapiMedia } from "@/app/utils/api-helpers";
import { fetchAPI } from "@/app/utils/fetch-api";
import { Data } from "@/app/utils/model";
import { currencyFormat } from "@/app/utils/product.helper";
import Image from "next/image";

async function fetchProductsByCategory(slug: string, category: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/products`;
    const urlParamsObject = {
      filters: {
        category: {
          categoryId: category,
        },
      },
      populate: "*",
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const responseData = await fetchAPI(path, urlParamsObject, options);

    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function ProductRoute({
  params,
}: {
  params: { slug: string; category: string };
}) {
  const { slug, category } = params;
  const { data } = (await fetchProductsByCategory(slug, category)) as {
    data: Product[];
  };

  //TODO: CREATE A COMPONENT FOR THIS
  if (data.length === 0) return <div>hummmmm....try...again....</div>;

  const categoryName = data[0].attributes.category.data.attributes.name;

  return (
    <div className="flex gap-2 mx-6 mt-6 rounded-lg">
      <aside
        className="w-64 min-h-full transition-transform -translate-x-full sm:translate-x-0 hidden lg:block"
        aria-label="Sidebar"
      >
        <div className="h-full p-2 overflow-y-auto bg-white text-sm">
          <ul className="font-small">
            <h3 className="p-2">Danh mục</h3>
          </ul>
        </div>
      </aside>
      <div className="bg-white w-full p-2">
        {categoryName}
        <section>
          <div className="my-6 flex gap-4">
            <Products products={data} />
          </div>
        </section>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
