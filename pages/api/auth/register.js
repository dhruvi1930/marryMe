import dbConnect from "@/backend/config/dbConnect";
import nextConnect from "next-connect";
import { registerUser } from "@/backend/controller/authController";
import onError from "@/backend/middlewares/errors";

const handler = nextConnect({ onError });

// Connect to the database
dbConnect();

handler.post(registerUser);

export default handler;
