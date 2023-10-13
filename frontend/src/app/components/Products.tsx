import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import { Data } from "../utils/model";

interface ProductsProps {
  products: Product[];
}

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

export interface Product {
  id: number;
  attributes: {
    name: string;
    url: string;
    price: number;
    productInfo: Record<string, string>;
    images: {
      data: Data[];
    }
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

function ProductCard({ id, attributes }: Product) {
  const imageUrl = getStrapiMedia(attributes.cover.data?.attributes.url);
  return (
    <div className="flex flex-col items-center max-w-sm w-32 rounded-lg shadowgray-200 shadow cursor-pointer hover:shadow-lg">
      <a href={attributes.url}>
        {imageUrl && (
          <Image
            className="rounded-t-lg w-full"
            src={imageUrl}
            alt="icon-search"
            width={120}
            height={120}
          />
        )}
        <h4 className="my-3 px-2  text-xs">{attributes.name}</h4>
      </a>
    </div>
  );
}

export default function Products({ products }: ProductsProps) {
  return (
    <section>
      <div className="container flex gap-4 mx-auto justify-center">
        {products.map((product: Product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
