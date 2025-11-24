// pages/_app.tsx
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '../store';
import { env } from '../clerk-env';
import '../styles/globals.css';

import { CartProvider } from '@/context/CartContext';

function MyApp({ Component, pageProps }: AppProps) {
  if (!env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <div>Clerk key missing</div>;
  }

  return (
    <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} {...pageProps}>
      <Provider store={store}>
        
        <CartProvider>
          <Component {...pageProps} />
          <Toaster position="bottom-center" />
        </CartProvider>

      </Provider>
    </ClerkProvider>
  );
}

export default MyApp;
