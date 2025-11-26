// import { Buttns } from "../../laye_out_components/buttuns";
import { useNavigate } from "react-router-dom";
import { Heading } from "../../laye_out_components/header";
// import { useFilter } from "./layout/filterContext";
import { useState } from "react";
import { Filter, Tally3 } from "lucide-react";

const MainContent = () => {
  const navigate = useNavigate();
  //  const {
  //     searchQuery,
  //     selectedCategory,
  //     minPrice,
  //     maxPrice,
  //     keyWord,
  //   } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropDowdOpen] = useState(true);
  const itemsPerPage = 12;

  return (
    <section>
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between item-center">
          <div className="relative m-5 mt-5">
            <button className="border px-4 py4 rounded-full flex item-center">
              <Tally3 className="mr-2" />

              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>


            {dropdownOpen && (
                <div className="absoulte bg-white border-b-gray-300 rounded mt-2 w-full sm:w-40">
                    <button onClick={() => setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                       Cheap
                    </button>
                    <button onClick={() => setFilter('expensive')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                        Expensive
                    </button>
                    <button onClick={() => setFilter('popular')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                        Popular
                    </button>
                </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
