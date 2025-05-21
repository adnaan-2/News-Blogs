import "next-auth";
// Remove the unused import or use it
// import { JWT as NextAuthJWT } from "next-auth/jwt";

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
}import React, { forwardRef, type ComponentPropsWithoutRef } from 'react';

// Define your input props
interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-gray-700 mb-2" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full p-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded`}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;