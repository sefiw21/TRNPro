import React from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
      <img
  src={image}
  alt={title}
  className="w-full h-32 object-cover mb-2 
    /* Infinite subtle animation */
     animate-float 
    /* Hover effects */
    transition-all duration-500 ease-in-out 
    hover:scale-105 hover:rotate-1 hover:shadow-2xl
    /* Glow effects */
    shadow-lg hover:shadow-blue-500/25
    /* Border and rounding */
    rounded-xl border-2 border-white/10 hover:border-blue-400/30
    /* Filter effects */
    hover:brightness-110 saturate-110"
/>
        <h2 className="font-bold text-amber-50">{title}</h2>
        <p className="hover:animate-bounce text-amber-50 hover:font-semibold ">${price}</p>
      </Link>
    </div>
  );
};

export default BookCard;
