import {useNavigate } from "react-router-dom";
import { Heading } from "./header";
import { Buttns } from "./buttuns";
import {SmartButton} from "./SmartButton"
export const BigHome = () => {
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col items-center justify-center bg-[url('/src/assets/images/bigHome1.jpg')] p-8 opacity-100 rounded-lg shadow-lg`}>
        <Heading title="Welcome to the Big Home Component" />
      <Buttns
        text="Go to Mental Section"
        onClick={() => navigate("/Mental_main")}
      />
      <Buttns text="Spritual sections" 
      onClick={() => navigate("/Spritual_main")}
       />
         <Buttns text="Go to Phsical" 
      onClick={() => navigate("/phisycal_main")}
       /> 

         <div>
      <SmartButton to="/phisycal_main" text="Mental Section" />
      <SmartButton to="/spiritual" text="Spiritual Section" />
    </div>
    </div>
  );
};
