"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import QRCode from "react-qr-code";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");

  function generateQR() {
    if (!text.trim()) {
      alert("Please enter text or URL.");
      return;
    }

    setQrValue(text);
  }

  function resetQR() {
    setText("");
    setQrValue("");
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FBF5DD",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            width: "500px",
            background: "white",
            padding: "35px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#0D530E",
              marginBottom: "25px",
            }}
          >
            QR Code Generator
          </h1>

          <Input
            type="text"
            placeholder="Enter text or URL"
            value={text}
            onChange={setText}
          />

          <Button onClick={generateQR}>
            Generate QR Code
          </Button>

          <div style={{ marginTop: "15px" }}>
            <SecondaryButton onClick={resetQR}>
              Reset
            </SecondaryButton>
          </div>

          {qrValue && (
            <div
              style={{
                marginTop: "35px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <QRCode
                value={qrValue}
                size={220}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}