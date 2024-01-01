import HighlightedText from "./HighlightedText";
import Products, { Product } from "./Products";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
    products: { data: Product[] };
  };
}

export default function Home({ data }: HeroProps) {
  const products = data.products.data;
  return (
    <section className="flex flex-col justify-center bg-white rounded-lg p-6 lg:mx-auto lg:flex-row lg:justify-between mx-6 mb-4">
      <div className="flex flex-col justify-center rounded-lg">
        <HighlightedText
          text={data.title}
          tag="h1"
          className="font-bold leading-none sm:text-lg"
          color="dark:text-violet-400"
        />

        {data.description && (
          <HighlightedText
            text={data.description}
            tag="p"
            className="text-lg"
            color="dark:text-violet-400"
          />
        )}
        <section>
          <div className="my-6 flex gap-4">
            <Products products={products} />
          </div>
        </section>
      </div>
    </section>
  );
}
