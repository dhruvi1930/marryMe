import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createProductReview } from "@/backend/controller/productController";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(createProductReview);

export default handler;
