import React from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../laye_out_components/header";
import { Buttns } from "../laye_out_components/buttuns";
const phisycal_main = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center bg-[url('/src/assets/images/phisycal.png')] bg-cover p-8 opacity-100">
      <Heading title="Welcome to the phisycal health and wealth home" />
      <Buttns
        text="Phisycal Health section"
        onClick={() => navigate("/Health")}
      />
      <Buttns
        text="Income Status"
        onClick={() => navigate("/Income")}
      />
       <Buttns
        text="Income Status"
        onClick={() => navigate("/Income")}
      /> <Buttns
        text="Income Status"
        onClick={() => navigate("/Income")}
      /> <Buttns
        text="Income Status"
        onClick={() => navigate("/Income")}
      /> <Buttns
        text="Income Status"
        onClick={() => navigate("/Income")}
      /> <Buttns
        text="Income Status"
        onClick={() => navigate("/Income")}
      /> <Buttns
        text="Income Status"
        onClick={() => navigate("/Income")}
      /> <Buttns
        text="Income Status"
        onClick={() => navigate("/Income")}
      />
    </div>
  );
};

export default phisycal_main;
