import nextConnect from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import {
  getProducts,
  newProduct,
} from "@/backend/controller/productController";

const handler = nextConnect();
dbConnect();

handler.get(getProducts);
handler.post(newProduct);

export default handler;
