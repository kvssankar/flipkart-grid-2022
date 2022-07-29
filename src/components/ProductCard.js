import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  return (
    <div style={{ width: 300 }} className="bg-gray-100 p-3 rounded-md">
      <div className="top mb-3">
        <img
          className="rounded-md"
          src={
            product.image ||
            "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          }
          alt="mobile"
        />
      </div>
      <div className="bottom">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="text-sm mb-3">{product.description}</p>
        <Button colorScheme="red" size="sm">
          Buy {product.price}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
