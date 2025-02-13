import dbConnect from "@/backend/config/dbConnect";
import nextConnect from "next-connect";
import { registerUser } from "@/backend/controller/authController";
import onError from "@/backend/middlewares/errors";

// CORS middleware
const allowCors = (handler) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return handler(req, res);
};

const handler = nextConnect({ onError });

// Connect to the database
dbConnect();

handler.post(registerUser);

export default allowCors(handler);
