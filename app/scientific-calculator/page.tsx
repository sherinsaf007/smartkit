"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type AngleMode = "DEG" | "RAD";

export default function ScientificCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [angleMode, setAngleMode] = useState<AngleMode>("DEG");
  const [memory, setMemory] = useState(0);
  const [error, setError] = useState("");

  function appendValue(value: string) {
    setExpression((previous) => previous + value);
    setError("");
  }

  function clearAll() {
    setExpression("");
    setResult("0");
    setError("");
  }

  function deleteLast() {
    setExpression((previous) => previous.slice(0, -1));
    setError("");
  }

  function calculate() {
    if (!expression.trim()) {
      return;
    }

    try {
      const calculatedValue = evaluateExpression(expression, angleMode);

      if (!Number.isFinite(calculatedValue)) {
        throw new Error("Invalid calculation");
      }

      const formattedResult = formatNumber(calculatedValue);

      setResult(formattedResult);
      setExpression(formattedResult);
      setError("");
    } catch {
      setError("Invalid expression. Please check your calculation.");
    }
  }

  function calculatePercentage() {
    try {
      const value = evaluateExpression(expression, angleMode);
      const percentageValue = value / 100;
      const formattedResult = formatNumber(percentageValue);

      setResult(formattedResult);
      setExpression(formattedResult);
      setError("");
    } catch {
      setError("Enter a valid number before using percentage.");
    }
  }

  function calculateSquare() {
    try {
      const value = evaluateExpression(expression, angleMode);
      const squareValue = value * value;
      const formattedResult = formatNumber(squareValue);

      setResult(formattedResult);
      setExpression(formattedResult);
      setError("");
    } catch {
      setError("Enter a valid number before using x².");
    }
  }

  function calculateReciprocal() {
    try {
      const value = evaluateExpression(expression, angleMode);

      if (value === 0) {
        throw new Error("Cannot divide by zero");
      }

      const reciprocalValue = 1 / value;
      const formattedResult = formatNumber(reciprocalValue);

      setResult(formattedResult);
      setExpression(formattedResult);
      setError("");
    } catch {
      setError("Cannot calculate the reciprocal of this value.");
    }
  }

  function toggleSign() {
    if (!expression) {
      setExpression("-");
      return;
    }

    if (expression.startsWith("-")) {
      setExpression(expression.slice(1));
    } else {
      setExpression(`-${expression}`);
    }

    setError("");
  }

  function memoryClear() {
    setMemory(0);
  }

  function memoryRecall() {
    const memoryValue = formatNumber(memory);

    setExpression((previous) =>
      previous ? `${previous}${memoryValue}` : memoryValue
    );

    setError("");
  }

  function memoryAdd() {
    try {
      const value = evaluateExpression(expression || result, angleMode);
      setMemory((previous) => previous + value);
      setError("");
    } catch {
      setError("Unable to add this value to memory.");
    }
  }

  function memorySubtract() {
    try {
      const value = evaluateExpression(expression || result, angleMode);
      setMemory((previous) => previous - value);
      setError("");
    } catch {
      setError("Unable to subtract this value from memory.");
    }
  }

  const buttons = [
    {
      label: "MC",
      action: memoryClear,
      type: "memory",
    },
    {
      label: "MR",
      action: memoryRecall,
      type: "memory",
    },
    {
      label: "M+",
      action: memoryAdd,
      type: "memory",
    },
    {
      label: "M−",
      action: memorySubtract,
      type: "memory",
    },
    {
      label: angleMode,
      action: () =>
        setAngleMode((previous) =>
          previous === "DEG" ? "RAD" : "DEG"
        ),
      type: "mode",
    },

    {
      label: "sin",
      action: () => appendValue("sin("),
      type: "function",
    },
    {
      label: "cos",
      action: () => appendValue("cos("),
      type: "function",
    },
    {
      label: "tan",
      action: () => appendValue("tan("),
      type: "function",
    },
    {
      label: "log",
      action: () => appendValue("log("),
      type: "function",
    },
    {
      label: "ln",
      action: () => appendValue("ln("),
      type: "function",
    },

    {
      label: "√",
      action: () => appendValue("sqrt("),
      type: "function",
    },
    {
      label: "x²",
      action: calculateSquare,
      type: "function",
    },
    {
      label: "xʸ",
      action: () => appendValue("^"),
      type: "function",
    },
    {
      label: "1/x",
      action: calculateReciprocal,
      type: "function",
    },
    {
      label: "π",
      action: () => appendValue("pi"),
      type: "function",
    },

    {
      label: "(",
      action: () => appendValue("("),
      type: "function",
    },
    {
      label: ")",
      action: () => appendValue(")"),
      type: "function",
    },
    {
      label: "%",
      action: calculatePercentage,
      type: "function",
    },
    {
      label: "⌫",
      action: deleteLast,
      type: "danger",
    },
    {
      label: "AC",
      action: clearAll,
      type: "danger",
    },

    {
      label: "7",
      action: () => appendValue("7"),
      type: "number",
    },
    {
      label: "8",
      action: () => appendValue("8"),
      type: "number",
    },
    {
      label: "9",
      action: () => appendValue("9"),
      type: "number",
    },
    {
      label: "÷",
      action: () => appendValue("/"),
      type: "operator",
    },
    {
      label: "±",
      action: toggleSign,
      type: "operator",
    },

    {
      label: "4",
      action: () => appendValue("4"),
      type: "number",
    },
    {
      label: "5",
      action: () => appendValue("5"),
      type: "number",
    },
    {
      label: "6",
      action: () => appendValue("6"),
      type: "number",
    },
    {
      label: "×",
      action: () => appendValue("*"),
      type: "operator",
    },
    {
      label: "e",
      action: () => appendValue("e"),
      type: "function",
    },

    {
      label: "1",
      action: () => appendValue("1"),
      type: "number",
    },
    {
      label: "2",
      action: () => appendValue("2"),
      type: "number",
    },
    {
      label: "3",
      action: () => appendValue("3"),
      type: "number",
    },
    {
      label: "−",
      action: () => appendValue("-"),
      type: "operator",
    },
    {
      label: "abs",
      action: () => appendValue("abs("),
      type: "function",
    },

    {
      label: "0",
      action: () => appendValue("0"),
      type: "number",
    },
    {
      label: ".",
      action: () => appendValue("."),
      type: "number",
    },
    {
      label: "00",
      action: () => appendValue("00"),
      type: "number",
    },
    {
      label: "+",
      action: () => appendValue("+"),
      type: "operator",
    },
    {
      label: "=",
      action: calculate,
      type: "equals",
    },
  ];

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#FBF5DD",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "620px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <h1
              style={{
                color: "#0D530E",
                marginBottom: "10px",
                fontSize: "36px",
              }}
            >
              Scientific Calculator
            </h1>

            <p
              style={{
                color: "#666",
                margin: 0,
              }}
            >
              Perform basic and advanced mathematical calculations.
            </p>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "22px",
              padding: "25px",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                background: "#F5F8F3",
                border: "1px solid #DCE8D8",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "20px",
                minHeight: "130px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                  marginBottom: "15px",
                  color: "#777",
                  fontSize: "14px",
                }}
              >
                <span>Mode: {angleMode}</span>
                <span>Memory: {formatNumber(memory)}</span>
              </div>

              <div
                style={{
                  minHeight: "30px",
                  textAlign: "right",
                  color: "#666",
                  fontSize: "19px",
                  overflowWrap: "anywhere",
                }}
              >
                {expression || "0"}
              </div>

              <div
                style={{
                  marginTop: "12px",
                  textAlign: "right",
                  color: "#0D530E",
                  fontSize: "34px",
                  fontWeight: "bold",
                  overflowWrap: "anywhere",
                }}
              >
                {result}
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: "#FFF1F1",
                  color: "#B42318",
                  border: "1px solid #FFD1D1",
                  borderRadius: "10px",
                  padding: "12px",
                  marginBottom: "20px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: "10px",
              }}
            >
              {buttons.map((button, index) => (
                <button
                  key={`${button.label}-${index}`}
                  type="button"
                  onClick={button.action}
                  style={getButtonStyle(button.type)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "22px",
              marginTop: "25px",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.06)",
            }}
          >
            <h2
              style={{
                color: "#0D530E",
                fontSize: "22px",
                marginTop: 0,
              }}
            >
              Calculator Features
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: 1.7,
                marginBottom: 0,
              }}
            >
              This calculator supports addition, subtraction,
              multiplication, division, powers, square roots,
              trigonometric functions, logarithms, percentages,
              parentheses, constants and memory functions.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function getButtonStyle(type: string) {
  const baseStyle = {
    minHeight: "55px",
    padding: "10px 5px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600" as const,
    transition: "transform 0.15s ease",
  };

  if (type === "number") {
    return {
      ...baseStyle,
      background: "#F1F3EE",
      color: "#222",
    };
  }

  if (type === "operator") {
    return {
      ...baseStyle,
      background: "#E7E1B1",
      color: "#0D530E",
    };
  }

  if (type === "equals") {
    return {
      ...baseStyle,
      background: "#0D530E",
      color: "#FFFFFF",
    };
  }

  if (type === "danger") {
    return {
      ...baseStyle,
      background: "#FFE8E8",
      color: "#B42318",
    };
  }

  if (type === "memory") {
    return {
      ...baseStyle,
      background: "#EAF4E7",
      color: "#0D530E",
      fontSize: "14px",
    };
  }

  if (type === "mode") {
    return {
      ...baseStyle,
      background: "#0D530E",
      color: "#FFFFFF",
      fontSize: "14px",
    };
  }

  return {
    ...baseStyle,
    background: "#EDF4EA",
    color: "#0D530E",
    fontSize: "14px",
  };
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  return Number(value.toPrecision(12)).toString();
}

function evaluateExpression(
  expression: string,
  angleMode: AngleMode
): number {
  let preparedExpression = expression
    .replace(/\s+/g, "")
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/−/g, "-")
    .replace(/\^/g, "**")
    .replace(/\bpi\b/g, `(${Math.PI})`)
    .replace(/\be\b/g, `(${Math.E})`);

  const allowedCharacters =
    /^[0-9+\-*/().,\sA-Za-z_*]+$/;

  if (!allowedCharacters.test(preparedExpression)) {
    throw new Error("Unsupported character");
  }

  preparedExpression = replaceFunctions(
    preparedExpression,
    angleMode
  );

  if (/[A-Za-z]/.test(preparedExpression)) {
    throw new Error("Unsupported function");
  }

  const evaluator = new Function(
    `"use strict"; return (${preparedExpression});`
  );

  const value = evaluator();

  if (typeof value !== "number") {
    throw new Error("Invalid result");
  }

  return value;
}

function replaceFunctions(
  expression: string,
  angleMode: AngleMode
): string {
  const functions: Record<string, (value: number) => number> = {
    sin: (value) =>
      Math.sin(convertAngle(value, angleMode)),
    cos: (value) =>
      Math.cos(convertAngle(value, angleMode)),
    tan: (value) =>
      Math.tan(convertAngle(value, angleMode)),
    log: (value) => Math.log10(value),
    ln: (value) => Math.log(value),
    sqrt: (value) => Math.sqrt(value),
    abs: (value) => Math.abs(value),
  };

  let updatedExpression = expression;
  let replacementMade = true;

  while (replacementMade) {
    replacementMade = false;

    for (const [name, handler] of Object.entries(functions)) {
      const functionPattern = new RegExp(
        `${name}\\((-?\\d+(?:\\.\\d+)?)\\)`,
        "g"
      );

      updatedExpression = updatedExpression.replace(
        functionPattern,
        (_, value) => {
          replacementMade = true;
          return handler(Number(value)).toString();
        }
      );
    }
  }

  return updatedExpression;
}

function convertAngle(value: number, mode: AngleMode) {
  if (mode === "DEG") {
    return (value * Math.PI) / 180;
  }

  return value;
}