import React from "react";

const CustomSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <select
      className="block w-full border border-gray rounded-xl bg-white font-regular px-4 py-3 text-sm text-dark outline outline-1 
      -outline-offset-1 outline-dark/20 placeholder:text-dark focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
      {...props}
    >
      {children}
    </select>
  );
};

export default CustomSelect;
