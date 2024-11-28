'use client'

import React, { useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import axios from "axios";
import Logo from "../../Assets/Nike-logo.png";
import SignupPage from "./SignupPage";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({ email: "" });
    const [showPage, setShowPage] = useState(false);
    // const [verificationCode, setVerificationCode] = useState("");
  
    const generateVerificationCode = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
  
    const togglePage = () => {
      if (!showPage) {
        setShowPage(true);
        gsap.fromTo(".sliding-page",
          { x: "-100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.8, ease: "power3.inOut" }
        );
      } else {
        gsap.to(".sliding-page", {
          x: "-100%",
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => setShowPage(false),
        });
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      let valid = true;
      const newErrors = { email: "" };
  
      if (!email) {
        newErrors.email = "Email Address is required.";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Invalid email address.";
        valid = false;
      }
  
      setErrors(newErrors);
  
      if (valid) {
        const code = generateVerificationCode();
        // setVerificationCode(code);
  
        try {
          await sendVerificationEmail(email, code);
          togglePage(); 
        } catch (error) {}
      }
    };
  
    const sendVerificationEmail = async (email: string, code: string) => {
      try {
        await axios.post("/api/send-code", { email, code });
      } catch (error) {}
    };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 mt-4 w-full max-w-[30rem]">
        <Image src={Logo} width={70} alt="Logo" />
        <p className="text-30 mt-6 leading-26">Enter your Email Address to Continue.</p>

        <div className="mb-8 mt-6">
          <label htmlFor="email" className="block text-20 mb-1">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border border-black bg-transparent rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`} />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <p className="text-20 leading-26 mb-8">By continuing, I agree to Nikes{" "}
          <a href="#" className="underline">Privacy Policy</a>{" "} and{" "}
          <a href="#" className="underline">Terms of Use.</a>
        </p>

        <button type="submit"className="w-[50%] float-right border border-black py-2 px-4 rounded-md">
          CONTINUE
        </button>
      </form>

      {showPage && (
        <div className="sliding-page fixed top-0 left-0 w-full h-screen bg-gray-100 z-50"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <SignupPage />
          <div className="cursor-pointer absolute top-[3%] right-[5%] h-[5%]" onClick={togglePage}>
            <span className="relative top-[20px] block bg-black w-[50px] h-[2px] rotate-45"></span>
            <span className="relative top-[18px] block bg-black w-[50px] h-[2px] rotate-135"></span>
          </div>
        </div>
      )}
    </>
  );
}
