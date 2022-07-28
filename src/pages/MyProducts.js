import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const MyProducts = ({ user, addProduct }) => {
  var products = localStorage.getItem("myproducts");
  products = JSON.parse(products);
  const localuser = localStorage.getItem("user");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [months, setMonths] = useState("");
  const [coverage, setCoverage] = useState("");
  const [img, setImg] = useState("");

  return (
    <div className="flex flex-col">
      <Button
        colorScheme={!open ? "blue" : "red"}
        size="md"
        width="max-content"
        mb={3}
        onClick={() => setOpen(!open)}
      >
        {!open ? "Add Product" : "Cancel"}
      </Button>
      {open && (
        <div className="form flex flex-col gap-y-2">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="text"
              name="image"
              onChange={(e) => setImg(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Months</FormLabel>
            <Input
              type="number"
              name="months"
              onChange={(e) => setMonths(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Coverage</FormLabel>
            <Input
              type="number"
              name="coverage"
              onChange={(e) => setCoverage(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="green"
            onClick={() =>
              addProduct(
                name,
                price,
                description,
                img,
                months,
                coverage,
                localuser
              )
            }
          >
            Create Product
          </Button>
        </div>
      )}
      <div>
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default MyProducts;
