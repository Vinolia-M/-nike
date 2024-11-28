import React from "react";
import Image from "next/image";
import WishlistIcon from "../../Assets/wishlist-icon.svg";

export default function Wishlist() {
  return (
    <div className="cursor-pointer">
      <Image src={WishlistIcon} alt="Wishlist Icon" />
    </div>
  );
}
