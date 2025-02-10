"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const newProduct = async (product) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`,
        product
      );

      if (data) {
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const uploadProductImages = async (formData, id) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/upload_images/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data?.data) {
        setLoading(false);
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateProduct = async (product, id) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${id}`,
        product
      );
      if (data) {
        setUpdated(true);
        router.replace(`/admin/products/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${id}`
      );

      if (data?.success) {
        router.replace(`/admin/products`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        setUpdated,
        newProduct,
        clearErrors,
        uploadProductImages,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
