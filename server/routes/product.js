const express = require("express");
const router = express.Router();
const verify = require("../verify");
const { Product, Invoice } = require("../models/models");

router.post("/addProduct", async (req, res) => {
  console.log("ADD PRODUCT ROUTE");
  console.log(req.body);
  var { name, price, description, img, months, coverage, localuser } = req.body;
  localuser = JSON.parse(localuser);
  price = Number(price);
  months = Number(months);
  coverage = Number(coverage);
  const warranty = { months, coverage };
  console.log(warranty);
  const product = new Product({
    name,
    price,
    description,
    image: img,
    user: localuser.user._id,
    warranty: warranty,
  });
  await product.save();
  const products = await Product.find({ user: localuser.user._id });
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
    price: product.price,
  });

  const inoviceSaved = await invoice.save();
  await Product.findByIdAndUpdate(id, { invoice: inoviceSaved._id });

  const products = await Product.find({ user: req.user._id });
  res.json(products);
});

router.get("/allProducts", async (req, res) => {
  //get products where invoice is  null
  const products = await Product.find({ invoice: null });
  res.json(products);
});

router.post("/myProducts", async (req, res) => {
  console.log("MY PRODUCTS ROUTE HIT");
  console.log(req.body);
  const products = await Product.find({ user: req.body.userid });
  console.log(products);
  if (products) res.json(products);
  else res.json({ status: "Error" });
});

router.get("/myOrders", verify, async (req, res) => {
  const invoices = await Invoice.find({ user: req.user._id });
  res.json(invoices);
});

router.post("/getProduct", async (req, res) => {
  console.log("GET PRODUCT ROUTE HTI");
  console.log(req.body);
  const product = await Product.findById(req.body.product_id);
  console.log(product);
  if (product) res.json({ product: product });
  else res.json({ status: "Error, product not found" });
});
module.exports = router;
