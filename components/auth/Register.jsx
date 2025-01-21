"use client";

import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const { error, registerUser, clearErrors } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser({ name, email, password });
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mx-auto rounded shadow-lg mt-10 p-4 md:p-7 bg-white mb-20"
    >
      <form onSubmit={submitHandler}>
        <h2 className="text-2xl font-semibold mb-5">Register Account</h2>
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            placeholder="Type your name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="appearance-none shadow-lg rounded-md py-2 px-3 w-full border border-gray-200 bg-gray-100 hover:border-gray-400 focus:outline-none focus:border-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            placeholder="Type your email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="appearance-none shadow-lg rounded-md py-2 px-3 w-full border border-gray-200 bg-gray-100 hover:border-gray-400 focus:outline-none focus:border-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            placeholder="Type your password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            className="appearance-none shadow-lg rounded-md py-2 px-3 w-full border border-gray-200 bg-gray-100 hover:border-gray-400 focus:outline-none focus:border-gray-400"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-red-400 rounded-md py-2 px-3 text-white text-center my-2 hover:bg-red-600"
          >
            Register
          </button>
        </div>
        <hr className="mt-4" />
        <p className="text-center mt-5">
          Already have an account?
          <Link href="/login" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
