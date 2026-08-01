import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "About SmartKit | Free Online Tools",
  description:
    "Learn about SmartKit, a free collection of online calculators, PDF tools, image utilities, and productivity tools that work securely in your browser.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FBF5DD",
          minHeight: "100vh",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(36px,5vw,52px)",
              color: "#0D530E",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            About SmartKit
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#444",
              textAlign: "center",
              maxWidth: "850px",
              margin: "0 auto 50px",
            }}
          >
            SmartKit is a collection of fast, free, and privacy-focused online
            tools designed to help you complete everyday tasks without
            installing software or creating an account. Whether you need to
            calculate finances, resize images, merge PDFs, or generate QR codes,
            SmartKit makes the process simple and accessible from any device.
          </p>

          <section style={card}>
            <h2 style={heading}>Our Mission</h2>
            <p style={text}>
              Our mission is to build a reliable platform that provides useful
              online tools for students, professionals, businesses, and everyday
              users. We believe digital tools should be easy to use, available
              for everyone, and accessible from anywhere.
            </p>
          </section>

          <section style={card}>
            <h2 style={heading}>Why Choose SmartKit?</h2>

            <ul style={list}>
              <li>✔ Completely free to use</li>
              <li>✔ No sign-up or registration required</li>
              <li>✔ Fast and responsive on desktop and mobile</li>
              <li>✔ Browser-based processing for supported tools</li>
              <li>✔ Simple interface with no unnecessary clutter</li>
              <li>✔ Regularly updated with new tools and features</li>
            </ul>
          </section>

          <section style={card}>
            <h2 style={heading}>Current Categories</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <CategoryCard
                title="Calculators"
                description="Finance, GST, EMI, BMI, Age, Income Tax and more."
              />

              <CategoryCard
                title="Image Tools"
                description="Compress, resize and convert images with ease."
              />

              <CategoryCard
                title="PDF Tools"
                description="Merge PDFs and manage documents online."
              />

              <CategoryCard
                title="Utilities"
                description="QR Code Generator, Character Counter and more."
              />
            </div>
          </section>

          <section style={card}>
            <h2 style={heading}>Privacy First</h2>

            <p style={text}>
              We value your privacy. Many SmartKit tools process files directly
              within your browser, which means your documents and images are not
              uploaded to our servers. We continue to build tools with security
              and privacy as a priority.
            </p>
          </section>

          <section style={card}>
            <h2 style={heading}>Growing Every Month</h2>

            <p style={text}>
              SmartKit is continuously expanding with new calculators, PDF
              utilities, image tools, developer tools, productivity features,
              and many more. Our goal is to become your one-stop destination for
              everyday online utilities.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function CategoryCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: "#F8FFF6",
        padding: "22px",
        borderRadius: "14px",
        border: "1px solid #D9EAD3",
      }}
    >
      <h3
        style={{
          color: "#0D530E",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#555",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: "35px",
  borderRadius: "16px",
  marginBottom: "30px",
  boxShadow: "0 8px 20px rgba(0,0,0,.06)",
};

const heading = {
  color: "#0D530E",
  marginBottom: "15px",
  fontSize: "28px",
};

const text = {
  color: "#555",
  lineHeight: 1.9,
  fontSize: "17px",
};

const list = {
  color: "#555",
  lineHeight: 2,
  paddingLeft: "22px",
  fontSize: "17px",
};