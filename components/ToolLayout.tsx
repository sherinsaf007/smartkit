import Link from "next/link";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type ToolLayoutProps = {
  title: string;
  description: string;
  category?: string;
  children: ReactNode;
};

export default function ToolLayout({
  title,
  description,
  category = "Online Tool",
  children,
}: ToolLayoutProps) {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#FBF5DD",
          padding: "40px 20px 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <nav
            aria-label="Breadcrumb"
            style={{
              marginBottom: "22px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#0D530E",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Home
            </Link>

            <span style={{ margin: "0 8px" }}>/</span>

            <span>{category}</span>

            <span style={{ margin: "0 8px" }}>/</span>

            <span>{title}</span>
          </nav>

          <section
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "#EAF4E7",
                color: "#0D530E",
                padding: "7px 14px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "15px",
              }}
            >
              {category}
            </span>

            <h1
              style={{
                color: "#0D530E",
                fontSize: "clamp(30px, 5vw, 44px)",
                lineHeight: 1.15,
                margin: "0 0 12px",
              }}
            >
              {title}
            </h1>

            <p
              style={{
                maxWidth: "720px",
                margin: "0 auto",
                color: "#666",
                lineHeight: 1.7,
                fontSize: "17px",
              }}
            >
              {description}
            </p>
          </section>

          <section
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "clamp(20px, 4vw, 36px)",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.08)",
            }}
          >
            {children}
          </section>

          <section
            style={{
              marginTop: "30px",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2
              style={{
                color: "#0D530E",
                marginTop: 0,
                marginBottom: "12px",
                fontSize: "22px",
              }}
            >
              About this tool
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              SmartKit tools are designed to be fast, simple and easy to use.
              Your calculations are performed directly in your browser.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}