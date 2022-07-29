import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Products = ({ getmyprodcuts }) => {
  const [products, setProducts] = useState([]);
  const getAllProducts = () => {
    const config = {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    axios
      .get("/api/product/allProducts", config)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="flex flex-wrap gap-3">
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default Products;
