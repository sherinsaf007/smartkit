type ResultBoxProps = {
  children: React.ReactNode;
};

export default function ResultBox({ children }: ResultBoxProps) {
  return (
    <div
      style={{
        marginTop: "25px",
        padding: "15px",
        background: "#E7E1B1",
        borderRadius: "8px",
        fontWeight: "bold",
        color: "#0D530E",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}