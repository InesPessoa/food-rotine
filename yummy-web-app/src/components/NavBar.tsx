'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  const { data: session } = useSession();

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
                <Link href="/groceries" className="text-gray-600 hover:text-gray-900">
                  Groceries
                </Link>
                <Link href="/stock" className="text-gray-600 hover:text-gray-900">
                  Stock
                </Link>
                <Link href="/meal-planner" className="text-gray-600 hover:text-gray-900">
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
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white">
                        {session.user?.name?.[0] || 'U'}
                      </div>
                    )}
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl hidden group-hover:block">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {session.user?.name}
                    </div>
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">
                      {session.user?.email}
                    </div>
                  </div>
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