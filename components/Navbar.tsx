"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#FFFFFF",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <nav
        style={{
          minHeight: "75px",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "#0D530E",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 800,
              boxShadow: "0 6px 14px rgba(13, 83, 14, 0.18)",
            }}
          >
            S
          </span>

          <span
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#0D530E",
              letterSpacing: "-0.5px",
            }}
          >
            SmartKit
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="smartkit-desktop-menu">
          <Link href="/" style={navLinkStyle}>
            Home
          </Link>

          <Link href="/categories" style={navLinkStyle}>
            Categories
          </Link>

          <Link href="/about" style={navLinkStyle}>
            About
          </Link>

          <Link href="/contact" style={navLinkStyle}>
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="smartkit-menu-button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          style={{
            width: "44px",
            height: "44px",
            border: "1px solid #D9E4D5",
            borderRadius: "10px",
            background: "#F8FFF6",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <span
            style={{
              width: "22px",
              height: "16px",
              position: "relative",
              display: "block",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: menuOpen ? "7px" : "0",
                width: "22px",
                height: "2px",
                borderRadius: "10px",
                background: "#0D530E",
                transform: menuOpen ? "rotate(45deg)" : "none",
                transition: "all 0.2s ease",
              }}
            />

            <span
              style={{
                position: "absolute",
                left: 0,
                top: "7px",
                width: "22px",
                height: "2px",
                borderRadius: "10px",
                background: "#0D530E",
                opacity: menuOpen ? 0 : 1,
                transition: "all 0.2s ease",
              }}
            />

            <span
              style={{
                position: "absolute",
                left: 0,
                top: menuOpen ? "7px" : "14px",
                width: "22px",
                height: "2px",
                borderRadius: "10px",
                background: "#0D530E",
                transform: menuOpen ? "rotate(-45deg)" : "none",
                transition: "all 0.2s ease",
              }}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="smartkit-mobile-menu"
          style={{
            background: "#FFFFFF",
            borderTop: "1px solid #EEF2EC",
            boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              padding: "14px 20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <MobileLink href="/" label="Home" onClick={closeMenu} />
            <MobileLink
              href="/categories"
              label="Categories"
              onClick={closeMenu}
            />
            <MobileLink href="/about" label="About" onClick={closeMenu} />
            <MobileLink href="/contact" label="Contact" onClick={closeMenu} />
          </div>
        </div>
      )}

      <style jsx>{`
        .smartkit-desktop-menu {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .smartkit-menu-button {
          display: none;
        }

        .smartkit-mobile-menu {
          display: none;
        }

        @media (max-width: 768px) {
          .smartkit-desktop-menu {
            display: none;
          }

          .smartkit-menu-button {
            display: flex;
          }

          .smartkit-mobile-menu {
            display: block;
          }
        }

        @media (max-width: 480px) {
          nav {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </header>
  );
}

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: "block",
        padding: "13px 15px",
        borderRadius: "10px",
        textDecoration: "none",
        color: "#222222",
        fontWeight: 600,
        background: "#F8FFF6",
      }}
    >
      {label}
    </Link>
  );
}

const navLinkStyle = {
  textDecoration: "none",
  color: "#333333",
  fontWeight: 600,
  fontSize: "15px",
};