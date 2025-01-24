import nextConnect from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import {
  getAddresses,
  newAddress,
} from "@/backend/controller/addressController";

const handler = nextConnect();

dbConnect();

handler.get(getAddresses);
handler.post(newAddress);

export default handler;
