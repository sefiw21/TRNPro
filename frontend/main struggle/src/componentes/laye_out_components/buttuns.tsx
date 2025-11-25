

interface ButtnsProps {
    text: string;
    onClick?: () => void;
}

export const Buttns = ({text, onClick}: ButtnsProps) => {
    return (
        <div>
            <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-4 mb-2 shadow hover:shadow-lg cursor-pointer transition duration-300">
                {text}
            </button>
        </div>
    );
}