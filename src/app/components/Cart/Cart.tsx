'use client'

import React, { useState } from "react";
import Image from "next/image";
import CartIcon from "../../Assets/cart-icon.svg";
import CartItems from "./CartItems";


export default function Cart({ cartCount }: { cartCount: number }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <div className="relative cursor-pointer" onClick={toggleCart}>
        <Image src={CartIcon} alt="Cart Icon" width={20} />
        {cartCount > 0 && (
          <div className="absolute top-[2px] left-[7px] text-red text-sm w-5 h-5">
            {cartCount}
          </div>
        )}
      </div>
      {isCartOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleCart} ></div>

          <div className="fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-lg transition-transform transform translate-x-0">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
              <button className="absolute top-2 right-2 text-gray text-30 hover:text-gray-900"
                onClick={toggleCart}>✕
              </button>

              {cartCount === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p>You don't have items in your cart.</p>
                </div>
              ) : (
                <div className="mt-4">
                  <CartItems />
                  <p>Items will be listed here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
