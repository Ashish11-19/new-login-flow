"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLogin, logOut } from "@/utils/auth";
import { toast } from "react-toastify";

export default function Home() {
  const [user, setUser] = useState({ name: "", email: "" });
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
      } else {
        router.push("/login");
      }
    };
    authenticate();
  }, []);

  const handleLogOut = () => {
    logOut();
    toast.success("Logout Successfully");
    router.push("/login");
  };

  return (
    <main className="w-full h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#111827] text-white flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-white">
          Hi <span className="text-teal-400">{user.name}</span>, Welcome!
        </h1>
        <p className="text-sm text-gray-300">{user.email}</p>
        <button
          onClick={handleLogOut}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-medium transition"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
