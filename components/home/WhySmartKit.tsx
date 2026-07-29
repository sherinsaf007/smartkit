export default function WhySmartKit() {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      desc: "Instant calculations with no waiting.",
    },
    {
      icon: "🔒",
      title: "Secure",
      desc: "No signup. No personal data stored.",
    },
    {
      icon: "📱",
      title: "Responsive",
      desc: "Works perfectly on mobile and desktop.",
    },
    {
      icon: "🆓",
      title: "100% Free",
      desc: "Every tool is completely free to use.",
    },
  ];

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "100px auto",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "42px",
          color: "#0D530E",
          marginBottom: "15px",
        }}
      >
        ❤️ Why Choose SmartKit?
      </h2>

      <p
        style={{
          color: "#666",
          marginBottom: "50px",
          fontSize: "18px",
        }}
      >
        Built to make everyday tasks simple, fast and accessible.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        {features.map((item) => (
          <div
            key={item.title}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "18px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              {item.icon}
            </div>

            <h3
              style={{
                color: "#0D530E",
                marginBottom: "12px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#666",
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}