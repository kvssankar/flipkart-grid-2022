import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import MyProductCard from "../components/MyProductCard";

import { create as ipfsHttpClient } from "ipfs-http-client";

import Web3Modal from "web3modal";

import { marketplaceAddress } from "../config";

import { ethers } from "ethers";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import axios from "axios";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const convert = require("ether-converter");

const MyProducts = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [months, setMonths] = useState("");
  const [coverage, setCoverage] = useState("");
  const [fileUrl, setFileUrl] = useState(null);

  const [products, setProducts] = useState([]);

  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await marketplaceContract.connect(signer).fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          tokenURI,
        };
        return item;
      })
    );
    console.log(items);
  }

  const getMyProducts = async () => {
    await loadNFTs();
    const config = {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    axios
      .get("/api/product/myProducts", config)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function onChange(e) {
    //create and save file to ipfs
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (e) {
      console.log(e);
    }
  }

  const addProduct = () => {
    const config = {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    axios
      .post(
        "/api/product/addProduct",
        {
          name,
          description,
          price,
          image: fileUrl,
          warranty: {
            months,
            coverage,
          },
        },
        config
      )
      .then(async (res) => {
        console.log(res.data);
        const url = await uploadToIPFS();
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        /* next, create the item */
        const p = ethers.utils.parseUnits(price, "ether");
        let contract = new ethers.Contract(
          marketplaceAddress,
          NFTMarketplace.abi,
          signer
        );
        let listingPrice = convert(price + 0.025, "ether", "wei");
        listingPrice = listingPrice.toString();
        let transaction = await contract.createToken(url, p, res.data._id, {
          value: listingPrice,
        });
        await transaction.wait();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function uploadToIPFS() {
    if (!name || !description || !price) return;

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyProducts();
  }, []);

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
            <input
              type="file"
              name="Asset(picture,audio file etc)"
              className="mt-4"
              onChange={onChange}
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

          {fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )}

          <Button
            onClick={() => {
              addProduct();
            }}
            colorScheme="green"
          >
            Create Product
          </Button>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {products.map((product) => (
          <MyProductCard product={product} on />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
