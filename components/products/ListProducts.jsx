"use client";

import React from "react";
import Filters from "../layouts/Filters";
import ProductItem from "./ProductItem";
import CustomPagination from "../layouts/CustomPagination";

const ListProducts = ({ data }) => {
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />
          <main className="md:w-2/3 lg:w-3/4 px-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.products?.map((product) => (
                <ProductItem key={product?._id} product={product} />
              ))}
            </div>
            <div className="mt-6">
              <CustomPagination
                resPerPage={data?.resPerPage}
                productsCount={data?.filteredProductsCount}
              />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ListProducts;
