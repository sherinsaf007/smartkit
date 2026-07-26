"use client";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ToolCard from "../components/ToolCard";
import Hero from "../components/home/Hero";
import Statistics from "../components/home/Statistics";
import PopularTools from "../components/home/PopularTools";
import FeaturedTools from "../components/home/FeaturedTools";
import Categories from "../components/home/Categories";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const tools = [
  {
    title: "GST Calculator",
    description: "Calculate GST instantly.",
    link: "/gst-calculator",
    category: "Finance",
  },
  {
    title: "Character Counter",
    description: "Count words and characters.",
    link: "/character-counter",
    category: "Text",
  },
  {
    title: "Currency Converter",
    description: "Convert currencies worldwide.",
    link: "/currency-converter",
    category: "Finance",
  },
  {
    title: "Age Calculator",
    description: "Know your exact age instantly.",
    link: "/age-calculator",
    category: "Utilities",
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index.",
    link: "/bmi-calculator",
    category: "Utilities",
  },
  {
    title: "EMI Calculator",
    description: "Calculate your monthly EMI.",
    link: "/emi-calculator",
    category: "Finance",
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentages easily.",
    link: "/percentage-calculator",
    category: "Finance",
  },
  {
    title: "Loan Calculator",
    description: "Estimate loan repayments.",
    link: "/loan-calculator",
    category: "Finance",
  },
  {
  title: "QR Code Generator",
  description: "Generate QR codes instantly.",
  link: "/qr-code-generator",
  category: "Utilities",
},
{
  title: "Password Generator",
  description: "Generate secure random passwords.",
  link: "/password-generator",
  category: "Utilities",
},
{
  title: "Unit Converter",
  description: "Convert length units instantly.",
  link: "/unit-converter",
  category: "Utilities",
},
];
  return (
    <>
      <Navbar />

      <main
        style={{
          background:
  "linear-gradient(to bottom, #FBF5DD 0%, #FFFDF5 50%, #FFFFFF 100%)",
          minHeight: "100vh",
          padding: "40px 20px",
        }}
      >
      <Hero
  search={search}
  setSearch={setSearch}
/>
        <Statistics />
<PopularTools />
          <FeaturedTools
  tools={tools}
  search={search}
  selectedCategory={selectedCategory}
/>
            <Categories
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>
      </main>
      <Footer />
    </>
  );
}