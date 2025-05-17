"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect if not admin
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
    
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [session, status, router]);
  
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (status === "authenticated" && session?.user?.role === "admin") {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Logged in as Admin
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-gray-600 mb-4">Manage registered users</p>
            <Link href="/admin/users" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Manage Users
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Content Management</h2>
            <p className="text-gray-600 mb-4">Add, edit, or delete blog posts</p>
            <Link href="/admin/posts" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Manage Posts
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
            <p className="text-gray-600 mb-4">Update site configuration</p>
            <Link href="/admin/settings" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Edit Settings
            </Link>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Name:</strong> {session.user.name}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {session.user.email}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Role:</strong> {session.user.role}
          </p>
        </div>
      </div>
    );
  }
  
  return null;
}