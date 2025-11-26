import React, { useState, useEffect } from "react";
import { useFilter } from "./filterContext";
interface Product {
  category: string;
}

interface FetchREsponse {
  products: Product[];
}

const Sidebar = () => {
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
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchREsponse = await response.json();
        const uniqCategories = Array.from(
          new Set(data.products.map((product) => product.category))
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

  const handleMxaPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="w-64 p-5 h-screen bg-teal-500  opacity-50 rounded-2xl">
      <h1 className="text-2xl font-bold mb-10 mt-4"> React store </h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="search product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-3 py-3 w-full"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-2 mr-2 px-3 py-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMxaPriceChange}
          />
        </div>

        {/* categories sectionn */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb3">Categories</h2>
        </div>

        <section>
          {categories.map((category, index) => (
            <label htmlFor="" key={index} className="block mb-2 ">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-4 h-4"
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/*key words section  */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb3">key words</h2>
        </div>

        <div className="">
          {ksewords.map((keyword, index) => (
            <button
              key={index}
              value={keyWord}
              onClick={() => handleKeyWordClick(keyword)}
              className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          onClick={handleResetFilter}
          className="w-full mb-16 py-2 bg-black text-white rounded mt-5"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};
export { Sidebar };
