import React from "react";
import axios from "axios";
import ListProducts from "@/components/products/ListProducts";
import queryString from "query-string";

const getProducts = async (searchParams) => {
  // Await searchParams to properly access its properties
  const keyword = await searchParams.keyword;
  const page = await searchParams.page;
  const category = await searchParams.category;
  const ratings = await searchParams.ratings;
  const min = await searchParams.min;
  const max = await searchParams.max;

  const urlParams = {
    keyword,
    page,
    category,
    "ratings[gte]": ratings,
    "price[gte]": min,
    "price[lte]": max,
  };

  const searchQuery = queryString.stringify(urlParams);
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );
  return data;
};

const HomePage = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams);

  return <ListProducts data={productsData} />;
};

export default HomePage;
