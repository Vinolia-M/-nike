import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../Assets/Nike-logo.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email Address is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      alert("SignIn successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className="p-4 mt-4 w-full max-w-[30rem]">
      <Image src={Logo} width={70} alt="Logo" />
      <p className="text-30 mt-6 leading-26">Enter your Email and Password to Sign in.</p>

      <div className="mb-4 mt-6">
        <label htmlFor="email" className="block text-20 mb-1">
          Email
        </label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2 border border-black bg-transparent rounded-md focus:outline-none focus:ring-2 ${
            errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-8">
        <label htmlFor="password" className="block text-20 mb-1">
          Password
        </label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-3 py-2 border border-black bg-transparent rounded-md focus:outline-none focus:ring-2 ${
            errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <button type="submit" className="w-[30%] float-right border border-black py-2 px-4 rounded-md">
        SIGN IN
      </button>
    </form>
  );
}
