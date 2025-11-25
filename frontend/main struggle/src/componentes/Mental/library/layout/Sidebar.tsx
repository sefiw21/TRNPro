import {useEffect, useState} from 'react';

interface Product{
  catagory: string;
}

interface FetchResponse {
  products: Product[];
}



export const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "gedlat",
    "simpel",
    "advise"
  ])

  useEffect(()=>{
    const fetchCatagories = async () =>{
      try {
        const response = await fetch('https://dummyjson.com/products')
        const data: FetchResponse = await response.json()
        console.log(data)
        
      } catch (error) {
        console.log('Error fetching data', error)
      }
    }
      fetchCatagories();
  },[])

  return (
    <div>Sidebar</div>
  )
}
