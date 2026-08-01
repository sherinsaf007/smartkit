import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Privacy Policy | SmartKit",
  description:
    "Read SmartKit's privacy policy to understand how we handle information, browser-based file processing, cookies, analytics, and third-party services.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#FBF5DD",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "950px",
            margin: "0 auto",
          }}
        >
          <header
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <h1
              style={{
                margin: "0 0 15px",
                color: "#0D530E",
                fontSize: "clamp(34px, 5vw, 48px)",
              }}
            >
              Privacy Policy
            </h1>

            <p
              style={{
                margin: 0,
                color: "#666",
                fontSize: "16px",
              }}
            >
              Last updated: July 30, 2026
            </p>
          </header>

          <section style={cardStyle}>
            <h2 style={headingStyle}>1. Introduction</h2>

            <p style={textStyle}>
              SmartKit respects your privacy. This Privacy Policy explains what
              information may be collected when you use our website, how that
              information may be used, and the measures we take to protect your
              data.
            </p>
          </section>

          <section style={cardStyle}>
            <h2 style={headingStyle}>2. Information We Collect</h2>

            <p style={textStyle}>
              SmartKit does not require users to create an account to access
              most tools. We may collect limited technical information such as
              browser type, device type, operating system, pages visited, and
              general usage data.
            </p>

            <p style={textStyle}>
              When you contact us, we may receive information such as your name,
              email address, subject, and message.
            </p>
          </section>

          <section style={cardStyle}>
            <h2 style={headingStyle}>3. File Processing</h2>

            <p style={textStyle}>
              Many SmartKit image and PDF tools process files directly inside
              your browser. For these supported tools, your files are not
              uploaded to SmartKit servers.
            </p>

            <p style={textStyle}>
              Processing methods may vary for future tools. When a tool requires
              server-side processing, we will clearly communicate this where
              appropriate.
            </p>
          </section>

          <section style={cardStyle}>
            <h2 style={headingStyle}>4. Cookies and Analytics</h2>

            <p style={textStyle}>
              SmartKit may use cookies or similar technologies to understand
              website performance, remember preferences, improve user
              experience, and analyze traffic.
            </p>

            <p style={textStyle}>
              We may use analytics services such as Google Analytics or other
              similar platforms. These services may collect information in
              accordance with their own privacy policies.
            </p>
          </section>

          <section style={cardStyle}>
            <h2 style={headingStyle}>5. Advertising</h2>

            <p style={textStyle}>
              SmartKit may display advertisements in the future. Advertising
              partners may use cookies or similar technologies to show relevant
              ads and measure advertising performance.
            </p>
          </section>

          <section style={cardStyle}>
            <h2 style={headingStyle}>6. Third-Party Services</h2>

            <p style={textStyle}>
              Our website may contain links to third-party websites or use
              third-party services. SmartKit is not responsible for the privacy
              practices, content, or security of those external services.
            </p>
          </section>

          <section style={cardStyle}>
            <h2 style={headingStyle}>7. Data Security</h2>

            <p style={textStyle}>
              We take reasonable measures to protect the information handled
              through SmartKit. However, no internet-based service can guarantee
              complete security.
            </p>
          </section>

          <section style={cardStyle}>
            <h2 style={headingStyle}>8. Children&apos;s Privacy</h2>

            <p style={textStyle}>
              SmartKit is not intentionally designed to collect personal
              information from children. Parents or guardians who believe a
              child has submitted personal information may contact us to request
              its removal.
            </p>
          </section>

          <section style={cardStyle}>
            <h2 style={headingStyle}>9. Changes to This Policy</h2>

            <p style={textStyle}>
              We may update this Privacy Policy from time to time. Changes will
              be published on this page along with an updated revision date.
            </p>
          </section>

          <section style={cardStyle}>
            <h2 style={headingStyle}>10. Contact Us</h2>

            <p style={textStyle}>
              For questions about this Privacy Policy, please contact us through
              the SmartKit Contact page.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

const cardStyle = {
  background: "#FFFFFF",
  padding: "clamp(24px, 4vw, 36px)",
  marginBottom: "24px",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
};

const headingStyle = {
  margin: "0 0 14px",
  color: "#0D530E",
  fontSize: "24px",
};

const textStyle = {
  margin: "0 0 14px",
  color: "#555555",
  fontSize: "16px",
  lineHeight: 1.8,
};