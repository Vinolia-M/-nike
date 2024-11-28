import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification,} from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import Image from "next/image";
import EyeIcon from "../../Assets/eye-icon.svg";
import RepeatIcon from "../../Assets/arrow-repeat.svg";

export default function SignupPage() {
  const [code, setCode] = useState(""),
    [firstName, setFirstName] = useState(""),
    [surname, setSurname] = useState(""),
    [dateOfBirth, setDateOfBirth] = useState({ day: "", month: "", year: "" }),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState(""),
    [error, setError] = useState<string | null>(null),
    [message, setMessage] = useState<string | null>(null),
    [fieldErrors, setFieldErrors] = useState({
      code: "",
      firstName: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      day: "",
      month: "",
      year: "",
    }),
    [showPassword, setShowPassword] = useState(false),
    [acceptTerms, setAcceptTerms] = useState(false),
    [signUpEmails, setSignUpEmails] = useState(false),
    router = useRouter();

  const validateFields = () => {
    const errors = {
      code: code ? "" : "Code is required.",
      firstName: firstName ? "" : "First Name is required.",
      surname: surname ? "" : "Surname is required.",
      email: email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? "" : "Invalid email address.",
      password: password.length >= 8 ? "" : "Password must be at least 8 characters.",
      confirmPassword: confirmPassword ? "" : "Confirm Password is required.",
      day: dateOfBirth.day ? "" : "Day is required.",
      month: dateOfBirth.month ? "" : "Month is required.",
      year: dateOfBirth.year ? "" : "Year is required.",
    };
    setFieldErrors(errors);

    // Check if there are any errors
    return !Object.values(errors).some((err) => err !== "");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setMessage(null);

    if (!validateFields()) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the Terms of Use and Privacy Policy.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      setMessage(
        "Sign up successful! Please check your emails for a verification code."
      );

      // Clear form
      setCode("");
      setFirstName("");
      setSurname("");
      setDateOfBirth({ day: "", month: "", year: "" });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAcceptTerms(false);
      setSignUpEmails(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="max-w-[32rem] mx-auto p-6">
      <h1 className="text-36 leading-40 mb-4">Now let's make you a Nike Member.</h1>

      <form onSubmit={handleSignup}>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Code*"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-black bg-transparent rounded-md p-3 focus:outline-none focus:ring-2"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-600 hover:text-black"
          >
            <Image src={RepeatIcon} alt="Repeat Icon" />
          </button>
          {fieldErrors.code && <p className="text-red-500 text-sm">{fieldErrors.code}</p>}
        </div>

        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <input
              type="text"
              placeholder="First Name*"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-black bg-transparent rounded-md p-3 focus:outline-none focus:ring-2"
            />
            {fieldErrors.firstName && (
              <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>
            )}
          </div>
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Surname*"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full border border-black bg-transparent rounded-md p-3 focus:outline-none focus:ring-2"
            />
            {fieldErrors.surname && (
              <p className="text-red-500 text-sm">{fieldErrors.surname}</p>
            )}
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-black bg-transparent rounded-md p-3 focus:outline-none focus:ring-2"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3"
          >
            <Image src={EyeIcon} alt="Eye Icon" />
          </button>
          {fieldErrors.password && (
            <p className="text-red-500 text-sm">{fieldErrors.password}</p>
          )}
        </div>

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password*"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-black bg-transparent rounded-md p-3 focus:outline-none focus:ring-2"
          />
          {fieldErrors.confirmPassword && (
            <p className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <p className="text-sm text-black mb-8">
          Get a Nike Member Reward on your birthday.
        </p>

        <div className="mb-6">
          <label className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={signUpEmails}
              onChange={(e) => setSignUpEmails(e.target.checked)}
              className="mr-2 w-4 h-4 border border-black rounded bg-transparent"
            />
            <span className="text-18">
              Sign up for emails to get updates from Nike.
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mr-2 w-4 h-4 border border-black rounded bg-transparent"
            />
            <span className="text-18">
              I agree to Nike's{" "}
              <a href="#" className="text-grey-500 underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-grey-500 underline">
                Terms of Use
              </a>
              .
            </span>
          </label>
          {!acceptTerms && (
            <p className="text-red-500 text-sm mt-1">
              You must accept the Terms of Use and Privacy Policy.
            </p>
          )}
        </div>

        <button type="submit" className="w-[35%] float-right border border-black py-3 mt-4 rounded-full">
          Create Account
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
