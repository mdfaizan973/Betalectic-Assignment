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
    <div>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 mt-8"
      >
        Why is this your Fav?
      </label>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 "
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
