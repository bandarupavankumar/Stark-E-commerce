// clerk-env.ts
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

export const env = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: clerkPublishableKey,
};