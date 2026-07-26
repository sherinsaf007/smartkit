"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function CharacterCounter() {
  const [text, setText] = useState("");

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
            width: "700px",
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
            Character Counter
          </h1>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text..."
            style={{
              width: "100%",
              height: "220px",
              padding: "15px",
              fontSize: "17px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              resize: "none",
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              marginTop: "25px",
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              color: "#0D530E",
            }}
          >
            <span>Characters: {text.length}</span>

            <span>
              Words:{" "}
              {text.trim()
                ? text.trim().split(/\s+/).length
                : 0}
            </span>
          </div>
        </div>
      </main>
    </>
  );
}