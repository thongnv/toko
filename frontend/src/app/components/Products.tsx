import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

interface ProductsProps {
  products: Product[];
}

export interface Product {
  id: number;
  attributes: {
    name: string;
    url: string;
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
