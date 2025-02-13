import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import Shipping from "@/components/cart/Shipping";
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

const ShippingPage = async () => {
  const addresses = await getAddresses();

  return <Shipping addresses={addresses} />;
};

export default ShippingPage;
