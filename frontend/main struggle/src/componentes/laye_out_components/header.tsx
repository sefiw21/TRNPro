
interface HeadingProps {
    title?: string;
}


export const Heading = ({ title }: HeadingProps) => {  
    return (
        <header className="bg-gray-800 opacity-50 text-white p-4 shadow-md m-4 rounded-lg justify-center flex transition duration-300">
            <h1 className="text-3xl font-bold">{title || "Main Struggle"}</h1>
        </header>
    );
}