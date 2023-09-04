import Link from "next/link";
import { Picture } from "../utils/model";
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
  console.log(attributes);
  const imageUrl = getStrapiMedia(attributes.cover.data?.attributes.url);
  console.log(imageUrl);
  return (
    <div className="flex flex-col items-center max-w-sm rounded-lg shadowgray-200 rounded-lg shadow">
      {imageUrl && (
        <Image
          className="rounded-t-lg w-full"
          src={imageUrl}
          alt="icon-search"
          width={120}
          height={120}
        />
      )}
      <h3 className="my-3 text-sm font-semibold">{attributes.name}</h3>
      <div className="space-y-1 leading-tight my-6"></div>
    </div>
  );
}

export default function Products({ products }: ProductsProps) {
  return (
    <section className=" m:py-12 lg:py-24">
      <div className="container mx-auto my-6 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: Product, index: number) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
}
