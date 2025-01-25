import nextConnect from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import {
  getAddresses,
  newAddress,
} from "@/backend/controller/addressController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nextConnect({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(getAddresses);
handler.use(isAuthenticatedUser).post(newAddress);

export default handler;
