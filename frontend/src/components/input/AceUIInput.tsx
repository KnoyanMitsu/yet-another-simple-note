import React from "react";

interface AceUIInputProps {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder: string;
  type: string;
}

function AceUIInput({
  label,
  value,
  onChange,
  placeholder,
  type,
}: AceUIInputProps) {
  const baseClasses =
    "w-full mt-1 border-2 border-secondary bg-background text-text focus:outline-none focus:border-primary p-3 rounded-xl transition-colors";

  return (
    <div className="mb-2">
      <label className="text-sm font-medium text-text ml-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          className={`${baseClasses} min-h-[120px] resize-y`}
          placeholder={placeholder}
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          className={baseClasses}
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default AceUIInput;
