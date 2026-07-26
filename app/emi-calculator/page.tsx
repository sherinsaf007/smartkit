"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ResultBox from "../../components/ResultBox/ResultBox";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [result, setResult] = useState<{
  emi: number;
  interest: number;
  total: number;
} | null>(null);
  function calculateEMI() {
  const P = Number(loanAmount);
  const annualRate = Number(interestRate);
  const years = Number(loanYears);

 if (!P || !annualRate || !years) {
  alert("Please fill all fields.");
  return;
}

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi =
    (P * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

setResult({
  emi,
  interest: totalInterest,
  total: totalPayment,
});
}
function resetCalculator() {
  setLoanAmount("");
  setInterestRate("");
  setLoanYears("");
  setResult(null);
}

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FBF5DD",
          minHeight: "100vh",
          padding: "60px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            width: "500px",
            padding: "35px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              color: "#0D530E",
              marginBottom: "25px",
            }}
          >
            EMI Calculator
          </h1>

          <label>Loan Amount (₹)</label>

          <Input
            type="number"
            placeholder="Enter Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
          />

          <label>Interest Rate (%)</label>

          <Input
            type="number"
            placeholder="Enter Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
          />

          <label>Loan Tenure (Years)</label>

          <Input
            type="number"
            placeholder="Enter Loan Years"
            value={loanYears}
            onChange={setLoanYears}
          />

          <Button onClick={calculateEMI}>
  Calculate EMI
</Button>
<div
  style={{
    marginTop: "15px",
  }}
>
  <SecondaryButton onClick={resetCalculator}>
    Reset
  </SecondaryButton>
</div>
{result && (
  <ResultBox>
    <div style={{ lineHeight: "2" }}>
      <div>
        <strong>Monthly EMI:</strong> ₹{result.emi.toFixed(2)}
      </div>

      <div>
        <strong>Total Interest:</strong> ₹{result.interest.toFixed(2)}
      </div>

      <div>
        <strong>Total Payment:</strong> ₹{result.total.toFixed(2)}
      </div>
    </div>
  </ResultBox>
)}
        </div>
      </main>
    </>
  );
}