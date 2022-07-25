import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const MyProducts = () => {
  const [open, setOpen] = useState(false);
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
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input type="number" />
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <Button colorScheme="green">Create Product</Button>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
