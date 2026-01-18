'use client'
import React, { useState } from 'react';

export const Form = ({ children, onFinish, className }) => {
  const [formValues, setFormValues] = useState({});

  const updateValue = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinish?.(formValues);
  };
//
  // Pass value & onChange to child FormItem via cloneElement
  const enhancedChildren = React.Children.map(children, (child) => {
    if (child.type && child.type.name === "FormItem") {
      return React.cloneElement(child, { updateValue, formValues });
    }
    return child;
  });

  return (
    <form onSubmit={handleSubmit} className={className}>
      {enhancedChildren}
    </form>
  );
};
