import React from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default Products;
