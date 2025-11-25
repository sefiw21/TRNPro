import { useNavigate } from "react-router-dom";
import { Heading } from "../../laye_out_components/header";
import { Buttns } from "../../laye_out_components/buttuns";

export const LearnOralHome = () => {
    const navigate = useNavigate();
    return (
      <div className="bg-[url('/src/assets/images/teach.png')] bg-cover bg-local min-h-screen p-8">
        <Heading title="Welcome to the Learn Oral Section" />
        <p className="text-green-500 font-bold mb-4 ">
          Here you can find various oral learning materials to enhance your mental skills.
        </p>
        <Buttns text="go to oral lessons" onClick={() => navigate('/oral-lessons')} />
      </div>
    );
  }