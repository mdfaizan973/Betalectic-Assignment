import React from "react";

interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Search for NPM Packages
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="px-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500  "
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default TextInput;
