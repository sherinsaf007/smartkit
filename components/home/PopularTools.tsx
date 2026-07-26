export default function PopularTools() {
  const popularTools = [
    {
      icon: "🧾",
      title: "GST Calculator",
      link: "/gst-calculator",
    },
    {
      icon: "💱",
      title: "Currency Converter",
      link: "/currency-converter",
    },
    {
      icon: "🏦",
      title: "EMI Calculator",
      link: "/emi-calculator",
    },
    {
      icon: "🔳",
      title: "QR Generator",
      link: "/qr-code-generator",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto 70px",
      }}
    >
      <h2
        style={{
          color: "#0D530E",
          fontSize: "34px",
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        🔥 Popular Tools
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {popularTools.map((tool) => (
          <a
            key={tool.title}
            href={tool.link}
            style={{
              textDecoration: "none",
              color: "#0D530E",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px 28px",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                minWidth: "220px",
                textAlign: "center",
                transition: "0.3s",
              }}
            >
              <div
                style={{
                  fontSize: "38px",
                  marginBottom: "10px",
                }}
              >
                {tool.icon}
              </div>

              <strong>{tool.title}</strong>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}