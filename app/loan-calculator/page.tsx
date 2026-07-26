"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import ResultBox from "../../components/ResultBox/ResultBox";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState("");

  function calculateLoan() {
    const p = Number(amount);
    const r = Number(rate) / 100;
    const t = Number(years);

    if (!p || !r || !t) {
      alert("Please fill all fields.");
      return;
    }

    const interest = p * r * t;
    const total = p + interest;

    setResult(
      `Interest: ₹${interest.toFixed(2)}
Total Amount: ₹${total.toFixed(2)}`
    );
  }

  function resetCalculator() {
    setAmount("");
    setRate("");
    setYears("");
    setResult("");
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
          }}
        >
          <h1>Loan Calculator</h1>

          <Input
            type="number"
            placeholder="Loan Amount"
            value={amount}
            onChange={setAmount}
          />

          <Input
            type="number"
            placeholder="Interest Rate (%)"
            value={rate}
            onChange={setRate}
          />

          <Input
            type="number"
            placeholder="Years"
            value={years}
            onChange={setYears}
          />

          <Button onClick={calculateLoan}>
            Calculate
          </Button>

          <div style={{ marginTop: 15 }}>
            <SecondaryButton onClick={resetCalculator}>
              Reset
            </SecondaryButton>
          </div>

          {result && (
            <ResultBox>
              <div style={{ whiteSpace: "pre-line" }}>
                {result}
              </div>
            </ResultBox>
          )}
        </div>
      </main>
    </>
  );
}