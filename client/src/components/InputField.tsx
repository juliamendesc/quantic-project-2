import React, { useState } from "react";

interface InputFieldProps {
  id: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  error?: string | null;
  disabled?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  name,
  value,
  onChange,
  onBlur,
  label,
  required = false,
  placeholder,
  min,
  max,
  error,
  disabled = false,
  className = "",
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur?.(e);
  };

  const hasError = touched && error;
  const baseInputClasses = `
    mt-2 w-full px-3 py-2 border rounded-md 
    focus:outline-none focus:ring-2 transition
    disabled:bg-gray-100 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed
    bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100
  `;

  const errorClasses = hasError
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300 dark:border-neutral-600 focus:ring-primary-500 focus:border-primary-500";

  return (
    <div className={`mb-4 ${className}`}>
      <label
        className="block font-semibold text-gray-700 dark:text-neutral-300 mb-1"
        htmlFor={id}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        className={`${baseInputClasses} ${errorClasses}`}
        aria-required={required}
        aria-invalid={hasError ? true : false}
        aria-describedby={hasError ? `${id}-error` : undefined}
      />
      {hasError && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
