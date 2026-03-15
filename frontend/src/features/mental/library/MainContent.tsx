// import { Buttns } from "../../laye_out_components/buttuns";
import { useNavigate } from "react-router-dom";
// import { Heading } from "../../laye_out_components/header"
import axios from "axios";
import { Tally3 } from "lucide-react";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { useFilter } from "./layout/filterContext";
const MainContent = () => {
  const navigate = useNavigate();
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyWord } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyWord) {
      url = `https://dummyjson.com/products/search?q=${keyWord}`;
    }

    axios
      .get(url)
      .then((Response) => {
        setProducts(Response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [currentPage, keyWord]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory,
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice,
      );
    }
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice,
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheep":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };
  const filteredProducts = getFilteredProducts();

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    }
    if (currentPage + 2 > totalPages) {
      startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <>
      {/* <Heading title="Single Book Detail" /> */}
      <section className="relative m-5 min-h-screen p-5">
        {/* Background Image with Overlay */}
        <div className="fixed inset-0 -z-10">
          <img
            src="/src/assets/images/image.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Filter Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="group relative bg-white/10 backdrop-blur-md border border-white/20 
                       px-6 py-3 rounded-2xl flex items-center justify-center gap-3
                       text-white font-medium transition-all duration-500 ease-out
                       hover:bg-white/15 hover:border-cyan-400/50 hover:scale-105
                       hover:shadow-2xl hover:shadow-cyan-500/25
                       min-w-[140px]"
                >
                  {/* Animated Icon */}
                  <div
                    className={`transition-transform duration-300 ${
                      dropdownOpen ? "rotate-90" : ""
                    }`}
                  >
                    <Tally3 className="w-5 h-5" />
                  </div>

                  <span className="text-lg">
                    {filter === "all"
                      ? "Filter"
                      : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </span>

                  {/* Hover Gradient Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/0 via-purple-500/0 to-amber-500/0 
                            group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-amber-500/10
                            transition-all duration-500 opacity-0 group-hover:opacity-100 -z-10"
                  ></div>
                </button>

                {/* Enhanced Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-3 z-50 
                    bg-white/80 backdrop-blur-xl 
                    border border-white/40 rounded-2xl 
                    shadow-2xl shadow-black/30
                    overflow-hidden transform origin-top 
                    transition-all duration-300
                    animate-in fade-in-0 zoom-in-95 w-48"
                  >
                    {/* Dropdown Header */}
                    <div className="p-3 border-b border-white/30 bg-linear-to-r from-cyan-500/10 to-purple-500/10">
                      <h3 className="text-sm font-semibold text-gray-700">
                        Sort By
                      </h3>
                    </div>

                    {/* Dropdown Options */}
                    <div className="p-1">
                      <button
                        onClick={() => {
                          setFilter("cheep");
                          setDropdownOpen(false);
                        }}
                        className="group w-full px-4 py-3 text-left rounded-xl transition-all duration-300
                     hover:bg-linear-to-r hover:from-green-500/20 hover:to-emerald-500/20
                     hover:translate-x-2 flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-gray-700 group-hover:text-green-600 font-medium">
                          Cheap
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setFilter("expensive");
                          setDropdownOpen(false);
                        }}
                        className="group w-full px-4 py-3 text-left rounded-xl transition-all duration-300
                             hover:bg-linear-to-r hover:from-red-500/20 hover:to-pink-500/20
                             hover:translate-x-2 flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-gray-700 group-hover:text-red-600 font-medium">
                          Expensive
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setFilter("popular");
                          setDropdownOpen(false);
                        }}
                        className="group w-full px-4 py-3 text-left rounded-xl transition-all duration-300
                             hover:bg-linear-to-r hover:from-purple-500/20 hover:to-blue-500/20
                             hover:translate-x-2 flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-gray-700 group-hover:text-purple-600 font-medium">
                          Popular
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Results Count */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3">
                <span className="text-white font-medium">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "Product" : "Products"} Found
                </span>
              </div>
            </div>
          </div>
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 max-w-md mx-auto">
                <div className="w-24 h-24 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Tally3 className="w-12 h-12 text-white/60" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  No Products Found
                </h3>
                <p className="text-white/70">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="transform transition-all duration-500 ease-out hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <BookCard
                  id={product.id}
                  title={product.title}
                  image={product.thumbnail}
                  price={product.price}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
            {/* previos btn */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-blue-400 px-4 py-2 mx-2 rounded-full ${currentPage === 1 ? "bg-gray-500" : ""}`}
            >
              {currentPage === 1 ? "You are on the first page" : "Previous"}
            </button>
            {/* 1,2,3,4,..... */}
            <div className="flex flex-wrap justify-center">
              {getPaginationButtons().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 mx-1 rounded-full ${
                    page === currentPage ? "bg-black text-white" : ""
                  }`}
                >
                  {" "}
                  {page}
                </button>
              ))}
            </div>

            {/* next btn */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`bg-blue-400 px-4 py-2 mx-2 rounded-full ${currentPage === totalPages ? "bg-gray-500" : ""}`}
            >
              {currentPage === totalPages
                ? "You reached the last page"
                : "Next"}
            </button>
          </div>

          {/*  */}
        </div>
      </section>
    </>
  );
};

export default MainContent;
