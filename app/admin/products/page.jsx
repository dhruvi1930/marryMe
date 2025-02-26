import React from "react";
import axios from "axios";
import queryString from "query-string";
import Products from "@/components/admin/Products";

const getProducts = async (searchParams) => {
  const urlParams = {
    page: searchParams.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${searchQuery}`
  );
  return data;
};

const AdminProductsPage = async ({ searchParams }) => {
  const data = await getProducts(searchParams);

  return <Products data={data} />;
};

export default AdminProductsPage;
