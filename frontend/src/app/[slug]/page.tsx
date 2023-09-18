import PageHeader from "@/app/components/PageHeader";
import { fetchAPI } from "@/app/utils/fetch-api";
import BlogList from "@/app/views/blog-list";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";
import { Data } from "../utils/model";
import { currencyFormat } from "../utils/product.helper";

async function fetchProductBySlug(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/products`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        url: filter,
      },
      populate: ["images"],
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
  params: { slug: string };
}) {
  const filter = params.slug;
  const { data } = await fetchProductBySlug(filter);

  //TODO: CREATE A COMPONENT FOR THIS
  if (data.length === 0) return <div>Not Posts In this category</div>;
  // {
  //     id: 1,
  //     [0]     attributes: {
  //     [0]       name: 'Giày chạy bộ nam NIKE FREE RN 5.0 NEXT NATURE',
  //     [0]       description: 'Giày chạy bộ nam NIKE FREE RN 5.0 NEXT NATURE\nHang chinh hang',
  //     [0]       createdAt: '2023-08-29T00:15:50.998Z',
  //     [0]       updatedAt: '2023-09-12T23:01:24.698Z',
  //     [0]       publishedAt: '2023-08-29T00:33:56.076Z',
  //     [0]       url: 'giay-chay-bo-nam-nike-free-rn-5-0-next-nature'
  //     [0]     }
  //     [0]   }

  const images = data[0].attributes.images.data as Data[];

  const imageUrl = getStrapiMedia(images[0].attributes.url);

  const price = currencyFormat(data[0].attributes.price)
  return (
    <div className="flex gap-3 lg:ml-4 lg:mx-4 mt-4">
      {/* <PageHeader heading={name} text={description} /> */}
      <div className="sticky top-4 mx-auto bg-white rounded-lg hover:shadow-lg md:w-1/2 lg:w-1/3">
        <div className="flex flex-col gap-2 items-center p-4">
          <div className="border rounded-lg overflow-hidden cursor-pointer">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="icon-search"
                width={368}
                height={368}
              />
            )}
          </div>
          <div className="flex gap-2 w-full">
            {images.map((image: Data) => {
              const url = getStrapiMedia(image.attributes.url);
              return (
                url && (
                  <div className="border rounded-sm overflow-hidden cursor-pointer p-1">
                    <Image src={url} alt="icon-search" width={47} height={47} />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-64 bg-white hidden rounded-lg md:block md:w-1/2 lg:w-1/3 p-4">
        <div className="text-xl">{data[0].attributes.name}</div>
        <div className="text-2xl">{price}</div>
      </div>
      <div className="w-64 bg-white hidden rounded-lg lg:block lg:w-1/3">right</div>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
