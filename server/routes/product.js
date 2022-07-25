const express = require("express");
const router = express.Router();
const verify = require("../verify");
const { Product, Invoice } = require("../models/models");

router.post("/addProduct", verify, async (req, res) => {
  const { name, price, description, image, months, coverage } = req.body;
  const product = new Product({
    name,
    price,
    description,
    image,
    user: req.user._id,
    warranty: { months, coverage },
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
  const invoice = new Invoice({
    user: req.user._id,
  });
  var expiryDate = new Date();

  var y = expiryDate.getFullYear();
  var m = expiryDate.getMonth();
  var day = expiryDate.getDate();

  const inoviceSaved = await invoice.save();
  await Product.findByIdAndUpdate(id, { invoice: inoviceSaved._id });

  res.json({ mssg: "Product bought successfully" });
});

router.get("/allProducts", verify, async (req, res) => {
  //get products where invoice is not null
  const products = await Product.find({ invoice: { $ne: null } });
  res.send(products);
});

router.get("/myProducts", verify, async (req, res) => {
  const products = await Product.find({ user: req.user._id });
  res.send(products);
});

router.get("/myOrders", verify, async (req, res) => {
  const invoices = await Invoice.find({ user: req.user._id });
  res.send(invoices);
});

module.exports = router;
