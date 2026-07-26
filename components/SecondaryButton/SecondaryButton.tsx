type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function SecondaryButton({
  children,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "15px",
        background: "#E5E7EB",
        color: "#333",
        border: "none",
        borderRadius: "8px",
        fontSize: "18px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {children}
    </button>
  );
}