"use client";
import { useState } from "react";
import Image from "next/image";

interface SearchResult {
  id: number;
  url: string;
  text: string;
  icon: string;
}

function SearchMenu({items}: {items: Array<SearchResult>}) {
  return <div>
      {items.map(item => <div key={item.text} className="p-2 hover:bg-slate-300 cursor-pointer">{item.text}</div>)}
    </div>;
}

export default function Search() {
  const [showMenu, setShowMenu] = useState(false);
  const items = [
    {
      id: 1,
      url: 'hello-1',
      text: 'iphone 12 pro max',
      icon: 'hello-icon'
    }
  ]
  const [searchResults, setSearchResults] = useState(items);
  return (
    <div className="relative">
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
          className="focus:outline-none w-96 px-2"
          placeholder="Bạn tìm gì hôm nay"
          onClick={() => setShowMenu(true)}
          onBlur={() => setShowMenu(false)}
        />

        <button className="w-24 h-10 text-indigo-500 text-sm	before:absolute before:block before:border-solid before:border-l before:border-violet-200 before:h-6 hover:bg-blue-100 rounded-r-lg">
          Tìm kiếm
        </button>
      </div>
      {showMenu && <div className="absolute bg-white border min-h-[475px] shadow-lg w-full z-50">
        <SearchMenu items={searchResults}/>
      </div>}
    </div>
  );
}
