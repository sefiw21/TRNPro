import { ArrowBigRightDash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useFilter } from "./filterContext";

interface Product {
  category: string;
}

interface FetchREsponse {
  products: Product[];
}

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyWord,
    setKeyWrord,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [ksewords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        searchInputRef.current?.focus();
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchREsponse = await response.json();
        const uniqCategories = Array.from(
          new Set(data.products.map((product) => product.category)),
        );
        setCategories(uniqCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeyWordClick = (keyword: string) => {
    setKeyWrord(keyword);
  };

  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMaxPrice(undefined);
    setMinPrice(undefined);
    setKeyWrord("");
  };

  return (
    <section className="w-64 h-screen relative overflow-hidden rounded-2xl">
      {/* Background Image with Enhanced Effects */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/images/image.png"
          alt="Sidebar Background"
          className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-6 left-2 z-60 p-3 opacity-45 bg-black/90 backdrop-blur-sm 
                       rounded-xl shadow-lg border border-white/20 
                       hover:bg-white hover:scale-110 transition-all duration-300
                       group"
        >
          <ArrowBigRightDash />
        </button>
        {/* Multi-layer Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/60 via-blue-900/40 to-emerald-900/50 rounded-2xl"></div>
        <div className="absolute inset-0 bg-black/40 rounded-2xl backdrop-blur-[1px]"></div>
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500/20 via-transparent to-cyan-500/20 animate-pulse-slow"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full p-5 text-amber-50 flex flex-col">
        {/* Header with Logo Effect */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-2xl font-bold bg-linear-to-r from-amber-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
            React Store
          </h1>
          <div className="w-16 h-1 bg-linear-to-r from-amber-400 to-cyan-400 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Search Input with Glow Effect */}
        <div className="relative mb-6 group">
          <input
            ref={searchInputRef}
            type="text"
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl 
                   text-amber-50 placeholder-amber-200/70
                   transition-all duration-300 ease-out
                   focus:bg-white/15 focus:border-cyan-400/50 focus:shadow-lg focus:shadow-cyan-500/25
                   group-hover:bg-white/15 group-hover:border-amber-400/30
                   focus:scale-105 group-hover:scale-105"
            placeholder="🔍 Search product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div
            className="absolute inset-0 rounded-xl bg-linear-to-r from-amber-500/0 via-cyan-500/0 to-purple-500/0 
                      group-hover:from-amber-500/10 group-hover:via-cyan-500/10 group-hover:to-purple-500/10
                      transition-all duration-500 opacity-0 group-hover:opacity-100 -z-10"
          ></div>
        </div>

        {/* Price Range with Modern Design */}
        <div className="mb-6">
          <div className="flex space-x-2 mb-3">
            <div className="relative flex-1 group">
              <input
                type="text"
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg
                       text-amber-50 placeholder-amber-200/70 text-sm
                       transition-all duration-300
                       focus:bg-white/15 focus:border-green-400/50
                       group-hover:bg-white/15 group-hover:border-green-400/30"
                placeholder="Min $"
                value={minPrice ?? ""}
                onChange={handleMinPriceChange}
              />
            </div>
            <div className="relative flex-1 group">
              <input
                type="text"
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg
                       text-amber-50 placeholder-amber-200/70 text-sm
                       transition-all duration-300
                       focus:bg-white/15 focus:border-red-400/50
                       group-hover:bg-white/15 group-hover:border-red-400/30"
                placeholder="Max $"
                value={maxPrice ?? ""}
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-cyan-100 drop-shadow-sm flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
            Categories
          </h2>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <label
                key={index}
                className="flex items-center group cursor-pointer"
              >
                <div className="relative">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    className="sr-only"
                    onChange={() => handleRadioChangeCategories(category)}
                    checked={selectedCategory === category}
                  />
                  <div
                    className={`w-4 h-4 border-2 rounded-full mr-3 transition-all duration-300
                ${
                  selectedCategory === category
                    ? "border-cyan-400 bg-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "border-white/40 group-hover:border-cyan-300"
                }`}
                  >
                    {selectedCategory === category && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    )}
                  </div>
                </div>
                <span
                  className={`transition-all duration-300 group-hover:text-cyan-200 group-hover:translate-x-1
              ${selectedCategory === category ? "text-cyan-300 font-medium" : "text-amber-100"}`}
                >
                  {category.toUpperCase()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-cyan-100 drop-shadow-sm flex items-center">
            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></span>
            Key Words
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {ksewords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeyWordClick(keyWord)}
                className="px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg
                       text-amber-100 text-xs font-medium
                       transition-all duration-300 ease-out
                       hover:bg-linear-to-r hover:from-cyan-500/20 hover:to-purple-500/20
                       hover:border-cyan-400/30 hover:scale-105
                       active:scale-95
                       group relative overflow-hidden"
              >
                <span className="relative z-10">{keyword.toUpperCase()}</span>
                <div
                  className="absolute inset-0 bg-linear-to-r from-cyan-500/0 to-purple-500/0 
                            group-hover:from-cyan-500/10 group-hover:to-purple-500/10
                            transition-all duration-300"
                ></div>
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button with Amazing Hover Effect */}
        <div className="mt-auto">
          <button
            onClick={handleResetFilter}
            className="w-full py-3 bg-linear-to-r from-cyan-600/80 to-purple-600/80 
                   backdrop-blur-md border border-white/20 rounded-xl
                   text-white font-semibold
                   transition-all duration-500 ease-out
                   hover:from-cyan-500 hover:to-purple-500
                   hover:shadow-2xl hover:shadow-cyan-500/25
                   hover:scale-105 hover:border-cyan-300/50
                   active:scale-95
                   relative overflow-hidden group"
          >
            <span className="relative z-10">Reset Filters</span>
            <div
              className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 
                        transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                        transition-transform duration-1000"
            ></div>
          </button>
        </div>
      </div>
    </section>
  );
};
export { Sidebar };
