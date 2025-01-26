import nextConnect from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import {
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/backend/controller/addressController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nextConnect({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(getAddress);
handler.use(isAuthenticatedUser).put(updateAddress);
handler.use(isAuthenticatedUser).delete(deleteAddress);

export default handler;
