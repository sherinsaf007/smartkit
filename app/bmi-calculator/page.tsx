"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import ResultBox from "../../components/ResultBox/ResultBox";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState("");

  function calculateBMI() {
    const w = Number(weight);
    const h = Number(height) / 100;

    if (!w || !h) {
      alert("Please fill all fields.");
      return;
    }

    const bmi = w / (h * h);

    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    setResult(`${bmi.toFixed(2)} (${category})`);
  }

  function resetCalculator() {
    setWeight("");
    setHeight("");
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
          <h1>BMI Calculator</h1>

          <Input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={setWeight}
          />

          <Input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={setHeight}
          />

          <Button onClick={calculateBMI}>
            Calculate BMI
          </Button>

          <div style={{ marginTop: 15 }}>
            <SecondaryButton onClick={resetCalculator}>
              Reset
            </SecondaryButton>
          </div>

          {result && (
            <ResultBox>
              BMI: {result}
            </ResultBox>
          )}
        </div>
      </main>
    </>
  );
}