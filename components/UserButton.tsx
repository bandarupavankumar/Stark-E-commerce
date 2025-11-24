// components/UserButton.tsx
import { UserButton } from '@clerk/nextjs';

export default function UserButtonWrapper() {
  return (
    <div className="flex items-center">
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: 'h-10 w-10',
          },
        }}
      />
    </div>
  );
}