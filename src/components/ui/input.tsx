import React, { InputHTMLAttributes, ForwardedRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'text', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <input
          ref={ref}
          type={type}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;