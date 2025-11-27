// import React from 'react'
// import ReactDOM from 'react'
import { useNavigate } from "react-router-dom";
import { FilterProvider } from "./library/layout/filterContext";
import { Buttns } from "../laye_out_components/buttuns";

const Mental_main = () => {
  const navigate = useNavigate();
  return (
 <div className={`bg-[url('/src/assets/images/mental.png')] bg-fixed flex flex-col bg-ata items-center justify-center bg-fite p-8`}>
     <FilterProvider>
   <Buttns
        text="Go to Reading Section"
        onClick={() => navigate("/reading")}
      />
      <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />    <Buttns
        text="Go to Oral Lessons"
        onClick={() => navigate("/oral-lessons")}
      />
     </FilterProvider>
    </div>
  );
};

export default Mental_main;
