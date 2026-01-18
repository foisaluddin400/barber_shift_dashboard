'use client'
import React from 'react';

export const FormItem = ({ label, name, children, updateValue, formValues }) => {
  const child = React.cloneElement(children, {
    value: formValues[name] || "",
    onChange: (val) => updateValue(name, val),
  });

  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-semibold">{label}</label>}
      {child}
    </div>
  );
};
