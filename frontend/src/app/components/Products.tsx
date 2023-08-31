import Link from "next/link";
import { Picture } from "../utils/model";

interface ProductsProps {
  products: Product[];
}

export interface Product {
  data: {
    attributes: {
      name: string;
      url: string;
      coverPicture: Picture;
    }
  }
}

function ProductCard({ name, url, coverPicture }: any) {
  return (
    <div className="flex flex-col items-center p-4">
      product here
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-8 h-8 dark:text-violet-400"
      >
        <path
          fillRule="evenodd"
          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
          clipRule="evenodd"
        ></path>
      </svg>
      <h3 className="my-3 text-3xl font-semibold">{name}</h3>
      <div className="space-y-1 leading-tight my-6">
      </div>
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
