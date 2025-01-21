import dbConnect from "@/backend/config/dbConnect";
import nextConnect from "next-connect";
import { registerUser } from "@/backend/controller/authController";

const handler = nextConnect();

console.log("dvbsdghjfvs");
dbConnect;

console.log("dvbsdghjfvs");

handler.post(registerUser);
console.log("dvbsdghjfvs");

export default handler;
