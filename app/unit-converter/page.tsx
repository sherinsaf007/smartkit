"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button/Button";
import ResultBox from "../../components/ResultBox/ResultBox";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

export default function UnitConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("Meter");
  const [to, setTo] = useState("Kilometer");
  const [result, setResult] = useState("");

  function convert() {
    const num = Number(value);

    if (!num && num !== 0) {
      alert("Enter a value.");
      return;
    }

    let output = 0;

    if (from === "Meter" && to === "Kilometer")
      output = num / 1000;

    else if (from === "Kilometer" && to === "Meter")
      output = num * 1000;

    else if (from === "Centimeter" && to === "Meter")
      output = num / 100;

    else if (from === "Meter" && to === "Centimeter")
      output = num * 100;

    else output = num;

    setResult(output.toString());
  }

  function reset() {
    setValue("");
    setResult("");
    setFrom("Meter");
    setTo("Kilometer");
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
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            background: "white",
            width: "500px",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              color: "#0D530E",
              marginBottom: "25px",
            }}
          >
            Unit Converter
          </h1>

          <input
            type="number"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
            }}
          />

          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
            }}
          >
            <option>Meter</option>
            <option>Kilometer</option>
            <option>Centimeter</option>
          </select>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
            }}
          >
            <option>Meter</option>
            <option>Kilometer</option>
            <option>Centimeter</option>
          </select>

          <Button onClick={convert}>
            Convert
          </Button>

          <div style={{ marginTop: "15px" }}>
            <SecondaryButton onClick={reset}>
              Reset
            </SecondaryButton>
          </div>

          {result && (
            <ResultBox>
              {result}
            </ResultBox>
          )}
        </div>
      </main>
    </>
  );
}