import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import ListOrders from "@/components/orders/ListOrders";

const getOrders = async () => {
  const nextCookies = await cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/me`,
      {
        headers: {
          Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

const MyOrderPage = async () => {
  const orders = await getOrders();

  return <ListOrders orders={orders} />;
};

export default MyOrderPage;
