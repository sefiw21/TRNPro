// import React from 'react'
// import ReactDOM from 'react'
import { useNavigate } from "react-router-dom";
import { FilterProvider } from "./library/layout/filterContext";
import { Buttns } from "../laye_out_components/buttuns";

const Mental_main = () => {
  const navigate = useNavigate();
  return (
 <div className={`bg-[url('/src/assets/images/mental.png')] flex flex-col items-center justify-center bg-cover p-8 rounded-lg`}>
     <FilterProvider>
   <Buttns
        text="Go to Reading Section"
        onClick={() => navigate("/reading")}
      />
      <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />
     </FilterProvider>
    </div>
  );
};

export default Mental_main;
