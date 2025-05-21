"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log("Attempting login with:", email);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        setError(`Authentication failed: ${result.error}`);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p>Don&apos;t have an account? <Link href="/auth/signup" className="text-blue-600 hover:underline">Sign up</Link></p>
      </div>
      
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="text-sm font-bold mb-2">Demo Accounts:</h3>
        <p className="text-xs">Admin: admin@example.com / adminpassword123</p>
        <p className="text-xs">User: user@example.com / password123</p>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded text-sm">
        <h3 className="font-bold mb-1">Admin Access:</h3>
        <p>Email: admin@example.com</p>
        <p>Password: adminpassword123</p>
      </div>
    </div>
  );
}