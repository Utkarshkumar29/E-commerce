
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RazorPayButton from "../../components/RazorPayButton";

const SingleProduct = () => {
  const { id } = useParams()
  const [product,setProduct]=useState(null)

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${id}`)
        setProduct(response.data.product)
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    };

    fetchProductById()
  }, [])
  
  return (
    <div>
      <h1>Single Product Page</h1>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <RazorPayButton/>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
