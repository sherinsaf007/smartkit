"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  calculateIncomeTax,
  compareRegimes,
  TaxResult,
} from "../../lib/tax/incomeTax";

type ComparisonResult = ReturnType<typeof compareRegimes>;

export default function IncomeTaxCalculator() {
  const [financialYear, setFinancialYear] = useState("2026-27");
  const [regime, setRegime] = useState<"Old" | "New">("New");
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("Below 60");
  const [deduction80C, setDeduction80C] = useState("");
  const [deduction80D, setDeduction80D] = useState("");
  const [hra, setHra] = useState("");

  const [result, setResult] = useState<TaxResult | null>(null);
  const [comparison, setComparison] =
    useState<ComparisonResult | null>(null);

  function calculate() {
    const incomeValue = Number(income);
    const d80C = Number(deduction80C) || 0;
    const d80D = Number(deduction80D) || 0;
    const hraValue = Number(hra) || 0;

    if (!incomeValue || incomeValue <= 0) {
      alert("Please enter a valid annual income.");
      return;
    }

    const tax = calculateIncomeTax({
      income: incomeValue,
      regime,
      deduction80C: d80C,
      deduction80D: d80D,
      hra: hraValue,
    });

    const comparisonResult = compareRegimes(
      incomeValue,
      d80C,
      d80D,
      hraValue
    );

    setResult(tax);
    setComparison(comparisonResult);
  }

  function reset() {
    setFinancialYear("2026-27");
    setRegime("New");
    setIncome("");
    setAge("Below 60");
    setDeduction80C("");
    setDeduction80D("");
    setHra("");
    setResult(null);
    setComparison(null);
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FBF5DD",
          minHeight: "100vh",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            background: "white",
            borderRadius: "18px",
            padding: "35px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              color: "#0D530E",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            🇮🇳 Income Tax Calculator
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "35px",
            }}
          >
            Compare your tax under the Old and New Tax Regimes.
          </p>

          <label>Financial Year</label>

          <select
            value={financialYear}
            onChange={(e) => {
              setFinancialYear(e.target.value);
              setResult(null);
              setComparison(null);
            }}
            style={inputStyle}
          >
            <option value="2026-27">2026-27</option>
            <option value="2025-26">2025-26</option>
          </select>

          <label>Tax Regime</label>

          <select
            value={regime}
            onChange={(e) => {
              setRegime(e.target.value as "Old" | "New");
              setResult(null);
              setComparison(null);
            }}
            style={inputStyle}
          >
            <option value="New">New Regime</option>
            <option value="Old">Old Regime</option>
          </select>

          <label>Annual Income (₹)</label>

          <input
            type="number"
            min="0"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter Annual Income"
            style={inputStyle}
          />

          <label>Age Category</label>

          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
          >
            <option value="Below 60">Below 60</option>
            <option value="60-80">60–80</option>
            <option value="Above 80">Above 80</option>
          </select>

          {regime === "Old" && (
            <>
              <label>80C Deduction (₹)</label>

              <input
                type="number"
                min="0"
                value={deduction80C}
                onChange={(e) => setDeduction80C(e.target.value)}
                placeholder="Maximum ₹1,50,000"
                style={inputStyle}
              />

              <label>80D Deduction (₹)</label>

              <input
                type="number"
                min="0"
                value={deduction80D}
                onChange={(e) => setDeduction80D(e.target.value)}
                placeholder="Medical Insurance"
                style={inputStyle}
              />

              <label>HRA Exemption (₹)</label>

              <input
                type="number"
                min="0"
                value={hra}
                onChange={(e) => setHra(e.target.value)}
                placeholder="House Rent Allowance"
                style={inputStyle}
              />
            </>
          )}

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            <button onClick={calculate} style={primaryButton}>
              Calculate Tax
            </button>

            <button onClick={reset} style={secondaryButton}>
              Reset
            </button>
          </div>

          {result && (
            <div
              style={{
                marginTop: "40px",
                background: "#F8FFF6",
                border: "2px solid #DCEFD9",
                borderRadius: "16px",
                padding: "25px",
              }}
            >
              <h2
                style={{
                  color: "#0D530E",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                Tax Summary
              </h2>

              <ResultRow
                label="Selected Regime"
                value={`${regime} Regime`}
              />

              <ResultRow
                label="Taxable Income"
                value={result.taxableIncome}
              />

              <ResultRow
                label="Income Tax"
                value={result.incomeTax}
              />

              <ResultRow
                label="Health & Education Cess (4%)"
                value={result.cess}
              />

              <hr
                style={{
                  margin: "20px 0",
                  border: "none",
                  borderTop: "1px solid #ddd",
                }}
              />

              <ResultRow
                label="Total Tax Payable"
                value={result.totalTax}
                bold
              />

              <ResultRow
                label="Effective Tax Rate"
                value={`${result.effectiveRate.toFixed(2)}%`}
              />

              {comparison && (
                <>
                  <hr
                    style={{
                      margin: "25px 0",
                      border: "none",
                      borderTop: "1px solid #ddd",
                    }}
                  />

                  <h3
                    style={{
                      color: "#0D530E",
                      marginBottom: "20px",
                      textAlign: "center",
                    }}
                  >
                    Old vs New Regime
                  </h3>

                  <ResultRow
                    label="Old Regime Tax"
                    value={comparison.oldRegime.totalTax}
                  />

                  <ResultRow
                    label="New Regime Tax"
                    value={comparison.newRegime.totalTax}
                  />

                  <ResultRow
                    label="Recommended"
                    value={comparison.recommended}
                    bold
                  />

                  <ResultRow
                    label="Estimated Savings"
                    value={comparison.savings}
                    bold
                  />
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function ResultRow({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: number | string;
  bold?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        marginBottom: "15px",
        fontWeight: bold ? "bold" : "normal",
        fontSize: bold ? "18px" : "16px",
      }}
    >
      <span>{label}</span>

      <span style={{ textAlign: "right" }}>
        {typeof value === "number"
          ? `₹${value.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}`
          : value}
      </span>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "22px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxSizing: "border-box" as const,
};

const primaryButton = {
  flex: "1 1 220px",
  padding: "15px",
  background: "#0D530E",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold" as const,
};

const secondaryButton = {
  flex: "1 1 220px",
  padding: "15px",
  background: "#E7E1B1",
  color: "#0D530E",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold" as const,
};