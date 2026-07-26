export default function Statistics() {
  const stats = [
    { number: "13+", label: "Working Tools" },
    { number: "100%", label: "Free to Use" },
    { number: "24/7", label: "Available" },
    { number: "Fast", label: "Instant Results" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "80px",
        marginTop: "70px",
        marginBottom: "80px",
        flexWrap: "wrap",
      }}
    >
      {stats.map((item) => (
        <div
          key={item.label}
          style={{
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#0D530E",
              fontSize: "42px",
              marginBottom: "8px",
            }}
          >
            {item.number}
          </h2>

          <p
            style={{
              color: "#666",
              fontSize: "18px",
            }}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}