import NextAuth, { DefaultSession } from "next-auth"
import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extends the built-in session types
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
  
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}