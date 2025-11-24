import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';
import { useState, useEffect, useRef } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import UserButtonWrapper from './UserButton';
type HeaderProps = {
  onSearch: (query: string) => void;
};

export const Header = ({ onSearch }: HeaderProps) => {
  const router = useRouter();
  const { cartItemCount, toggleCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#131921] text-white">
      <div className="flex items-center p-1 flex-grow py-2">
        {/* Logo */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Link href="/">
            <div className="cursor-pointer pt-1 px-2">
              <span className="text-2xl font-bold text-white">amazon</span>
            </div>
          </Link>
        </div>
        
        {/* Search */}
        <form 
          onSubmit={handleSubmit}
          className={`hidden sm:flex items-center h-10 rounded-md flex-grow ${
            isSearchFocused ? 'ring-2 ring-yellow-500' : ''
          }`}
        >
          <div className="relative flex items-center flex-grow h-full bg-white rounded-l-md overflow-hidden border border-gray-300">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search Amazon"
              className="h-full w-full px-4 py-2 text-gray-800 focus:outline-none"
              aria-label="Search Amazon"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <button 
            type="submit"
            className="h-10 w-12 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center rounded-r-md border-l border-yellow-500"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-800" />
          </button>
        </form>

        {/* Right */}
        <div className="flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButtonWrapper />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md font-medium">
                  Hello, Sign in

Account & Lists
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div className="relative link flex items-center cursor-pointer" onClick={toggleCart}>
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold text-xs flex items-center justify-center">
              {cartItemCount}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">Cart</p>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-[#232F3E] text-sm text-white">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Today's Deals</p>
        <p className="link">Customer Service</p>
        <p className="link">Registry</p>
        <p className="link hidden md:inline-flex">Gift Cards</p>
        <p className="link hidden md:inline-flex">Sell</p>
      </div>
    </header>
  );
};
