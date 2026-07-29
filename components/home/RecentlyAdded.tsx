import Link from "next/link";
import { tools } from "../../app/data/tools";

export default function RecentlyAdded() {
  const recentTools = tools.slice(-4).reverse();

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "90px auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#0D530E",
          fontSize: "40px",
          marginBottom: "15px",
        }}
      >
        🆕 Recently Added
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "45px",
        }}
      >
        Check out the newest tools added to SmartKit.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        {recentTools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.link}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "18px",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                transition: ".3s",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "34px",
                  marginBottom: "15px",
                }}
              >
                🚀
              </div>

              <h3
                style={{
                  color: "#0D530E",
                  marginBottom: "10px",
                }}
              >
                {tool.title}
              </h3>

              <p
                style={{
                  color: "#666",
                }}
              >
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}