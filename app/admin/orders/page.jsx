import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import queryString from "query-string";
import Orders from "@/components/admin/Orders";
import { getCookieName } from "@/helpers/helpers";

const getOrders = async (searchParams) => {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page || 1;

  const urlParams = { page };
  const searchQuery = queryString.stringify(urlParams);

  const nextCookies = cookies();
  const cookieName = getCookieName();

  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders?${searchQuery}`,
    {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
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
