'use client'
import React from 'react';

export const TextInput = ({ value, onChange, placeholder, className, style }) => {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className={`w-full border p-2 rounded-md ${className || ""}`}
      style={style}
    />
  );
};
