import { fetchAPI } from "@/app/utils/fetch-api";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
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

  const price = currencyFormat(data[0].attributes.price);
  return (
    <div className="flex gap-3 lg:ml-4 lg:mx-4 mt-4">
      <div className="sticky top-4 mx-auto bg-white rounded-lg md:w-1/2 lg:w-1/3">
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
      {/* content */}
      <div className="w-64 bg-white hidden rounded-lg h-full md:block md:w-1/2 lg:w-1/3 p-4">
        <div className="text-xl">{data[0].attributes.name}</div>
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
      {/* cart */}
      <div className="w-64 bg-white h-full hidden rounded-lg lg:block lg:w-1/3 p-4">
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
