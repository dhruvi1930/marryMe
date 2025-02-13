import axios from "axios";
import React from "react";

import { cookies } from "next/headers";
import UpdateOrder from "@/components/admin/UpdateOrder";
import { getCookieName } from "@/helpers/helpers";

const getOrder = async (id) => {
  const nextCookies = cookies();
  const cookieName = getCookieName();

  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`,
    {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
};

const AdminOrderDetailsPage = async ({ params }) => {
  const data = await getOrder(params?.id);

  return <UpdateOrder order={data?.order} />;
};

export default AdminOrderDetailsPage;
