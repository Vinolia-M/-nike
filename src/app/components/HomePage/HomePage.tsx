// "use client";

// import React, { useEffect, useState } from "react";
// import gsap from "gsap";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, firestore } from "@/app/firebase/firebase";
// import type { User } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// export default function HomePage() {
//   const [loading, setLoading] = useState(true),
//     [user, setUser] = useState<User | null>(null),
//     router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         if (user.emailVerified) {
//           const userDoc = await getDoc(doc(firestore, "users", user.uid));

//           if (!userDoc.exists()) {
//             const registrationData = localStorage.getItem("registrationData");
//             const {
//               code = "",
//               firstName = "",
//               surname = "",
//               dateOfBirth = { day: "", month: "", year: "" },
//             } = registrationData ? JSON.parse(registrationData) : {};

//             await setDoc(doc(firestore, "users", user.uid), {
//               firstName,
//               surname,
//               dateOfBirth,
//               email: user.email,
//             });

//             localStorage.removeItem("registrationData");
//           }

//           setUser(user);
//           router.push("/HomePage");
//         } else {
//           setUser(null);
//           router.push("/SignIn");
//         }
//       } else {
//         setUser(null);
//         router.push("/SignIn");
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [router]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       {user ? "Redirecting to home page..." : "Redirecting to Sign in page..."}
//     </div>
//   );
// }
