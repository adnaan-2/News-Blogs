import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// Connect to MongoDB
connectDB();

// Admin credentials - in real app, these would be in environment variables
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "adminpassword123";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.log("Missing credentials");
          return null;
        }
        
        const email = credentials.email.toLowerCase();
        
        // Check if this is the admin user
        if (email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
          console.log("Admin login successful");
          return {
            id: "admin-1",
            name: "Admin User",
            email: ADMIN_EMAIL,
            role: "admin"
          };
        }
        
        try {
          // For non-admin users, check the database
          await connectDB();
          
          const user = await User.findOne({ email });
          
          if (!user) {
            console.log("User not found");
            return null;
          }
          
          const isValidPassword = await compare(
            credentials.password,
            user.password
          );
          
          if (!isValidPassword) {
            console.log("Invalid password");
            return null;
          }
          
          console.log("Normal user login successful");
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: "user"
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-key-change-this",
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };