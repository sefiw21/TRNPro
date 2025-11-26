import { Heading } from "../../laye_out_components/header";
import { Buttns } from "../../laye_out_components/buttuns";
import { Sidebar } from "./layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { FilterProvider } from "./layout/filterContext";
import  MainContent  from "./MainContent";
export const LibraryApp = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[url('/src/assets/images/videoframe_4860.png')] bg-cover bg-fixed min-h-screen p-8">
       <FilterProvider>
      <Heading title="Welcome to the Reading Section" />
       <div className="flex h-screen bg-blue-500 opacity-50 rounded-2xl">
            <Sidebar />
            <div className="rounded w-full flex justify-between flex-wrap">
            <MainContent/>
            </div>
       </div>
     
      </FilterProvider>
    </div>
  );
};
