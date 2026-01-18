'use client'
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const PasswordInput = ({ value, onChange, placeholder, className, style }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`w-full border p-2 rounded-md pr-10 ${className || ""}`}
        style={style}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};
