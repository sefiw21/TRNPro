import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const singlBook = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((Response) => {
          setProduct(Response.data);
        })
        .catch((error) => {
          console.error(`Error fetching singl book ${error}`);
        });
    }
  }, [id]);
  if (!product) {
    return <h1 className="flex ">Loading...</h1>;
  }
  return (
    <div className="bg-[url('/src/assets/images/Book.jpg')] bg-gray-700 bg-cover min-h-screen p-8">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-50% h-auto mb-2 
    transition-all duration-500 ease-in-out "
      />
      <div className="bg-blue-800 rounded-2xl m-2 p-2 flex justify-center align-center flex-col">
        <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
        <div className="bg-blue-700 p-2 rounded-2xl">
          <p className=" text-black w-70% mb ">{product.description}</p>

          <div className="flex justify-between m-4 bg-blue-600 w-auto rounded-2xl">
            <p className="text-black p-2 px-3 font-semibold ">
              Price: ${product.price}
            </p>
            <p className=" text-black p-2 px-3 font-semibold ">
              Rating: {product.rating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default singlBook;
