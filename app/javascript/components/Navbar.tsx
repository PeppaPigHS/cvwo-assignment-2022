import React from 'react'
import { Link } from 'react-router-dom'
import { ClipboardListIcon } from '@heroicons/react/outline'

import { useUser } from './UserContext'
import { handleLogout } from '../utils/auth'

const Navbar = () => {
  const { user, userDispatch } = useUser()

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-stretch justify-between">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">Home page</span>
                <ClipboardListIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link
                to="/"
                className="p-4 font-bold text-gray-900 text-md hidden lg:block"
              >
                Task Management App
              </Link>
            </div>

            {user.user !== null ? (
              <div className="flex items-center gap-3">
                <span className="hidden max-w-xs overflow-hidden flex whitespace-nowrap sm:block">
                  Welcome,{' '}
                  <p className="inline-flex text-blue-600 font-medium">
                    {user.user.username}
                  </p>
                </span>
                <button
                  onClick={() => handleLogout(userDispatch)}
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <span className="flex items-center">
                <div className="flex rounded-md shadow-sm">
                  <Link
                    to="/signup"
                    type="button"
                    className="inline-flex items-center px-4 py-2 rounded-l-md border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/signin"
                    type="button"
                    className="-ml-px inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    Sign in
                  </Link>
                </div>
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
