import dbConnect from "@/backend/config/dbConnect";
import nextConnect from "next-connect";
import onError from "@/backend/middlewares/errors";
import upload from "@/backend/utils/multer";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { uploadProductImages } from "@/backend/controller/productController";

const handler = nextConnect({ onError });

// Connect to the database
dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");

handler
  .use(uploadMiddleware, isAuthenticatedUser, authorizeRoles("admin"))
  .post(uploadProductImages);

export default handler;
