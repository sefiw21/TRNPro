import { Buttns } from "../../laye_out_components/buttuns";
import { useNavigate } from "react-router-dom";
import{Heading} from"../../laye_out_components/header";


export const BookList = () => {
    const navigate = useNavigate();
    return (

        <div className="p-8 bg-[url('/src/assets/images/books.jpg')] bg-cover min-h-screen">
            <Heading title="Book List" />
            <ul className="list-disc list-inside text-3xl font-semibold text-white p-4 rounded-lg opacity-60">
                <li className="mb-2">Book 1: Introduction to Mental Skills <span><Buttns text="Look detail" onClick={() => navigate('/singlBook')} />
                </span></li>
                <li className="mb-2">Book 2: Advanced Reading Techniques <span><Buttns text="Look detail" onClick={() => navigate('/singlBook')} />
                </span></li>
                <li className="mb-2">Book 3: Oral Learning Strategies <span><Buttns text="Look detail" onClick={() => navigate('/singlBook')} />
                </span></li>
                <li className="mb-2">Book 4: Enhancing Cognitive Abilities <span><Buttns text="Look detail" onClick={() => navigate('/singlBook')} />
                </span></li>
            </ul>
        </div>
    );
}