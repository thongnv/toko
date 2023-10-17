import { Product } from "@/app/components/Products";
import { getStrapiMedia } from "@/app/utils/api-helpers";
import { fetchAPI } from "@/app/utils/fetch-api";
import { Data } from "@/app/utils/model";
import { currencyFormat } from "@/app/utils/product.helper";
import Image from "next/image";


async function fetchCategoryBySlug(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/categories`;
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
  // TODO: this should be dynamically handled (can be product details or category)
  const { data } = (await fetchCategoryBySlug(filter)) as { data: Product[] };

  //TODO: CREATE A COMPONENT FOR THIS
  if (data.length === 0) return <div>Not Posts In this category</div>;

  //   "id": 1,
  //   "attributes": {
  //     "name": "Apple iPhone 12",
  //     "description": null,
  //     "createdAt": "2023-09-30T16:09:09.782Z",
  //     "updatedAt": "2023-10-02T15:28:06.078Z",
  //     "publishedAt": "2023-09-30T16:09:59.858Z",
  //     "url": "apple-i-phone-12",
  //     "price": 14650000,
  //     "productInfo": {
  //       "Thương hiệu": "Apple",
  //       "Loại/ Công nghệ màn hình": "Super Retina XDR"
  //     }
  //   }
  // },

  const product = data[0].attributes;
  const images = product.images.data;

  const imageUrl = getStrapiMedia(images[0].attributes.url);

  const price = currencyFormat(product.price);
  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-3 lg:ml-4 lg:mx-4 mt-4">
      {/* left */}
      <div className="lg:sticky w-full lg:w-96 top-4 h-full bg-white rounded-lg">
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
          <div className="flex gap-2 justify-center w-full">
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
      {/* content */}
      <div className="h-full grow md:flex md:flex-col gap-4">
        <div className="bg-white p-4 rounded-lg">
          <div className="text-xl">{product.name}</div>
          <div className="text-2xl pb-4">{price}</div>
          <div className="text-sm font-bold">Màu</div>
          <div className="flex gap-2 my-3">
            <button className="border border-blue-600 rounded-lg px-2">
              Tím
            </button>
            <button className="border rounded-lg px-2">Xanh Lá</button>
          </div>
          <div className="text-sm font-bold">Dung lượng</div>
          <div className="flex gap-2 mt-2">
            <button className="border border-blue-600 rounded-lg px-2">
              128GB
            </button>
            <button className="border rounded-lg px-2">64GB</button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="text-xl mb-2">Thông tin chi tiết</div>
          <div className="flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50">
            <table className="w-full text-left border-collapse">
              <thead></thead>
              <tbody className="align-baseline">
                {product.productInfo &&
                  Object.entries(product.productInfo)?.map(([k, v]) => (
                    <tr key={k}>
                      <td className="py-2 text-slate-500 whitespace-nowrap">
                        {k}
                      </td>
                      <td className="py-2 text-slate-700 whitespace-nowrap">
                        {v}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="sticky bottom-0 h-px -mt-px bg-slate-200 dark:bg-slate-400/20"></div>
          </div>
        </div>
      </div>
      {/* cart */}
      <div className="h-full w-full lg:w-64 lg:block bg-white rounded-lg p-4">
        <div className="mb-4">Tím, 128GB</div>
        <div className="text-sm font-bold mb-2">Số Lượng</div>
        <div className="flex gap-1 mb-4">
          <button className="border rounded-lg px-3 py-1">-</button>
          <button className="border rounded-lg px-4 py-1">1</button>
          <button className="border rounded-lg px-3 py-1">+</button>
        </div>
        <div className="text-sm font-bold mb-4">Tạm tính</div>
        <div className="text-2xl pb-4">{price}</div>
        <div className="flex flex-col gap-2 w-full">
          <button className="border rounded py-2 bg-red-500 text-white font-extralight">
            Mua ngay
          </button>
          <button className="border border-blue-600 rounded py-2 text-blue-600 font-light">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
