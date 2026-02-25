'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <span className="text-2xl">🛹</span>
            <span>Skateboard Rentals</span>
          </Link>

          {/* Nav Links */}
          <div className="flex gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/') && !pathname.startsWith('/rentals')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Browse
            </Link>
            <Link
              href="/rentals"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/rentals')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              My Rentals
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
