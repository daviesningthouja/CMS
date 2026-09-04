import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90",

  secondary:
    "bg-secondary text-secondary-foreground hover:opacity-80",

  danger:
    "bg-danger text-danger-foreground hover:opacity-90",

  ghost:
    "bg-transparent text-foreground hover:bg-muted",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        rounded-app
        px-4
        py-2
        text-sm
        font-medium
        transition
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-primary
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}