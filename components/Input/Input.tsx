type InputProps = {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "8px",
        marginBottom: "20px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxSizing: "border-box",
      }}
    />
  );
}