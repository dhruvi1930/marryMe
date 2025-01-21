"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState([]);

  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {
    console.log(name);
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/auth/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data?.user) {
        router.push("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, error, registerUser, clearErrors }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
