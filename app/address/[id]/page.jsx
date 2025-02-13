import axios from "axios";
import React from "react";

import { cookies } from "next/headers";
import UpdateAddress from "@/components/user/UpdateAddress";
import { getCookieName } from "@/helpers/helpers";

const getAddress = async (id) => {
  const nextCookies = cookies();
  const cookieName = getCookieName();

  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/address/${id}`,
    {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data?.address;
};

const UpdateAddressPage = async ({ params }) => {
  const address = await getAddress(params?.id);

  return <UpdateAddress id={params?.id} address={address} />;
};

export default UpdateAddressPage;
