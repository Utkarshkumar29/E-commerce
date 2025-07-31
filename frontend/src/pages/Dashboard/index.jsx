import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Dashbord = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:5000/api/product/all");
      setProducts(response.data.products);
      console.log(response);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      {products &&
        products.map((product, index) => {
          return (
            <div className=" flex flex-col gap-2">
              <a
                className=" cursor-pointer "
                key={index}
                href={`/product/${product._id}`}
              >
                {product.name}
              </a>
            </div>
          );
        })}
    </div>
  );
};

export default Dashbord;
