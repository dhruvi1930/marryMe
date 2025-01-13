"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import StarRatings to avoid hydration errors
const StarRatings = dynamic(() => import("react-star-ratings"), { ssr: false });

const ProductItem = ({ product }) => {
  return (
    <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:1/4 flex p-3">
          <div
            style={{
              width: "80%",
              height: "70%",
              position: "relative",
            }}
          >
            <Image
              src={
                product?.images[0]
                  ? product?.images[0].url
                  : "/images/default_product.png"
              }
              alt={product?.name || "Product"}
              height="240"
              width="240"
            />
          </div>
        </div>
        <div className="md:w-2/4">
          <div className="p-4">
            <Link
              className="hover:text-blue-600"
              href={`/product/${product._id}`}
            >
              {product.name}
            </Link>
            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <div className="my-1">
                  <StarRatings
                    rating={product?.ratings || 0}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="18px"
                    starSpacing="1px"
                    name="rating"
                  />
                </div>
              </div>
              <b className="text-gray-300">•</b>
              <span className="ml-1 text-yellow-500">
                {product?.ratings?.toFixed(1) || "0.0"}
              </span>
            </div>
            <p className="text-gray-500 mb-2">
              {product?.description?.substring(0, 150) || "No description"}...
            </p>
          </div>
        </div>
        <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="p-5">
            <span className="text-xl font-semibold text-black">
              ₹ {product?.price?.toFixed(2) || "0.00"}
            </span>
            <p className="text-green-500">Free Shipping</p>
            <div className="my-3">
              <button className="px-4 py-2 inline-block text-white bg-red-400 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
