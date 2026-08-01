import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Terms & Conditions | SmartKit",
  description:
    "Read the terms and conditions for using SmartKit's free online calculators, PDF tools, image utilities, and productivity tools.",
};

export default function TermsPage() {
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
                fontSize: "clamp(34px,5vw,48px)",
              }}
            >
              Terms & Conditions
            </h1>

            <p
              style={{
                color: "#666",
                margin: 0,
              }}
            >
              Last updated: July 30, 2026
            </p>
          </header>

          <Section
            title="1. Acceptance of Terms"
            text="By accessing or using SmartKit, you agree to comply with these Terms & Conditions. If you do not agree, please discontinue using the website."
          />

          <Section
            title="2. Use of the Website"
            text="SmartKit provides free online utilities including calculators, PDF tools, image tools, and productivity tools. You agree to use the website only for lawful purposes."
          />

          <Section
            title="3. Intellectual Property"
            text="All website content, branding, design, text, graphics, and software are the property of SmartKit unless otherwise stated. You may not copy, redistribute, or reproduce content without permission."
          />

          <Section
            title="4. User Responsibilities"
            text="You are responsible for ensuring that any files or information you use with SmartKit comply with applicable laws and do not infringe the rights of others."
          />

          <Section
            title="5. Disclaimer"
            text="SmartKit tools are provided 'as is' without warranties of any kind. While we strive for accuracy, we cannot guarantee that every calculation or output will always be error-free."
          />

          <Section
            title="6. Limitation of Liability"
            text="SmartKit shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the website or its tools."
          />

          <Section
            title="7. Third-Party Links"
            text="Our website may include links to external websites or services. We are not responsible for their content, availability, or privacy practices."
          />

          <Section
            title="8. Changes to These Terms"
            text="We may update these Terms & Conditions at any time. Continued use of SmartKit after updates constitutes acceptance of the revised terms."
          />

          <Section
            title="9. Governing Law"
            text="These Terms & Conditions shall be governed by the applicable laws of the jurisdiction in which SmartKit operates."
          />

          <Section
            title="10. Contact"
            text="If you have any questions regarding these Terms & Conditions, please contact us through the Contact page."
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

function Section({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "30px",
        marginBottom: "24px",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,.06)",
      }}
    >
      <h2
        style={{
          color: "#0D530E",
          marginBottom: "15px",
          fontSize: "24px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#555",
          lineHeight: 1.8,
          margin: 0,
          fontSize: "16px",
        }}
      >
        {text}
      </p>
    </section>
  );
}