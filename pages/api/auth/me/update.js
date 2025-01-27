import dbConnect from "@/backend/config/dbConnect";
import nextConnect from "next-connect";
import { updateProfile } from "@/backend/controller/authController";
import onError from "@/backend/middlewares/errors";
import upload from "@/backend/utils/multer";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

const handler = nextConnect({ onError });

// Connect to the database
dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");

handler.use(isAuthenticatedUser, uploadMiddleware).put(updateProfile);

export default handler;
