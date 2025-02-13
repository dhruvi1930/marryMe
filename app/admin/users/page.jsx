import axios from "axios";
import React from "react";

import { cookies } from "next/headers";
import queryString from "query-string";
import { getCookieName } from "@/helpers/helpers";
import Users from "@/components/admin/Users";

const getUsers = async (searchParams) => {
  try {
    const nextCookies = cookies();
    const cookieName = getCookieName();

    const nextAuthSessionToken = nextCookies.get(cookieName);

    const urlParams = {
      page: searchParams.page || 1,
    };

    const searchQuery = queryString.stringify(urlParams);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?${searchQuery}`;

    console.log("Fetching data from:", apiUrl);

    const { data } = await axios.get(apiUrl, {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
      },
    });

    return data;
  } catch (error) {
    console.log("Error fetching users:", error.response?.data || error.message);
    throw error;
  }
};

const AdminUsersPage = async ({ searchParams }) => {
  const users = await getUsers(searchParams);

  return <Users data={users} />;
};

export default AdminUsersPage;
