import Profile from "@/components/auth/Profile";
import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/helpers";

const getAddresses = async () => {
  const nextCookies = await cookies();

  const cookieName = getCookieName();

  const nextAuthSessionToken = nextCookies.get(cookieName);

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/address`,
      {
        headers: {
          Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
        },
      }
    );

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
