import nextConnect from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { getProduct } from "@/backend/controller/productController";

const handler = nextConnect();
dbConnect();

handler.get(getProduct);

export default handler;
