import dbConnect from "@/backend/config/dbConnect";
import nextConnect from "next-connect";
import onError from "@/backend/middlewares/errors";
import { webhook } from "@/backend/controller/orderController";

const handler = nextConnect({ onError });

// Connect to the database
dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhook);

export default handler;
