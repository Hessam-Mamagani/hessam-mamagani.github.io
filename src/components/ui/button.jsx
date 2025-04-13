import React from "react";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  ghost: "hover:bg-gray-100",
};

export const Button = ({
  className = "",
  variant = "default",
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={`px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${buttonVariants[variant]} ${className}`}
      {...props}
    />
  );
}; 