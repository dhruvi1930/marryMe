import Product from "../models/product";
import APIFilters from "../utils/APIFilters";
import { cloudinary, uploads } from "../utils/cloudinary";
import fs from "fs";
import ErrorHandler from "../utils/errorHandler";

export const newProduct = async (req, res, next) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json({
    product,
  });
};

export const getProducts = async (req, res, next) => {
  const resPerPage = 6;
  const productsCount = await Product.countDocuments();

  const apiFilters = new APIFilters(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFilters.query;
  const filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);

  products = await apiFilters.query.clone();

  res.status(200).json({
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
};

export const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  res.status(200).json({
    product,
  });
};

export const uploadProductImages = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  const uploader = async (path) => await uploads(path, "marryme/products");

  const urls = [];
  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const imageUrl = await uploader(path);
    urls.push(imageUrl);
    fs.unlinkSync(path);
  }

  product = await Product.findByIdAndUpdate(req.query.id, {
    images: urls,
  });

  res.status(200).json({
    data: urls,
    product,
  });
};

export const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.query.id, req.body);

  res.status(200).json({
    product,
  });
};

export const deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found"));
  }
  // Deleting images associated with the product
  for (let i = 0; i < product.images.length; i++) {
    const res = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
  });
};

export const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    if (!req.user || !req.user._id) {
      return next(new ErrorHandler("User not authenticated.", 401));
    }

    let product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found.", 404));
    }

    console.log("Existing Reviews Debug:", product.reviews);

    // Remove invalid reviews (missing user)
    product.reviews = product.reviews.filter((r) => r.user);

    const existingReviewIndex = product.reviews.findIndex(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (existingReviewIndex !== -1) {
      product.reviews[existingReviewIndex].comment = comment;
      product.reviews[existingReviewIndex].rating = rating;
    } else {
      const review = {
        user: req.user._id, // Ensure user ID is included
        rating: Number(rating),
        comment,
      };
      product.reviews.push(review);
    }

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save(); // Save updated product

    res.status(200).json({
      success: true,
      message: "Review added successfully!",
    });
  } catch (error) {
    console.error("Error in createProductReview:", error);
    next(error);
  }
};
