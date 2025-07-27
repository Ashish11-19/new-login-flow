"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isLogin } from "@/utils/auth";
import { FaUser } from "react-icons/fa";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router.push("/");
      }
    };
    authenticate();
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, email, password };

    axios
      .post(`${baseURL}/signup`, payload)
      .then(() => {
        toast.success(
          <div>
            Account Created Successfully <br />
            Please Login
          </div>
        );
        router.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900 dark:from-gray-900 dark:to-black transition-colors duration-300 px-4">
      <div className="w-full max-w-md bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8 flex items-center justify-center gap-3">
          <FaUser className="text-blue-400 dark:text-blue-300 text-2xl" /> Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 dark:placeholder-gray-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 dark:placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 dark:placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-300 hover:underline hover:text-blue-100"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
