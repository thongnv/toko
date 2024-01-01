import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import { Data } from "../utils/model";

interface ProductsProps {
  products: Product[];
}

export interface Product {
  id: number;
  attributes: {
    name: string;
    url: string;
    price: number;
    description: string;
    productInfo: Record<string, string>;
    images: {
      data: Data[];
    };
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: { data: Data };
  };
}

function ProductCard({ attributes }: Product) {
  const imageUrl = getStrapiMedia(attributes.cover.data?.attributes.url);
  return (
    <div className="flex flex-col items-center max-w-sm w-32 rounded-lg shadowgray-200 shadow cursor-pointer hover:shadow-lg">
      <a href={'/' + attributes.url}>
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
