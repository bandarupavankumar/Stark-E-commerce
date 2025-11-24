// pages/dashboard.tsx
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>
      {isSignedIn && (
        <div>
          <p>Hello, {user.firstName}!</p>
          <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
        </div>
      )}
    </div>
  );
}