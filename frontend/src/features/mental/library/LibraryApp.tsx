import { useState } from "react";
// import { Buttns } from "../../laye_out_components/buttuns";
import { Sidebar } from "./layout/Sidebar.tsx";
// import { useNavigate } from "react-router-dom";
import { FilterProvider } from "./layout/filterContext.tsx";
import MainContent from "./MainContent.tsx";

export const LibraryApp = () => {
  // const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative min-h-screen w-full">
      {/* <div className="fixed w-full block ">
        <Heading title="Welcome to the Reading Section" />
      </div> */}
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/src/assets/images/library.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative p-8">
        <FilterProvider>
          {/* Toggle Button - Always Visible */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-6 left-2 z-60 p-3 opacity-45 bg-black/90 backdrop-blur-sm 
                       rounded-xl shadow-lg border border-white/20 
                       hover:bg-white hover:scale-110 transition-all duration-300
                       group"
          >
            {/* Hamburger Icon */}
          </button>

          <div className="flex">
            {/* Sidebar with Animation */}
            <aside
              className={`fixed inset-y-0 mt-40 left-0 z-50 w-64 
                             transform transition-all duration-500 ease-in-out
                             ${
                               sidebarOpen
                                 ? "translate-x-0"
                                 : "-translate-x-full"
                             }`}
            >
              <Sidebar />
            </aside>

            {/* Main Content with Dynamic Margin */}
            <div
              className={`flex-1 transition-all duration-500 ease-in-out
                           ${sidebarOpen ? "ml-64" : "ml-0"}`}
            >
              <MainContent />
            </div>
          </div>
        </FilterProvider>
      </div>
    </div>
  );
};
