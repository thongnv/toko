import { Product } from "@/app/components/Products";
import { getStrapiMedia } from "@/app/utils/api-helpers";
import { fetchAPI } from "@/app/utils/fetch-api";
import { Data } from "@/app/utils/model";
import { currencyFormat } from "@/app/utils/product.helper";
import Image from "next/image";

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

export default async function PaymentRoute({
  params,
}: {
  params: { slug: string };
}) {
  const filter = params.slug;
  // TODO: this should be dynamically handled (can be product details or category)
  const { data } = (await fetchProductBySlug(filter)) as { data: Product[] };

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
    <div className="py-2 bg-white">
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <div className="items-center flex-shrink-0 lg:flex">Thanh toán</div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}

PaymentRoute.getLayout = (page: any) => page;
