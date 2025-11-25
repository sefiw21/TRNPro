import {useNavigate } from "react-router-dom";
import { Heading } from "./header";
import { Buttns } from "./buttuns";
export const BigHome = () => {
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col items-center justify-center bg-[url('/src/assets/images/bigHome1.jpg')] p-8 opacity-100 rounded-lg shadow-lg`}>
      
      <Heading title="Welcome to the Big Home Component" />
      <Buttns
        text="Go to Reading Section"
        onClick={() => navigate("/reading")}
      />
      <Buttns text="Manage Babys" 
      onClick={() => navigate("/babys")}
       />
        <Buttns text="Go to Oral Lessons" 
      onClick={() => navigate("/oral-lessons")}
       />
    </div>
  );
};
