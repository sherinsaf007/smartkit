type Props = {
  title: string;
  description: string;
  link?: string;
};

export default function ToolCard({
  title,
  description,
  link,
}: Props) {
  return (
    <div
      style={{
        width: "280px",
        minHeight: "240px",
        background: "white",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 20px 40px rgba(13,83,14,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.08)";
      }}
    >
      <div>
        <h3
          style={{
            color: "#0D530E",
            marginBottom: "12px",
            fontSize: "22px",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: "#666",
            fontSize: "15px",
            lineHeight: "24px",
          }}
        >
          {description}
        </p>
      </div>

      <a
        href={link || "#"}
        style={{
          textDecoration: "none",
        }}
      >
        <button
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "14px",
            background: "#0D530E",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#306D29";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#0D530E";
          }}
        >
          Open Tool
        </button>
      </a>
    </div>
  );
}