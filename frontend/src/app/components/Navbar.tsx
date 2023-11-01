"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Search from "./Search";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  icon: string;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text, icon }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex items-center cursor-pointer rounded-lg hover:bg-slate-200">
      <Link
        href={url}
        className={`flex items-center gap-1 mx-2 text-slate-500 ${
          path === url && "text-blue-500"
        }`}
      >
        {icon === "home" && (
          <HomeOutlined
            className={`flex text-xl font-bold ${
              path === url && "text-blue-500"
            }`}
            rev={1}
          />
        )}
        {icon === "user" && (
          <UserOutlined
            className={`flex text-xl ${path === url && "text-blue-500"}`}
            rev={1}
          />
        )}
        {icon === "cart" && (
          <div className="relative">
            <ShoppingCartOutlined
              className="flex text-blue-500 text-2xl"
              rev={1}
            />
            <span className="text-white bg-red-400 h-4 inline-block text-xs font-bold absolute -top-2 -right-2 px-1 rounded-lg">
              0
            </span>
          </div>
        )}
        <span className={`text-sm ${path === url && "text-blue-500"}`}>
          {text}
        </span>
      </Link>
    </li>
  );
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <div className="py-2 bg-white">
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
        </Logo>

        <div className="items-center flex-shrink-0 hidden lg:flex">
          <Search />
        </div>

        <div className="items-center flex-shrink-0 lg:flex">
          <ul className="items-stretch hidden h-10 space-x-3 lg:flex">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Strapi</span>
                {logoUrl && <img className="h-8 w-auto" src={logoUrl} alt="" />}
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200/10">
                <div className="space-y-2 py-6">
                  {links.map((item) => (
                    <MobileNavLink
                      key={item.id}
                      closeMenu={closeMenu}
                      {...item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
        <button
          className="p-4 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-7 w-7 text-gray-100" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
