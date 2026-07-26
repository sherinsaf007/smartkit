"use client";

export default function Navbar() {
  return (
    <nav
      style={{
        height: "75px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 60px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <a
        href="/"
        style={{
          textDecoration: "none",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#0D530E",
        }}
      >
        SmartKit
      </a>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <a
          href="/"
          style={{
            textDecoration: "none",
            color: "#333",
            fontWeight: 600,
          }}
        >
          Home
        </a>

        <a
          href="#"
          style={{
            textDecoration: "none",
            color: "#333",
            fontWeight: 600,
          }}
        >
          Categories
        </a>

        <a
          href="#"
          style={{
            textDecoration: "none",
            color: "#333",
            fontWeight: 600,
          }}
        >
          About
        </a>

        <a
          href="#"
          style={{
            textDecoration: "none",
            color: "#333",
            fontWeight: 600,
          }}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}