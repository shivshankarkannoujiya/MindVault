import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, placeholder, label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-sm font-medium text-slate-700 block">
            {label}
          </label>
        )}

        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={`w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-200 focus:border-transparent transition-all ${className}`}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
