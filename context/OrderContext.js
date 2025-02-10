"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const updateOrder = async (order, id) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`,
        order
      );
      if (data.success) {
        setUpdated(true);
        router.replace(`/admin/orders/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`
      );

      if (data?.success) {
        router.replace(`/admin/orders`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <OrderContext.Provider
      value={{
        error,
        updated,
        setUpdated,
        updateOrder,
        deleteOrder,
        clearErrors,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
