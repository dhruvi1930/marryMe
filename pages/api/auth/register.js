import dbConnect from "@/backend/config/dbConnect";
import nextConnect from "next-connect";
import { registerUser } from "@/backend/controller/authController";

const handler = nextConnect();

dbConnect;

handler.post(registerUser);

export default handler;
