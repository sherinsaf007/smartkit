"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ResultBox from "../../components/ResultBox/ResultBox";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState("");

  function calculateAge() {
    if (!birthDate) {
      setResult("Please select your birth date.");
      return;
    }

    const today = new Date();
    const dob = new Date(birthDate);

    let age = today.getFullYear() - dob.getFullYear();

    const monthDifference = today.getMonth() - dob.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < dob.getDate())
    ) {
      age--;
    }

    setResult(`You are ${age} years old.`);
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
            Age Calculator
          </h1>

          <label>Date of Birth</label>

          <Input
            type="date"
            value={birthDate}
            onChange={setBirthDate}
          />

          <Button onClick={calculateAge}>
            Calculate Age
          </Button>

          {result && (
            <ResultBox>{result}</ResultBox>
          )}
        </div>
      </main>
    </>
  );
}