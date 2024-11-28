import React, { useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Prof from "../../Assets/profile-icon.svg";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

export default function Profile() {
  const [showPage, setShowPage] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<'signIn' | 'signUp' | null>('signIn');

  const togglePage = () => {
    if (!showPage) {
      setShowPage(true);
      gsap.fromTo(
        ".sliding-page",
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.8, ease: "power3.in" }
      );
    } else {
      gsap.to(".sliding-page", {
        y: "-100%",
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => setShowPage(false),
      });
    }
  };

  const toggleAccordion = (section: 'signIn' | 'signUp') => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={togglePage}>
        <Image src={Prof} alt="Profile" />
      </div>

      {showPage && (
        <div
          className="sliding-page fixed top-0 left-0 w-full h-screen bg-gray-100 z-50 flex items-center justify-center"
          style={{ display: showPage ? "flex" : "none" }}>
          <div className="flex">
            <div className="mb-4">
            <button onClick={() => toggleAccordion('signIn')}
                className={`w-full text-lg py-2 px-4 ${
                  activeAccordion === 'signIn'
                    ? 'border-b border-black' : ''
                }`}>
                SIGN IN
              </button>
              {activeAccordion === 'signIn' && <SignIn />}
            </div>

            <div>
            <button
                onClick={() => toggleAccordion('signUp')}
                className={`w-full text-lg py-2 px-4 ${
                  activeAccordion === 'signUp'
                    ? 'border-b border-black' : ''
                }`}>
                SIGN UP
              </button>
              {activeAccordion === 'signUp' && <SignUp />}
            </div>
          </div>
          <div className="cursor-pointer absolute top-[3%] right-[5%] h-[5%]" onClick={togglePage}>
            <span className="relative top-[20px] block bg-black w-[50px] h-[2px] rotate-45"></span>
            <span className="relative top-[18px] block bg-black w-[50px] h-[2px] rotate-135"></span>
          </div>
        </div>
      )}
    </div>
  );
}
