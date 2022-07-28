import React from "react";
import ProductCard from "../components/ProductCard";

const Products = ({ allproducts }) => {
  var products = localStorage.getItem("myproducts");
  products = JSON.parse(products);
  return (
    <div className="flex flex-wrap gap-3">
      <div>
        {allproducts.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
      {/* <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard /> */}
    </div>
  );
};

export default Products;
