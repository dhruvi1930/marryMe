import React from "react";
import axios from "axios";

import UpdateProduct from "@/components/admin/UpdateProduct";

const getProduct = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
  );
  return data;
};

const AdminUpdateProductPage = async ({ params }) => {
  const data = await getProduct(params.id);

  return <UpdateProduct data={data.product} />;
};

export default AdminUpdateProductPage;
