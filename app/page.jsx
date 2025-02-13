import React from "react";
import axios from "axios";
import ListProducts from "@/components/products/ListProducts";

import queryString from "query-string";

export const metadata = {
  title: "Marry Me",
};

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
    "ratings[gte]": searchParams.ratings,
  };

  const searchQuery = queryString.stringify(urlParams);

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?${searchQuery}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null; // Or handle the error as needed
  }
};

const HomePage = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams);

  return <ListProducts data={productsData} />;
};

export default HomePage;
