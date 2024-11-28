"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../Assets/Nike-logo.png";
import Search from "../Search/Search";
import Profile from "../Profile/Profile";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../Cart/Cart";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "NEW RELEASES", path: "/new" },
  { label: "MEN", path: "/men" },
  { label: "WOMEN", path: "/women" },
  { label: "KIDS", path: "/kids" },
  { label: "CUSTOMIZE", path: "/customize" },
];

export default function Navigation({ cartCount }: { cartCount: number }) {
  const [activeTab, setActiveTab] = useState(navItems[0].path);

  return (
    <div className="flex justify-between items-center mt-40">
      <Image className="cursor-pointer" src={Logo} width={60} alt="Logo" />
      <div className="flex gap-[25px]">
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => {
              setActiveTab(item.path);
            }}
            className={`cursor-pointer px-4 py-2 rounded-lg ${
              activeTab === item.path
                ? "bg-ridgedBgWhite border border-black"
                : "bg-transparent"
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="flex gap-[15px]">
        <Search />
        <Profile />
        <Wishlist />
        <Cart cartCount={cartCount} />
      </div>
    </div>
  );
}
