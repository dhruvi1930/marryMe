import Link from "next/link";
import React from "react";

const UserAddresses = ({ addresses = [] }) => {
  if (!Array.isArray(addresses)) {
    console.error("Expected an array but got:", addresses);
    return <p>No addresses available.</p>;
  }

  return addresses.map((address) => (
    <Link href={`/address/${address._id}`} key={address._id}>
      <div className="mb-5 gap-4">
        <figure className="w-full bg-gray-100 rounded-md p-4 flex align-center cursor-pointer">
          <div className="mr-3">
            <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2">
              <i className="fa fa-map-marker-alt"></i>
            </span>
          </div>
          <figcaption className="text-gray-600">
            <p>
              {address.street} <br /> {address.city}, {address.state},{" "}
              {address.zipCode}, {address.country}
              <br />
              Phone No: {address.phoneNo}
            </p>
          </figcaption>
        </figure>
      </div>
    </Link>
  ));
};

export default UserAddresses;
