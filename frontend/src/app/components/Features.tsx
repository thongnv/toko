import Image from "next/image";
import { Product } from "./Products";
import { getStrapiMedia } from "../utils/api-helpers";
import HighlightedText from "./HighlightedText";

interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    products: { data: Product[] };
  };
}

interface Feature {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
}

function Feature({ id, attributes }: Product) {
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

export default function Features({ data }: FeaturesProps) {
  return (
    <section className="flex flex-col justify-center bg-white rounded-lg p-6 lg:mx-auto lg:flex-row lg:justify-between mx-6 mb-4">
      <div className="flex flex-col justify-center text-center rounded-lg lg:text-left">
        <HighlightedText
          text={data.heading}
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
        <section className="">
          <div className="container mx-auto my-6 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.products.data.map((product: Product, index: number) => (
          <Feature key={index} {...product} />
        ))}
          </div>
        </section>
      </div>
    </section>
  );
  
}
