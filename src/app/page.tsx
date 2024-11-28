'use client'

import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import NewReleases from "./components/NewReleases/NewReleases";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };
  return (
    <main>
      <Navigation cartCount={cartCount} />
      <NewReleases onAddToCart={handleAddToCart} />
    </main>
  );
}
