"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDebounce } from "@uidotdev/usehooks";

import { fetchAPI } from "../utils/fetch-api";
import { Product } from "./Products";

async function searchProductsByInput(input: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/products`;
    const urlParamsObject = {
      filters: {
        name: {
          $containsi: input,
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await fetchAPI(path, urlParamsObject, options);
    return data;
  } catch (error) {
    console.error(error);
  }
}

function SearchMenu({ items }: { items: Array<Product> }) {
  return (
    <div className="text-sm">
      {!items.length && (
        <div className="p-2">
          <div className="text-base font-light">Tìm Kiếm Phổ Biến</div>
          <ul className="list-disc px-4">
            <li>iphone 15</li>
            <li>garmin forrunner</li>
          </ul>
        </div>
      )}
      {items.map((item) => (
        <a
          href={item.attributes.url}
          key={item.id}
          className="block p-2 hover:bg-slate-300 cursor-pointer"
        >
          {item.attributes.name}
        </a>
      ))}
    </div>
  );
}

export default function Search() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSeachTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResults] = useState([] as Product[]);

  useEffect(() => {
    (async () => {
      let products = [] as Product[];
      if (debouncedSearchTerm) {
        products = (await searchProductsByInput(searchTerm)) as Product[];
      }
      setSearchResults(products);
    })();
  }, [debouncedSearchTerm]);

  const handleCloseMenu = async () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 100);
  };

  return (
    <div className="relative min-w-[600px]">
      <div className="border border-slate-100 rounded-lg flex items-center">
        <Image
          className="h-full ml-4"
          src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
          alt="icon-search"
          width={20}
          height={20}
        />
        <input
          type="text"
          className="focus:outline-none w-full px-2"
          placeholder="Bạn tìm gì hôm nay"
          onChange={(event) => setSeachTerm(event.target.value)}
          onFocus={() => setShowMenu(true)}
          onBlur={handleCloseMenu}
        />

        <button className="w-24 h-10 text-indigo-500 text-sm	before:absolute before:block before:border-solid before:border-l before:border-violet-200 before:h-6 hover:bg-blue-100 rounded-r-lg">
          Tìm kiếm
        </button>
      </div>
      {showMenu && (
        <div className="absolute bg-white border min-h-[475px] shadow-lg w-full z-50">
          <SearchMenu items={searchResults} />
        </div>
      )}
    </div>
  );
}
