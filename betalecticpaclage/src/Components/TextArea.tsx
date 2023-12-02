import React from "react";

interface TextAreaProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <textarea placeholder={placeholder} value={value} onChange={onChange} />
  );
};

export default TextArea;
