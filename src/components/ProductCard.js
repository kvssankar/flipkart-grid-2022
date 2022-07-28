import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  return (
    <div style={{ width: 300 }} className="bg-gray-100 p-3 rounded-md">
      <div className="top mb-3">
        <img
          className="rounded-md"
          src="https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="mobile"
        />
      </div>
      <div className="bottom">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="text-sm mb-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam,
          porro? Quisquam vitae neque, dolores ducimus, aliquid autem
          accusantium fuga accusamus vero error qui! Voluptatem, quos!
        </p>
        <Button colorScheme="red" size="sm">
          Buy $9
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
