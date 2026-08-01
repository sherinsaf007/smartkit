import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0D530E",
        color: "#FFFFFF",
        padding: "50px 20px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "35px",
        }}
      >
        <div>
          <Link
  href="/"
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
    color: "#FFFFFF",
    textDecoration: "none",
  }}
>
  <span
    style={{
      width: "38px",
      height: "38px",
      borderRadius: "10px",
      background: "#FFFFFF",
      color: "#0D530E",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      fontWeight: 800,
    }}
  >
    S
  </span>

  <span
    style={{
      fontSize: "28px",
      fontWeight: 800,
    }}
  >
    SmartKit
  </span>
</Link>

          <p
            style={{
              margin: 0,
              color: "#DCE9D8",
              lineHeight: 1.8,
              maxWidth: "330px",
            }}
          >
            Free online calculators, image tools, PDF utilities, and
            productivity tools designed to make everyday tasks easier.
          </p>
        </div>

        <div>
          <h2 style={footerHeadingStyle}>Quick Links</h2>

          <div style={linkGroupStyle}>
            <FooterLink href="/" label="Home" />
            <FooterLink href="/categories" label="Categories" />
            <FooterLink href="/about" label="About Us" />
            <FooterLink href="/contact" label="Contact" />
          </div>
        </div>

        <div>
          <h2 style={footerHeadingStyle}>Popular Tools</h2>

          <div style={linkGroupStyle}>
            <FooterLink href="/scientific-calculator" label="Scientific Calculator" />
            <FooterLink href="/image-compressor" label="Image Compressor" />
            <FooterLink href="/image-resizer" label="Image Resizer" />
            <FooterLink href="/pdf-merge" label="Merge PDF" />
          </div>
        </div>

        <div>
          <h2 style={footerHeadingStyle}>Legal</h2>

          <div style={linkGroupStyle}>
            <FooterLink href="/privacy-policy" label="Privacy Policy" />
            <FooterLink href="/terms" label="Terms & Conditions" />
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1150px",
          margin: "40px auto 0",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.18)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
          color: "#DCE9D8",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} SmartKit. All rights reserved.
        </p>

        <p style={{ margin: 0 }}>
          Fast, free, and privacy-focused online tools.
        </p>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      style={{
        color: "#DCE9D8",
        textDecoration: "none",
        lineHeight: 1.6,
      }}
    >
      {label}
    </Link>
  );
}

const footerHeadingStyle = {
  margin: "0 0 16px",
  color: "#FFFFFF",
  fontSize: "18px",
};

const linkGroupStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "11px",
};