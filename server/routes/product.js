const express = require("express");
const router = express.Router();
const verify = require("../verify");
const { Product, Invoice } = require("../models/models");

router.post("/addProduct", verify, async (req, res) => {
  const { name, price, description, image, warranty } = req.body;

  const product = new Product({
    name,
    price,
    description,
    image,
    user: req.user._id,
    warranty: warranty,
  });
  await product.save();
  const products = await Product.find({ user: req.user._id });
  res.json(products);
});

router.post("/deleteProduct", verify, async (req, res) => {
  const { id } = req.body;
  const products = await Product.findByIdAndDelete(id, { new: true });
  res.json(products);
});

router.post("/buyProduct", verify, async (req, res) => {
  const { id } = req.body;

  const product = await Product.findById(id);
  console.log(product);
  const invoice = new Invoice({
    user: req.user._id,
    price : product.price
  });


  const inoviceSaved = await invoice.save();
  await Product.findByIdAndUpdate(id, { invoice: inoviceSaved._id });

  const products = await Product.find({ user: req.user._id });
  res.json(products);
});

router.get("/allProducts", verify, async (req, res) => {
  //get products where invoice is  null
  const products = await Product.find({ invoice: null });
  res.json(products);
});

router.get("/myProducts", verify, async (req, res) => {
  const products = await Product.find({ user: req.user._id });
  res.json(products);
});

router.get("/myOrders", verify, async (req, res) => {
  const invoices = await Invoice.find({ user: req.user._id });
  res.json(invoices);
});

module.exports = router;
