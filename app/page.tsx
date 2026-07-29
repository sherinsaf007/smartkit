"use client";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import Statistics from "../components/home/Statistics";
import PopularTools from "../components/home/PopularTools";
import FeaturedTools from "../components/home/FeaturedTools";
import Categories from "../components/home/Categories";
import WhySmartKit from "../components/home/WhySmartKit";
import RecentlyAdded from "../components/home/RecentlyAdded";
import { tools } from "./data/tools";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
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
<WhySmartKit />
<RecentlyAdded />
            <Categories
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>
      </main>
      <Footer />
    </>
  );
}