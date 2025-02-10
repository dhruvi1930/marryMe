import dbConnect from "@/backend/config/dbConnect";
import nextConnect from "next-connect";
import onError from "@/backend/middlewares/errors";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { getUsers } from "@/backend/controller/authController";

const handler = nextConnect({ onError });

// Connect to the database
dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getUsers);

export default handler;
