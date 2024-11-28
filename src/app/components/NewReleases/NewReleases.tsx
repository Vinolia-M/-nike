'use client'

import React from "react";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InstagramIcon from "../../Assets/instagram-icon.svg";
import TwitterIcon from "../../Assets/twitter-Icon.svg";
import LinkedinIcon from "../../Assets/linkedin-icon.svg";
import FacebookIcon from "../../Assets/facebook.svg";
import CaretLeft from "../../Assets/caret-left-arrow.svg";
import CaretRight from "../../Assets/caret-right-arrow.svg";
import NikeEdgeNew from "../../Assets/nike-edge-new.png";
import Filters from "../NewReleaseFilters/Filters";

export default function NewReleases({
    onAddToCart, }: { onAddToCart: () => void; }) {
  return (
    <>
      <div className="flex justify-between mt-100">
        <div className="">
          <p style={{ fontFamily: "var(--font-supreme-bold)" }}>MEN'S SHOE</p>
          <h1 className="text-40 tracking-[-2px]" style={{ fontFamily: "var(--font-supreme-bold)" }}>
            NIKE AIR EDGE 270
          </h1>
          <span className="text-20" style={{ fontFamily: "var(--font-supreme-thin)" }}>
            The nike air adge takes the look of retro of<br />basketball and puts it through a morden lens
          </span>
        </div>
        <Filters onAddToCart={onAddToCart}/>
      </div>

      <Image className="absolute bottom-[27%] left-[25%] w-[45%] z-10" src={NikeEdgeNew} alt="Nike Edge New" />
      <div className="oval-shape">
        <div className="arrow-container">
            <div className="left-arrow cursor-pointer">
                <Image src={CaretLeft} alt="Caret Left" />
            </div>
            <div className="right-arrow cursor-pointer">
               <Image src={CaretRight} alt="Caret Right" />
            </div>
        </div>
      </div>

      <div className="flex justify-between mt-300">
        <p className="rotate-[-90deg]" style={{ fontFamily: "var(--font-supreme-bold)" }}>SCROLL DOWN</p>
        <div className="grid gap-[11px]">
          <Image src={InstagramIcon} alt="Instagram" />
          <Image src={TwitterIcon} alt="Twitter" />
          <Image src={LinkedinIcon} alt="Linkedin" />
          <Image src={FacebookIcon} alt="Facebook" />
        </div>
      </div>
    </>
  );
}
