'use client'
import React from 'react';

export const SelectInput = ({ value, onChange, options, className, style }) => {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value)}
      className={`w-full border p-2 rounded-md ${className || ""}`}
      style={style}
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
