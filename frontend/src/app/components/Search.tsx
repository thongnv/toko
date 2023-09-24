"use client";
import { useState } from "react";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  icon: string;
}


export default function Search(){

  return (
  <div>
      <input
        type="text"
        className="focus:outline-none w-96 px-2"
        placeholder="Bạn tìm gì hôm nay"
      />
      <button className="w-24 h-10 text-indigo-500 text-sm	before:absolute before:block before:border-solid before:border-l before:border-violet-200 before:h-6 hover:bg-blue-100 rounded-r-lg">
        Tìm kiếm
      </button>
    </div>
        
  );
}
