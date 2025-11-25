
import { Heading } from "../../laye_out_components/header";
import { Buttns } from "../../laye_out_components/buttuns";
import {Sidebar} from "./layout/Sidebar";
import { useNavigate } from "react-router-dom";


export const ReadingHome = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[url('/src/assets/images/videoframe_4860.png')] bg-cover min-h-screen p-8">
      <Heading title="Welcome to the Reading Section" />
      <p className="text-green-500 font-bold mb-4 ">
        Here you can find various reading materials to enhance your mental skills.
      </p>
      <Sidebar />
      <Buttns text="go to books" onClick={() => navigate('/booklist')} />
    </div>
  );
};