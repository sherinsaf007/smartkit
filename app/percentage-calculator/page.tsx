"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import ResultBox from "../../components/ResultBox/ResultBox";

export default function PercentageCalculator() {
  const [value, setValue] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState("");

  function calculatePercentage() {
    const v = Number(value);
    const t = Number(total);

    if (!v || !t) {
      alert("Please fill all fields.");
      return;
    }

    setResult(((v / t) * 100).toFixed(2) + "%");
  }

  function resetCalculator() {
    setValue("");
    setTotal("");
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
          <h1>Percentage Calculator</h1>

          <Input
            type="number"
            placeholder="Value"
            value={value}
            onChange={setValue}
          />

          <Input
            type="number"
            placeholder="Total"
            value={total}
            onChange={setTotal}
          />

          <Button onClick={calculatePercentage}>
            Calculate
          </Button>

          <div style={{ marginTop: 15 }}>
            <SecondaryButton onClick={resetCalculator}>
              Reset
            </SecondaryButton>
          </div>

          {result && (
            <ResultBox>
              Percentage: {result}
            </ResultBox>
          )}
        </div>
      </main>
    </>
  );
}