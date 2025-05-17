'use client';

import LoginForm from '@/components/auth/login-form';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  return (
    <div className="container mx-auto py-10 px-4">
      {registered && (
        <div className="mb-6 p-3 bg-green-100 text-green-700 rounded max-w-md mx-auto">
          Account created successfully! Please login with your credentials.
        </div>
      )}
      
      <LoginForm />
    </div>
  );
}