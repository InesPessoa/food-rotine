'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo.svg"
                alt="Yummy Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 text-2xl font-bold text-gray-900">Yummy</span>
            </Link>
            {session ? (
              <>
                <Link 
                  href="/groceries" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/groceries')
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Groceries
                </Link>
                <Link 
                  href="/stock" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/stock')
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Stock
                </Link>
                <Link 
                  href="/meal-planner" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/meal-planner')
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Meal Planner
                </Link>
              </>
            ) : null}
          </div>
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
                <div className="flex items-center space-x-2">
                  <Image
                    src={session.user?.image || '/assets/default-avatar.png'}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {session.user?.name}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 