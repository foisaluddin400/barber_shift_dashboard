'use client'
import React from 'react';

export const Button = ({ children, loading, className, ...props }) => {
  return (
    <button
      className={`w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-md flex justify-center items-center gap-2 ${className || ""}`}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};
