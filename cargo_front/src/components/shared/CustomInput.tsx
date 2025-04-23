import React from "react";

interface Props {
  value: any;
  onChange: (value: any) => void;
  error?: string;
  placeholder: string;
  showText?: boolean;
  simpleText?: string;
  type?: string;
  containerClass?: string;
  label?: string;
  inputMode?: any;

}

const CustomInput = ({
  value,
  onChange,
  error,
  placeholder,
  showText = false,
  simpleText,
  type,
  containerClass,
  label,
  inputMode
}: Props) => {
  return (
    <div className="space-y-2">
      {label ? (
        <label className="text-sm text-dark font-medium">{label}</label>
      ) : null}
      <div
        className={`relative h-11 border border-gray rounded-xl px-4 outline-none text-sm font-normal ${containerClass}`}
      >
        <input
          placeholder={placeholder}
          value={value}
          type={type || "text"}
          inputMode={inputMode || "text"}
          onChange={(e) => onChange(e?.target?.value)}
          className="w-full h-full outline-none"
        />
        {showText && (
          <p className="absolute right-4 top-2 text-sm text-dark/70 font-regular">
            {simpleText}
          </p>
        )}
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </div>
  );
};

export default CustomInput;
