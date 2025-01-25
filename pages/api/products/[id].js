import nextConnect from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { getProduct } from "@/backend/controller/productController";
import onError from "@/backend/middlewares/errors";

const handler = nextConnect({ onError });
dbConnect();

handler.get(getProduct);

export default handler;
