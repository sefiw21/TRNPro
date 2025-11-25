
import { Link } from "react-router-dom";


const NotFoundPage = () => {    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold">404 - Page Not Found Page</h1>
            <p className="mb-4">The page you are looking for does not exist.</p>
            <button className="bg-red-700 text-red-300 p-2 rounded-md hover:bg-black-500 hover:text-white transition duration-300">
                <Link to="/">Go to Home Page</Link>
            </button>
        </div>
    );
}

export default NotFoundPage;