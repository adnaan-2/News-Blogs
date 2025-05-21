// filepath: d:\industry projects\news-blogging\src\app\admin\settings\page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface SiteSettings {
  siteName: string;
  tagline: string;
  postsPerPage: number;
  allowComments: boolean;
  theme: string;
}

export default function SiteSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "News Blog",
    tagline: "Your source for the latest news",
    postsPerPage: 10,
    allowComments: true,
    theme: "light"
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Redirect if not admin
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
    
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [session, status, router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    
    // Handle checkbox inputs differently
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setSettings(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      // Handle other input types
      setSettings(prev => ({
        ...prev,
        [name]: name === "postsPerPage" ? parseInt(value) : value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Settings saved successfully!");
    }, 800);
  };
  
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <Link href="/admin/dashboard" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
          Back to Dashboard
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="siteName">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="tagline">
                Tagline
              </label>
              <input
                type="text"
                id="tagline"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="postsPerPage">
                Posts Per Page
              </label>
              <input
                type="number"
                id="postsPerPage"
                name="postsPerPage"
                value={settings.postsPerPage}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                min="1"
                max="50"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="theme">
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="blue">Blue</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allowComments"
                name="allowComments"
                checked={settings.allowComments}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="ml-2 text-gray-700" htmlFor="allowComments">
                Allow Comments
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}