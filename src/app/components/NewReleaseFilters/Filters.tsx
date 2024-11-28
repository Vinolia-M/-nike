'use client'

import React, { useState } from "react";

export default function Filters({
  onAddToCart, }: {
  onAddToCart: () => void; }) {

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);

  const sizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5];
  const colors = ["#9e8854", "#292725", "#015f91", "#d9b504", "#fff"];

  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
    if (selectedColor || size) setShowButton(true);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (selectedSize || color) setShowButton(true);
  };

  const handleAddToCart = () => {
    onAddToCart();
    setShowButton(false);
    setSelectedSize(null);
    setSelectedColor(null);
  };

  return (
    <div>
      <p className="mb-3" style={{ fontFamily: "var(--font-supreme-bold)" }}>SELECT SIZE (US)</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <div key={size}
            className={`flex items-center justify-center text-14 cursor-pointer border border-black rounded w-[15%] h-[35px] ${
              selectedSize === size ? "bg-gray-400" : "" }`}
            onClick={() => handleSizeSelect(size)} >
            {size}
          </div>
        ))}
      </div>

      <p className="mb-3 mt-5" style={{ fontFamily: "var(--font-supreme-bold)" }}>SELECT COLOR</p>
      <div className="flex gap-2 mt-2">
        {colors.map((color) => (
          <div key={color}
            className={`w-[37px] h-[37px] rounded-full cursor-pointer border ${
              selectedColor === color ? "ring-2 ring-gray-500" : "" }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}></div>
        ))}
      </div>

      {showButton && (
        <button className="add-to-cart text-black mt-5 py-2 px-4 border border-black rounded-md"
          onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
}
