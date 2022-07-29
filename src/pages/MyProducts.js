import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import MyProductCard from "../components/MyProductCard";

const MyProducts = ({ addProduct, products }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [months, setMonths] = useState("");
  const [coverage, setCoverage] = useState("");

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="Image"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Months</FormLabel>
            <Input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="Months"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Coverage</FormLabel>
            <Input
              type="number"
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
              placeholder="Coverage"
            />
          </FormControl>

          <Button
            onClick={() =>
              addProduct(name, description, price, img, months, coverage)
            }
            colorScheme="green"
          >
            Create Product
          </Button>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {products.map((product) => (
          <MyProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
