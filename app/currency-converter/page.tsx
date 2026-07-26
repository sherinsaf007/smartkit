"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button/Button";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import Input from "../../components/Input/Input";
import ResultBox from "../../components/ResultBox/ResultBox";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState("");

  async function convertCurrency() {
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    try {
      const res = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      );

      const data = await res.json();

      const rate = data.rates[toCurrency];

      const converted = Number(amount) * rate;

      setResult(
        `${amount} ${fromCurrency} = ${converted.toFixed(
          2
        )} ${toCurrency}`
      );
    } catch (error) {
      setResult("Unable to fetch exchange rates.");
    }
  }

  function swapCurrencies() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResult("");
  }

  function resetConverter() {
    setAmount("");
    setFromCurrency("USD");
    setToCurrency("INR");
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
          <h1
            style={{
              color: "#0D530E",
              marginBottom: "25px",
            }}
          >
            Currency Converter
          </h1>

          <label>Amount</label>

          <Input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={setAmount}
          />

          <label>From Currency</label>

          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <option>USD</option>
            <option>INR</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>AED</option>
          </select>

          <label>To Currency</label>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "25px",
              borderRadius: "8px",
            }}
          >
            <option>USD</option>
            <option>INR</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>AED</option>
          </select>

          <Button onClick={convertCurrency}>
            Convert
          </Button>

          <div style={{ marginTop: "15px" }}>
            <SecondaryButton onClick={swapCurrencies}>
              Swap Currencies
            </SecondaryButton>
          </div>

          <div style={{ marginTop: "15px" }}>
            <SecondaryButton onClick={resetConverter}>
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