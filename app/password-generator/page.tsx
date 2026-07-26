"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button/Button";
import ResultBox from "../../components/ResultBox/ResultBox";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);

  const [password, setPassword] = useState("");

  function generatePassword() {
    let chars = "";

    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}<>?";

    if (!chars) {
      alert("Select at least one option.");
      return;
    }

    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setPassword(result);
  }

  function copyPassword() {
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  }

  function reset() {
    setLength(12);
    setUppercase(true);
    setLowercase(true);
    setNumbers(true);
    setSymbols(false);
    setPassword("");
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
            width: "520px",
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
            Password Generator
          </h1>

          <label>Password Length</label>

          <input
            type="range"
            min={6}
            max={40}
            value={length}
            onChange={(e) =>
              setLength(Number(e.target.value))
            }
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          />

          <p>{length} Characters</p>

          <div style={{ marginTop: "20px" }}>
            <label>
              <input
                type="checkbox"
                checked={uppercase}
                onChange={() =>
                  setUppercase(!uppercase)
                }
              />{" "}
              Uppercase
            </label>

            <br /><br />

            <label>
              <input
                type="checkbox"
                checked={lowercase}
                onChange={() =>
                  setLowercase(!lowercase)
                }
              />{" "}
              Lowercase
            </label>

            <br /><br />

            <label>
              <input
                type="checkbox"
                checked={numbers}
                onChange={() =>
                  setNumbers(!numbers)
                }
              />{" "}
              Numbers
            </label>

            <br /><br />

            <label>
              <input
                type="checkbox"
                checked={symbols}
                onChange={() =>
                  setSymbols(!symbols)
                }
              />{" "}
              Symbols
            </label>
          </div>

          <div style={{ marginTop: "30px" }}>
            <Button onClick={generatePassword}>
              Generate Password
            </Button>

            <div style={{ marginTop: "15px" }}>
              <SecondaryButton onClick={reset}>
                Reset
              </SecondaryButton>
            </div>
          </div>

          {password && (
            <ResultBox>
              <div
                style={{
                  wordBreak: "break-all",
                }}
              >
                {password}
              </div>

              <div style={{ marginTop: "20px" }}>
                <Button onClick={copyPassword}>
                  Copy Password
                </Button>
              </div>
            </ResultBox>
          )}
        </div>
      </main>
    </>
  );
}