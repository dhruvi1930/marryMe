import dbConnect from "@/backend/config/dbConnect";
import nextConnect from "next-connect";
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { myOrders } from "@/backend/controller/orderController";

const handler = nextConnect({ onError });

// Connect to the database
dbConnect();

handler.use(isAuthenticatedUser).get(myOrders);

export default handler;
