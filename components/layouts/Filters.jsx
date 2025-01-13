"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import StarRatings to avoid hydration errors
const StarRatings = dynamic(() => import("react-star-ratings"), { ssr: false });

const Filters = () => {
  let queryParams;

  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    if (typeof window !== "undefined") {
      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }
  }

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <a
        className="md:hidden mb-5 w-full text-center px-4 py-0 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
      >
        Filter by
      </a>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Price ($)</h3>
        <div className="grid md:grid-cols-3 gap-x-2">
          <div className="mb-4">
            <input
              name="min"
              type="number"
              placeholder="Min"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              name="max"
              type="number"
              placeholder="Max"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            />
          </div>
          <div className="mb-4">
            <button className="px-1 py-2 text-center w-full inline-block text-white bg-red-400 border border-transparent rounded-md hover:bg-blue-700">
              Go
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Category</h3>
        <ul className="space-y-1">
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Women"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Women")}
              />
              <span className="ml-2 text-gray-500"> Women </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Men"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Men")}
              />
              <span className="ml-2 text-gray-500"> Men </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Couple"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Couple")}
              />
              <span className="ml-2 text-gray-500"> Couple </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Family"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Family")}
              />
              <span className="ml-2 text-gray-500"> Family </span>
            </label>
          </li>
        </ul>
        <hr className="my-4" />
        <h3 className="font-semibold mb-2">Ratings</h3>
        <ul className="space-y-1">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                name="ratings"
                type="checkbox"
                value={rating}
                defaultChecked={checkHandler("ratings", `${rating}`)}
              />
              <span>
                <StarRatings
                  rating={rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name="rating"
                />
              </span>
            </label>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Filters;
