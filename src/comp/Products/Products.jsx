import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";

export default function Products() {
  const [Products, setProducts] = useState([]);
  const [ProductId, setProductId] = useState("");
    const { addToCart } = useCart();
  useEffect(() => {
    getProducts();
    return () => {};
  }, []);

  async function getProducts() {
    try {
      let res = await axios.get("https://localhost:7163/api/Products");
      console.log(res);
      setProducts(res?.data);
    } catch (err) {
      console.log(err);
    }
  }




    async function getCard() {
    try{
      const token = localStorage.getItem("token");
      let res = await axios.get("https://localhost:7163/api/Cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      console.log(res)
      setCart(res?.data?.items)



    }catch(err){
      console.log(err)



    }

    
  }

  // async function addToCard(id) {
  //   try {
  //     const token = localStorage.getItem("token");

  //     let res = await axios.post(
  //       "https://localhost:7163/api/Cart/Items",
  //       { productId: id, quantity: 1 },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log(res);
  //     getCard()
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <>
      <div className="container flex flex-wrap gap-5 mb-10 mt-[100px] box-content mx-auto justify-center">
        {Products?.map((P, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mt-7 w-[30%] p-10"
          >
            <h1 className="text-center"></h1>
            <a href="#" className="flex justify-center">
              <img
                className="w-32"
                src={`https://localhost:7163${P.imageUrl}`}
                alt="product"
              />
            </a>
            <div className="px-1 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {P.name || "Product Name"}
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {/* النجوم وغيرها */}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {P.category || "Category"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${P.price || "0.00"}
                </span>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => addToCart(P.id)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
