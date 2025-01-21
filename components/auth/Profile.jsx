"use client";
import React, { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={
              user?.avatar ? user?.avatar?.url : "/images/default_product.png"
            }
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.name}</h5>
          <p>
            <b>Email: </b>
            {user?.email} <b> | Joined On:</b>
            {user?.createdAt}
          </p>
        </figcaption>
      </figure>
      <hr className="my-4" />
      <Link href="/address/new">
        <button className="py-2 px-4 inline-block rounded-md text-red-600 border border-gray-300 hover:bg-gray-100">
          <i className="mr-1 fa fa fa-plus"></i> Add new address
        </button>
      </Link>
      <hr className="my-4" />
    </>
  );
};

export default Profile;
