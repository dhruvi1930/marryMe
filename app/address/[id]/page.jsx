"use client";

import { use } from "react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateAddress from "@/components/user/UpdateAddress";

const getAddress = async (id) => {
  try {
    const { data } = await axios.get(`/api/address/${id}`, {
      withCredentials: true,
    });
    return data?.address || null;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};

const UpdateAddressPage = ({ params }) => {
  // Unwrap the `params` promise
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const { data: session, status } = useSession();
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      if (status === "authenticated" && id) {
        setLoading(true);
        const addressData = await getAddress(id);
        setAddress(addressData);
        setLoading(false);
      }
    };

    fetchAddress();
  }, [status, id]);

  if (loading) return <p>Loading address...</p>;
  if (!address) return <p>Address not found or an error occurred.</p>;

  return <UpdateAddress id={id} address={address} />;
};

export default UpdateAddressPage;
