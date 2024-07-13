import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-lg  border px-2 py-1 text-sm shadow-md sm:gap-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
