import { getServerSession } from "next-auth";
import ErrorHandler from "../utils/errorHandler";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const isAuthenticatedUser = async (req, res, next) => {
  // Get session using getServerSession and the NextAuth config options
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return next(new ErrorHandler("Login first to access this route", 401));
  }

  req.user = session.user; // Attach the user to the request object

  next(); // Continue to the next middleware or route handler
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resource`
        )
      );
    }

    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
