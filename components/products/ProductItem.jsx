"use client";

import React, { useContext } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import CartContext from "@/context/CartContext";

const StarRatings = dynamic(() => import("react-star-ratings"), { ssr: false });

const ProductItem = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
      stock: product.stock,
      seller: product.seller,
    });
  };

  return (
    <article className="border border-gray-200 bg-white shadow-sm rounded-lg flex flex-col overflow-hidden">
      {/* Product Image */}
      <div className="relative w-full h-56 bg-gray-100">
        <Image
          src={
            product?.images[0]
              ? product?.images[0].url
              : "/images/default_product.png"
          }
          alt={product?.name || "Product"}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link
            className="hover:text-blue-600 font-semibold text-lg"
            href={`/product/${product._id}`}
          >
            {product.name}
          </Link>
          <div className="flex items-center space-x-2 my-2">
            <StarRatings
              rating={product?.ratings || 0}
              starRatedColor="#ffb829"
              numberOfStars={5}
              starDimension="18px"
              starSpacing="1px"
              name="rating"
            />
            <span className="text-yellow-500 text-sm">
              {product?.ratings?.toFixed(1) || "0.0"}
            </span>
          </div>
          <p className="text-gray-500 text-sm line-clamp-3">
            {product?.description || "No description available"}
          </p>
        </div>
        {/* Product Price and Button */}
        <div className="mt-4">
          <p className="text-xl font-bold text-black mb-1">
            ₹ {product?.price?.toFixed(2) || "0.00"}
          </p>
          <p className="text-green-500 text-sm">Free Shipping</p>
          <button
            onClick={addToCartHandler}
            className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
