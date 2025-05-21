"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaUsers, FaNewspaper, FaCog, FaChartBar, FaComments, FaTags } from 'react-icons/fa';
import { signOut } from "next-auth/react";

type StatCard = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Use destructuring with underscore prefix to indicate intentional non-use
  const [stats, _setStats] = useState<StatCard[]>([
    { title: "Total Posts", value: 24, icon: <FaNewspaper size={24} />, color: "bg-blue-500" },
    { title: "Total Users", value: 156, icon: <FaUsers size={24} />, color: "bg-green-500" },
    { title: "Comments", value: 89, icon: <FaComments size={24} />, color: "bg-yellow-500" },
    { title: "Categories", value: 12, icon: <FaTags size={24} />, color: "bg-purple-500" }
  ]);
  
  const [recentPosts, _setRecentPosts] = useState([
    { id: "1", title: "Getting Started with Next.js", author: "Admin User", date: "May 16, 2025", views: 245 },
    { id: "2", title: "Advanced React Patterns", author: "Admin User", date: "May 14, 2025", views: 189 },
    { id: "3", title: "Using Tailwind in Large Projects", author: "Admin User", date: "May 12, 2025", views: 326 }
  ]);
  
  // Note: We removed the redundant reassignment of stats and recentPosts
  
  useEffect(() => {
    // Redirect if not admin
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
    
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [session, status, router]);
  
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };
  
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }
  
  if (status === "authenticated" && session?.user?.role === "admin") {
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          </div>
          <nav className="mt-6">
            <Link href="/admin/dashboard" className="flex items-center px-6 py-3 bg-gray-800 text-blue-300 border-l-4 border-blue-400">
              <FaChartBar className="mr-3" />
              Dashboard
            </Link>
            <Link href="/admin/users" className="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors">
              <FaUsers className="mr-3" />
              Users
            </Link>
            <Link href="/admin/posts" className="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors">
              <FaNewspaper className="mr-3" />
              Posts
            </Link>
            <Link href="/admin/settings" className="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors">
              <FaCog className="mr-3" />
              Settings
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Top navbar */}
          <div className="bg-white shadow-sm">
            <div className="flex justify-between items-center px-6 py-3">
              <h2 className="text-xl font-semibold">Dashboard Overview</h2>
              <div className="flex items-center">
                <span className="mr-4">Hi, {session.user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-4 text-white`}>
                      {stat.icon}
                    </div>
                    <div className="p-4">
                      <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent posts and Quick actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent posts */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
                <div className="border-b px-6 py-3 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Recent Posts</h3>
                  <Link href="/admin/posts" className="text-blue-600 hover:underline text-sm">View All</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentPosts.map(post => (
                        <tr key={post.id}>
                          <td className="py-3 px-4">
                            <span className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">{post.title}</span>
                          </td>
                          <td className="py-3 px-4">{post.author}</td>
                          <td className="py-3 px-4">{post.date}</td>
                          <td className="py-3 px-4">{post.views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-3 border-b">
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                </div>
                <div className="p-6 space-y-4">
                  <Link href="/admin/posts/new" className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    <FaNewspaper className="mr-3" /> Create New Post
                  </Link>
                  <Link href="/admin/users/new" className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    <FaUsers className="mr-3" /> Add New User
                  </Link>
                  <Link href="/admin/settings" className="flex items-center p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                    <FaCog className="mr-3" /> Update Settings
                  </Link>
                  <Link href="/" className="flex items-center p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <FaNewspaper className="mr-3" /> View Site
                  </Link>
                </div>
              </div>
            </div>

            {/* Activity log */}
            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-3 border-b">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                      <FaNewspaper size={14} />
                    </div>
                    <div>
                      <p className="font-medium">New post published: &quot;Getting Started with Next.js&quot;</p>
                      <p className="text-sm text-gray-500">May 16, 2025 - 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-600 p-2 rounded-full mr-3">
                      <FaUsers size={14} />
                    </div>
                    <div>
                      <p className="font-medium">New user registered: jane@example.com</p>
                      <p className="text-sm text-gray-500">May 15, 2025 - 10:45 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full mr-3">
                      <FaComments size={14} />
                    </div>
                    <div>
                      <p className="font-medium">New comment on &quot;Advanced React Patterns&quot;</p>
                      <p className="text-sm text-gray-500">May 14, 2025 - 4:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}