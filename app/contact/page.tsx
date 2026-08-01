"use client";

import { FormEvent, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

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
            maxWidth: "1050px",
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
                margin: "0 0 14px",
                color: "#0D530E",
                fontSize: "clamp(34px, 5vw, 48px)",
              }}
            >
              Contact SmartKit
            </h1>

            <p
              style={{
                maxWidth: "720px",
                margin: "0 auto",
                color: "#666666",
                fontSize: "17px",
                lineHeight: 1.7,
              }}
            >
              Have a question, suggestion, or tool request? Send us a message
              and help us make SmartKit better.
            </p>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
              alignItems: "start",
            }}
          >
            <section style={cardStyle}>
              <h2 style={headingStyle}>Get in Touch</h2>

              <p style={textStyle}>
                We welcome feedback, bug reports, partnership enquiries, and
                suggestions for new tools.
              </p>

              <div style={contactItemStyle}>
                <span style={iconStyle}>✉️</span>

                <div>
                  <strong style={contactLabelStyle}>Email</strong>

                  <a
                    href="mailto:support@smartkit.tools"
                    style={contactLinkStyle}
                  >
                    support@smartkit.tools
                  </a>
                </div>
              </div>

              <div style={contactItemStyle}>
                <span style={iconStyle}>💡</span>

                <div>
                  <strong style={contactLabelStyle}>Tool Suggestions</strong>

                  <p style={smallTextStyle}>
                    Tell us which calculator, PDF tool, image tool, or utility
                    you would like us to build next.
                  </p>
                </div>
              </div>

              <div style={contactItemStyle}>
                <span style={iconStyle}>🐞</span>

                <div>
                  <strong style={contactLabelStyle}>Report an Issue</strong>

                  <p style={smallTextStyle}>
                    Please mention the tool name, device, browser, and the issue
                    you experienced.
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: "28px",
                  padding: "18px",
                  borderRadius: "12px",
                  background: "#F8FFF6",
                  border: "1px solid #D9EAD3",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: "#0D530E",
                    marginBottom: "8px",
                  }}
                >
                  Privacy notice
                </strong>

                <p
                  style={{
                    margin: 0,
                    color: "#666666",
                    lineHeight: 1.7,
                    fontSize: "14px",
                  }}
                >
                  Please do not send passwords, financial information, medical
                  records, or other sensitive personal information through this
                  form.
                </p>
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={headingStyle}>Send a Message</h2>

              {submitted ? (
                <div
                  style={{
                    padding: "25px",
                    borderRadius: "14px",
                    background: "#F1FAEE",
                    border: "1px solid #BFDDB7",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "42px",
                      marginBottom: "12px",
                    }}
                  >
                    ✅
                  </div>

                  <h3
                    style={{
                      margin: "0 0 10px",
                      color: "#0D530E",
                    }}
                  >
                    Message form ready
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#666666",
                      lineHeight: 1.7,
                    }}
                  >
                    The form design is working. Email delivery can be connected
                    after launch using Formspree, Resend, or another email
                    service.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    style={{
                      ...secondaryButtonStyle,
                      marginTop: "18px",
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={fieldGroupStyle}>
                    <label htmlFor="name" style={labelStyle}>
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Enter your name"
                      style={inputStyle}
                    />
                  </div>

                  <div style={fieldGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Enter your email"
                      style={inputStyle}
                    />
                  </div>

                  <div style={fieldGroupStyle}>
                    <label htmlFor="subject" style={labelStyle}>
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="What is your message about?"
                      style={inputStyle}
                    />
                  </div>

                  <div style={fieldGroupStyle}>
                    <label htmlFor="message" style={labelStyle}>
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={7}
                      placeholder="Write your message here"
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "150px",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  <button type="submit" style={primaryButtonStyle}>
                    Send Message
                  </button>
                </form>
              )}
            </section>
          </div>

          <section
            style={{
              ...cardStyle,
              marginTop: "25px",
              textAlign: "center",
            }}
          >
            <h2 style={headingStyle}>Response Time</h2>

            <p
              style={{
                ...textStyle,
                marginBottom: 0,
              }}
            >
              We aim to review genuine enquiries as soon as possible. Response
              times may vary depending on the nature of your request.
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
  padding: "clamp(24px, 4vw, 35px)",
  borderRadius: "18px",
  boxShadow: "0 10px 28px rgba(0, 0, 0, 0.07)",
};

const headingStyle = {
  margin: "0 0 16px",
  color: "#0D530E",
  fontSize: "26px",
};

const textStyle = {
  margin: "0 0 24px",
  color: "#555555",
  fontSize: "16px",
  lineHeight: 1.8,
};

const contactItemStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "14px",
  marginTop: "22px",
};

const iconStyle = {
  width: "44px",
  height: "44px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  background: "#F1F8EE",
  fontSize: "21px",
};

const contactLabelStyle = {
  display: "block",
  color: "#222222",
  marginBottom: "6px",
};

const contactLinkStyle = {
  color: "#0D530E",
  textDecoration: "none",
  fontWeight: 700,
  overflowWrap: "anywhere" as const,
};

const smallTextStyle = {
  margin: 0,
  color: "#666666",
  lineHeight: 1.6,
  fontSize: "14px",
};

const fieldGroupStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#333333",
  fontWeight: 700,
  fontSize: "15px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "13px 14px",
  border: "1px solid #D5DDD2",
  borderRadius: "10px",
  background: "#FFFFFF",
  color: "#222222",
  fontSize: "15px",
  outline: "none",
};

const primaryButtonStyle = {
  width: "100%",
  padding: "14px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#0D530E",
  color: "#FFFFFF",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 700,
};

const secondaryButtonStyle = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "9px",
  background: "#E7EFE4",
  color: "#0D530E",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 700,
};