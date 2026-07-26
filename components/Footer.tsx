export default function Footer() {
  return (
    <footer
      style={{
        background: "#0D530E",
        color: "white",
        marginTop: "80px",
        padding: "50px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        <div>
          <h2
            style={{
              marginBottom: "15px",
            }}
          >
            SmartKit
          </h2>

          <p
            style={{
              color: "#ddd",
              lineHeight: "28px",
              maxWidth: "300px",
            }}
          >
            Free online tools for students,
            professionals and businesses.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <p>Home</p>
          <p>Tools</p>
          <p>Categories</p>
          <p>About</p>
        </div>

        <div>
          <h3>Popular Tools</h3>

          <p>GST Calculator</p>
          <p>Currency Converter</p>
          <p>QR Generator</p>
          <p>EMI Calculator</p>
        </div>

        <div>
          <h3>Follow Us</h3>

          <p>Facebook</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
          <p>Twitter</p>
        </div>
      </div>

      <hr
        style={{
          margin: "40px 0 20px",
          borderColor: "#306D29",
        }}
      />

      <p
        style={{
          textAlign: "center",
          color: "#ddd",
        }}
      >
        © 2026 SmartKit. All Rights Reserved.
      </p>
    </footer>
  );
}