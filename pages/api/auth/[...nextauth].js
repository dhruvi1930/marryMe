import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/backend/config/dbConnect";

// Auth options for NextAuth
export const authOptions = {
  session: {
    strategy: "jwt", // Use JWT for session strategy
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        // Connect to the database
        await dbConnect();

        const { email, password } = credentials;

        // Find the user in the database by email
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        // Check if the password matches
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        // Return user if authentication is successful
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // Store user data in the token when the user logs in
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      // Attach user info from the token to the session
      session.user = token.user;

      // Ensure the password is not included in the session
      delete session?.user?.password;

      // Fetch updated user data (optional)
      if (session.user?._id) {
        const updatedUser = await User.findById(session.user._id);
        session.user = updatedUser;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for JWT encryption
};

// Default export to handle requests and server-side session handling
export default async function auth(req, res) {
  return await NextAuth(req, res, authOptions);
}
