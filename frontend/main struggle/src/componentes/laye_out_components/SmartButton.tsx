// Make your Button component SMART!
import { useNavigate } from "react-router-dom";



interface ButtnsProps extends React.ComponentPropsWithRef<"button"> {
    text: string;
    to:string;     
}

export const SmartButton = ({ to, text, ...props}: ButtnsProps ) => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate(to)}
      {...props}
      className="bg-black text-amber-100" 
    >
      {text}
    </button>
  );
};
export default SmartButton;