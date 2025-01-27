"use client";
import Profile from "@/components/auth/Profile";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const getAddresses = async () => {
  const { data } = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/address`, {
    withCredentials: true, // Ensure cookies are sent
  });

  return data?.addresses;
};

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (status === "authenticated") {
        try {
          const addresses = await getAddresses();
          setAddresses(addresses);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      }
    };

    fetchAddresses();
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Please log in first.</p>;

  return <Profile addresses={addresses} />;
};

export default ProfilePage;
