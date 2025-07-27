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

  const handleLogout = () => {
    logOut();
    toast.success("Logout Successfully");
    router.push("/login");
  };

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900 dark:from-gray-900 dark:to-black px-4">
      <div className="w-full max-w-md bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 text-center space-y-5">
        <h1 className="text-3xl font-bold text-white">
          Welcome, <span className="text-blue-300">{user.name}</span> 👋
        </h1>
        <p className="text-white/80 text-sm">{user.email}</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
