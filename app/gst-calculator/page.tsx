"use client";

import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ResultBox from "../../components/ResultBox/ResultBox";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gst, setGst] = useState("18");
  const [result, setResult] = useState("");

  function calculateGST() {
    const amt = Number(amount);
    const gstAmount = (amt * Number(gst)) / 100;
    const total = amt + gstAmount;

    setResult(
      `GST: ₹${gstAmount.toFixed(2)} | Total: ₹${total.toFixed(2)}`
    );
  }

  function resetCalculator() {
    setAmount("");
    setGst("18");
    setResult("");
  }

  return (
    <PageContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            background: "white",
            width: "100%",
            maxWidth: "520px",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              color: "#0D530E",
              marginBottom: "10px",
              fontSize: "32px",
            }}
          >
            GST Calculator
          </h1>

          <p
            style={{
              color: "#666",
              marginBottom: "25px",
            }}
          >
            Calculate GST amount and total price instantly.
          </p>

          <label
            style={{
              fontWeight: 600,
              color: "#333",
            }}
          >
            Amount
          </label>

          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={setAmount}
          />

          <label
            style={{
              fontWeight: 600,
              color: "#333",
            }}
          >
            GST %
          </label>

          <Input
            type="number"
            placeholder="18"
            value={gst}
            onChange={setGst}
          />

          <Button onClick={calculateGST}>
            Calculate GST
          </Button>

          <div style={{ marginTop: "15px" }}>
            <SecondaryButton onClick={resetCalculator}>
              Reset
            </SecondaryButton>
          </div>

          {result && (
            <ResultBox>
              {result}
            </ResultBox>
          )}
        </div>
      </div>
    </PageContainer>
  );
}