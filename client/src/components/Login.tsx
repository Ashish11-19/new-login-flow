"use client";
import React, { useState } from "react";
import Link from "next/link";
import { baseURL } from "../utils/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setAuthentication } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email, password };

    axios
      .post(`${baseURL}/login`, payload)
      .then((res) => {
        console.log(res.data);
        setAuthentication(res.data.token);
        toast.success("Login Successfully");
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-[#111827] p-6 text-[#F9FAFB]">
        <div className="w-full max-w-sm bg-[#1F2937] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#F9FAFB]">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-[#9CA3AF]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#14b8a6] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Welcome Section */}
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-10 text-white text-center space-y-6">
        <h1 className="text-4xl font-bold">New Here?</h1>
        <p className="text-lg text-slate-300">
          Create an account and start your journey.
        </p>
        <Link
          href="/signup"
          className="mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-full font-semibold text-black transition"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
