import { Buttns } from "../laye_out_components/buttuns";
import { Heading } from "../laye_out_components/header";
import { useNavigate } from "react-router-dom";

export const Babys = () => {
  const navigate = useNavigate();

  return ( 
    <div>
      <Heading title="Manage Babys home" />
          <Buttns
        text="See Babys List"
        onClick={() => navigate("/BabyList")}
      />
    </div>
    );
};