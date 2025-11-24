// pages/debug-env.tsx
import { env } from '../clerk-env';

export default function DebugEnv() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Debug</h1>
      <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <h2 className="font-bold text-yellow-800">Important:</h2>
        <p className="text-yellow-700">
          Make sure your environment variables are properly set in your `.env.local` file.
        </p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Variables:</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
          {JSON.stringify(env, null, 2)}
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Process Environment:</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
          {JSON.stringify(
            {
              NODE_ENV: process.env.NODE_ENV,
              NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
                ? '*** (exists but hidden for security)'
                : 'undefined',
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}