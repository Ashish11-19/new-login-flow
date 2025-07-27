"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, email, password };

    axios
      .post(`${baseURL}/signup`, payload)
      .then(() => { // ✅ removed unused 'res'
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-6 py-12 text-white text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold">Welcome</h1>
        <p className="text-base md:text-lg text-slate-300 max-w-md">
          Signup with your email ID and password to continue.
        </p>
        <Link
          href="/login"
          className="mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-full font-semibold text-black transition"
        >
          Go to Login
        </Link>
      </div>

      {/* Right Side - SignUp Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#111827] px-6 py-12">
        <div className="w-full max-w-sm bg-[#1F2937] p-6 md:p-8 rounded-lg shadow-md text-[#F9FAFB]">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-[#374151] bg-transparent text-[#F9FAFB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#374151] bg-transparent text-[#F9FAFB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#374151] bg-transparent text-[#F9FAFB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#14b8a6] text-black py-2 rounded-md hover:bg-[#0d9488] transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-[#9CA3AF]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#14b8a6] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
