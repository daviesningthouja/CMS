import type {InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    error?: string;
}

export function Input({
    label,
    error,
    id,
    className = "",
    ...props
}: InputProps) {
    return (<div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`
          w-full
          rounded-app
          border
          bg-background
          px-3
          py-2.5
          text-sm
          outline-none
          transition
          placeholder:text-muted-foreground
          focus:border-primary
          focus:ring-2
          focus:ring-primary/20
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${error ? "border-danger" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}