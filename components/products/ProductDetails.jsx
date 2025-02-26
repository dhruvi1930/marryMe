"use client";

import React, { useContext, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import BreadCrumbs from "../layouts/BreadCrumbs";
import CartContext from "@/context/CartContext";
import NewReview from "../review/NewReview";
import OrderContext from "@/context/OrderContext";
import Reviews from "../review/Reviews";

const ProductDetails = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { canUserReview, canReview } = useContext(OrderContext);

  const [showStarRatings, setShowStarRatings] = useState(false);

  useEffect(() => {
    canUserReview(product?._id);
    setShowStarRatings(true);
  }, []);

  const inStock = product?.stock >= 1;

  const addToCartHandler = () => {
    addItemToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.stock,
      seller: product.seller,
    });
  };

  const breadCrumbs = [
    { name: "Home", url: "/" },
    {
      name: `${product?.name?.substring(0, 100)}...`,
      url: `/products/${product?._id}`,
    },
  ];

  return (
    <>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <img
                  className="object-cover inline-block"
                  src={
                    product?.images[0]
                      ? product?.images[0].url
                      : "/images/default_product.png"
                  }
                  alt="Product Title"
                  width="340"
                  height="340"
                />
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>
              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  {showStarRatings && (
                    <StarRatings
                      rating={product?.ratings}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="2px"
                      name="rating"
                    />
                  )}
                </div>
                <span className="text-yellow-500">{product?.ratings}</span>
                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>
                <span className="text-green-500">Verified</span>
              </div>
              <p className="mb-4 font-semibold text-xl">₹{product?.price}</p>
              <p className="mb-4 text-gray-500">{product?.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  disabled={!inStock}
                  onClick={addToCartHandler}
                  className="px-4 py-2 inline-block text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                >
                  <i className="fa fa-shopping-cart mr-2">Add to cart</i>
                </button>
              </div>
              <ul className="mb-5">
                <li className="mb-1">
                  <b className="font-medium w-36 inline-block">Stock</b>
                  {inStock ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </li>
                <li className="mb-1">
                  <b className="font-medium w-36 inline-block">Category:</b>
                  <span className="text-gray-500">{product?.category}</span>
                </li>
                <li className="mb-1">
                  <b className="font-medium w-36 inline-block">
                    Seller / Brand:
                  </b>
                  <span className="text-gray-500">{product?.seller}</span>
                </li>
              </ul>
            </main>
          </div>
          {canReview && <NewReview product={product} />}
          <hr />
          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
              Other Customers Reviews
            </h1>
            <Reviews reviews={product?.reviews} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
