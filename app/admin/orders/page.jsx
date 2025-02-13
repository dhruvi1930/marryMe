import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import queryString from "query-string";
import ListOrders from "@/components/orders/ListOrders";
import Orders from "@/components/admin/Orders";

const getOrders = async (searchParams) => {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page || 1;

  const urlParams = { page };
  const searchQuery = queryString.stringify(urlParams);

  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders?${searchQuery}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
};

const AdminOrdersPage = async ({ searchParams }) => {
  const orders = await getOrders(searchParams);

  return <Orders orders={orders} />;
};

export default AdminOrdersPage;
