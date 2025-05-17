'use client';

import React from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
    const { data: session } = useSession();
    
    const handleLogout = async () => {
      await signOut({ redirect: true, callbackUrl: '/' });
    };
    
    return (
        <header>
            {/* Top bar with site title and login buttons */}
            <div className="bg-gray-900 text-white py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-3xl font-cursive">Site Title</h1>
                    <div className="flex space-x-2">
                        {session ? (
                            <>
                                <span className="py-1 px-3 text-gray-300">
                                    Hi, {session.user.name}
                                </span>
                                {session?.user?.role === 'admin' && (
                                    <Link href="/admin/dashboard">
                                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm transition-colors">
                                            Admin
                                        </button>
                                    </Link>
                                )}
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm transition-colors">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/auth/signup">
                                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm transition-colors">
                                        Signup
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation bar */}
            <div className="bg-gray-800 text-white shadow">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <nav className="flex space-x-6">
                        <Link href="/" className="py-3 px-2 hover:text-gray-300 transition-colors uppercase text-sm font-medium">Home</Link>
                        <Link href="/business" className="py-3 px-2 hover:text-gray-300 transition-colors uppercase text-sm font-medium">Business</Link>
                        <Link href="/tech" className="py-3 px-2 hover:text-gray-300 transition-colors uppercase text-sm font-medium">Tech</Link>
                        <Link href="/weather" className="py-3 px-2 hover:text-gray-300 transition-colors uppercase text-sm font-medium">Weather</Link>
                        <Link href="/automotive" className="py-3 px-2 hover:text-gray-300 transition-colors uppercase text-sm font-medium">Automotive</Link>
                        <Link href="/pakistan" className="py-3 px-2 hover:text-gray-300 transition-colors uppercase text-sm font-medium">Pakistan</Link>
                        <Link href="/global" className="py-3 px-2 hover:text-gray-300 transition-colors uppercase text-sm font-medium">Global</Link>
                        <div className="group relative py-3 px-2">
                            <span className="uppercase text-sm font-medium cursor-pointer hover:text-gray-300 transition-colors">Lifestyle</span>
                            <div className="hidden group-hover:block absolute left-0 top-full bg-gray-800 w-48 shadow-lg z-10">
                                <Link href="/lifestyle/health" className="block px-4 py-2 hover:bg-gray-700">Health</Link>
                                <Link href="/lifestyle/sports" className="block px-4 py-2 hover:bg-gray-700">Sports</Link>
                                <Link href="/lifestyle/islam" className="block px-4 py-2 hover:bg-gray-700">Islam</Link>
                                <Link href="/lifestyle/education" className="block px-4 py-2 hover:bg-gray-700">Education</Link>
                                <Link href="/lifestyle/entertainment" className="block px-4 py-2 hover:bg-gray-700">Entertainment</Link>
                            </div>
                        </div>
                    </nav>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="bg-gray-700 text-white px-3 py-1 rounded text-sm w-64 focus:outline-none"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;