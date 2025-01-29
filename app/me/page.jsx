import Profile from "@/components/auth/Profile";
import axios from "axios";
import React from "react";
import { cookies } from "next/headers";

const getAddresses = async () => {
  const nextCookies = await cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/address`,
      {
        headers: {
          Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
        },
      }
    );

    console.log(data);

    return data?.addresses;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
};

const ProfilePage = async () => {
  const addresses = await getAddresses();

  return <Profile addresses={addresses} />;
};

export default ProfilePage;
