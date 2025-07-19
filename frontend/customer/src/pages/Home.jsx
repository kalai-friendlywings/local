import React from "react";
import SearchFilterBar from "../components/SearchFilterBar";
import TrendingProducts from "../components/TrendingProducts";
import AdsBanner from "../components/AdsBanner";
import AdsBanner3 from "../components/AdsBanner3";
import AdsBanner4 from "../components/AdsBanner4";
import AdsBanner2 from "../components/AdsBanner2";
import CategoryScroller from "../components/CategoryScroller";
import Filter from "../components/Filter";
import PopularShops from "../components/PopularShops";
import Bar from "../components/Bar"; // Only once
import AppBar from "../components/AppBar";

function Home() {
  return (
    <div className="container px-0 mt-4">
      <Bar />
      <SearchFilterBar />
      <Filter />
      <AdsBanner4/>
      <CategoryScroller />
      <AdsBanner/>
      <TrendingProducts />
      <AdsBanner2/>
      <PopularShops />
      <AdsBanner3/>
      <AppBar /> {/* ✅ No .jsx */}
    </div>
  );
}

export default Home;
