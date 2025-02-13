import axios from "axios";
import React from "react";

import { cookies } from "next/headers";
import UpdateUser from "@/components/admin/UpdateUser";
import { getCookieName } from "@/helpers/helpers";

const getUser = async (id) => {
  const nextCookies = cookies();

  const cookieName = getCookieName();

  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`,
    {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
};

const AdminUserDetailsPage = async ({ params }) => {
  const data = await getUser(params?.id);

  return <UpdateUser user={data?.user} />;
};

export default AdminUserDetailsPage;
