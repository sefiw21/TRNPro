import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/layouts/header/Header.tsx";
import Sidebar from "./components/layouts/sidebar/Sidebar.tsx";
import CategoryPills from "./components/ui/CategoryPills.tsx";
import { Categories } from "./types";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(Categories[0]);

  return (<>
    <div className="h-screen w-full bg-[#020617] text-slate-200 overflow-hidden flex flex-col font-sans antialiased selection:bg-amber-500/30">


      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] -left-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]" />
      </div>

      {/* 3. Top Navigation */}
      <Header />

      {/* 4. Main App Layout (Sidebar + Content) */}
      <div className="flex flex-1 overflow-hidden relative z-10">

        {/* Sidebar Component handles its own width states */}
        <Sidebar />

        {/* 5. Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-[#0f172a]/20">

          {/* Category Pills Header: Frosted glass sticky effect */}
          <div className="shrink-0 px-4 md:px-8 pt-4 pb-2 z-20 bg-[#020617]/60 backdrop-blur-xl border-b border-white/5">
            <CategoryPills
              categories={Categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {/* 6. Dynamic Route Content (The ONLY scrollable area) */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 custom-scrollbar scroll-smooth">
            {/* The Outlet renders whatever page component the user navigated to */}
            <Outlet />
          </div>

        </main>
      </div>
    </div>
  </>
  );
}

export default App;