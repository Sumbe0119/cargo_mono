import React from "react";
import { SpinnerIcon } from "../assets/icons";
interface Props {
  loading: boolean;
  title: string;
  onClick: () => void;
  className?: string;
}

const CustomButton = ({ loading, title, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-3 h-11 bg-primary rounded-xl  hover:stroke-primary hover:bg-primary/10 
        hover:border-primary/10 border border-primary text-sm text-white hover:text-primary transition-text ${className}`}
    >
      {loading && (
        <span>
          <SpinnerIcon />
        </span>
      )}
      <p className="font-medium">{title}</p>
    </button>
  );
};

export default CustomButton;
