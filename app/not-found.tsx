"use client";

import React from "react";
import Link from "next/link"; // Assuming Next.js for routing
import { Frown, ArrowLeft, LifeBuoy } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-100">
        {/* Icon and Main Code */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <Frown className="w-16 h-16 text-red-500 animate-pulse" />
          <h1 className="text-6xl font-extrabold tracking-tight text-gray-900">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="mt-2 text-base text-gray-600">
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          {/* Primary Action: Go Home */}
          <Link href="/" passHref>
            <button className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back Home
            </button>
          </Link>

          {/* Secondary Action: Contact Support */}
          <Link href="/contact" passHref>
            <button className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out flex items-center justify-center">
              <LifeBuoy className="w-5 h-5 mr-2" />
              Contact Support
            </button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-400">Error Code: 404</p>
      </div>
    </div>
  );
}
