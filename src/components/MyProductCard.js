import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const MyProductCard = ({ product }) => {
  return (
    <div style={{ width: 300 }} className="bg-gray-100 p-3 rounded-md">
      <div className="top mb-3">
        <img className="rounded-md" src={product.image} alt="mobile" />
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

export default MyProductCard;
