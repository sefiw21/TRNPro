import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

// First, let's define what our Filter Context looks like
interface FiterContextType {
  searchQuery: string;
  setSearchQuery: (Query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  keyWord: string;
  setKeyWrord: (keyword: string) => void;
}

// Create our context house
const FilterContext = createContext<FiterContextType | undefined>(undefined);

// Now, let's create the Provider that will wrap our app
interface FilterProviderProps {
  children: ReactNode; // This tells TypeScript we accept children!
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  // Let's create all our state variables properly
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [keyWord, setKeyWrord] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// Finally, let's create a hook to use our filter
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
