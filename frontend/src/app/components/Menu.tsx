"use client";
import Logo from "./Logo";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getStrapiMedia } from "../utils/api-helpers";
import { Category } from "../page";

interface NavLink {
  categoryId: string;
  name: string;
  slug: string;
  icon: any;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ slug, categoryId, name, icon }: NavLink) {
  const imageUrl = getStrapiMedia(icon.data?.attributes.url);
  return (
    <li className="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-100 group">
      {imageUrl && <Image src={imageUrl} alt="logo" width={35} height={35} />}
      <Link
        href={slug + "/" + categoryId}
        className="flex mx-2"
      >
        {name}
      </Link>
    </li>
  );
}

function MobileNavLink({ slug, name, icon, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-100 group">
      {/* <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-100 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link> */}
    </a>
  );
}

export default function Menu({ links }: { links: Array<Category> }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <aside
      className="w-64 m-6 transition-transform -translate-x-full sm:translate-x-0 hidden lg:block"
      aria-label="Sidebar"
    >
      <div className="sticky top-6 z-40 p-2 overflow-y-auto bg-white rounded-lg text-sm">
        <ul className="font-small">
        <h3 className="p-2">Danh mục</h3>
          {links.map((item: Category) => (
            <NavLink key={item.id} {...item.attributes} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
