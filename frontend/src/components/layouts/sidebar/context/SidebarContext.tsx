import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

type SidebarContextProps = {
  children: ReactNode;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarContextProvider = ({ children }: SidebarContextProps) => {
  // We use standard state for both sidebars
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSmallOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the listener when the component unmounts (crucial for performance)
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsSmallOpen((prev) => !prev);
    } else {
      setIsLargeOpen((prev) => !prev);
    }
  };

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggleSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebarContext must be used within a SidebarContextProvider",
    );
  }
  return context;
};

export default SidebarContext;
