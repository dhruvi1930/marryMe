import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import ListOrders from "@/components/orders/ListOrders";
import queryString from "query-string";
import { getCookieName } from "@/helpers/helpers";

const getOrders = async (searchParams) => {
  const nextCookies = await cookies();

  const cookieName = getCookieName();

  const nextAuthSessionToken = nextCookies.get(cookieName);

  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/me?${searchQuery}`,
      {
        headers: {
          Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

const MyOrderPage = async ({ searchParams }) => {
  const orders = await getOrders(searchParams);

  return <ListOrders orders={orders} />;
};

export default MyOrderPage;
