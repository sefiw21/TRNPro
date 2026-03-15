import type { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
// 1. Define the type/interface for the filter state (e.g., your filters)
interface FilterState {
  category: string;
  sortBy: "date" | "name" | "price";
  // Add other filter properties here
}

// 2. Define the type/interface for the Context's VALUE
// This includes the state AND the setter function(s)
interface FilterContextType {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
}

// 3. Create the Context (with a default, non-null value)
// We assert the type using 'as FilterContextType'
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Define the type for the Provider's props (children)
interface FilterProviderProps {
  children: ReactNode;
}

// 4. Create the Provider Component
export const FilterProvider: FC<FilterProviderProps> = ({ children }) => {
  // Initialize the state
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    sortBy: "date",
  });

  // Create the value object
  const value = { filters, setFilters };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

// 5. Create the Custom Hook (The 'useContext()' part)
// This hook safely handles the required type checking.
export const useFilter = () => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    // This throws the error from SCENE 5: Mistake 1!
    throw new Error("useFilter must be used within a FilterProvider");
  }

  return context;
};
