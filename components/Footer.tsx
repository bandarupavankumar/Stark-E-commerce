import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-10">
      {/* Back to top */}
      <div className="bg-gray-200 py-3 text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm text-gray-700 hover:text-black"
        >
          Back to top
        </button>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:underline">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:underline">Careers</Link></li>
              <li><Link href="/press" className="text-gray-600 hover:underline">Press Releases</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li><Link href="/sell" className="text-gray-600 hover:underline">Sell products</Link></li>
              <li><Link href="/affiliates" className="text-gray-600 hover:underline">Become an Affiliate</Link></li>
              <li><Link href="/advertise" className="text-gray-600 hover:underline">Advertise Your Products</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Payment Products</h3>
            <ul className="space-y-2">
              <li><Link href="/business" className="text-gray-600 hover:underline">Business Card</Link></li>
              <li><Link href="/shop" className="text-gray-600 hover:underline">Shop with Points</Link></li>
              <li><Link href="/reload" className="text-gray-600 hover:underline">Reload Your Balance</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><Link href="/covid" className="text-gray-600 hover:underline">Your Account</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:underline">Returns Centre</Link></li>
              <li><Link href="/help" className="text-gray-600 hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-300 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Stark
              </Link>
            </div>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-600 hover:underline text-sm">Conditions of Use</Link>
              <Link href="/privacy" className="text-gray-600 hover:underline text-sm">Privacy Notice</Link>
              <Link href="/interest" className="text-gray-600 hover:underline text-sm">Interest-Based Ads</Link>
              <span className="text-gray-500 text-sm">© 2025, Stark.com, Inc. or its affiliates</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;