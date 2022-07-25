const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // create a new schema for the user
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const productSchema = new Schema({
  // create a new schema for the product
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  image: { type: String, required: true },
  invoice: { type: Schema.Types.ObjectId, ref: "Invoice" },
  warranty: {
    months: { type: Number, required: true },
    converage: { type: Number, required: true },
  },
});

const invoiceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("product", productSchema);
const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = {
  User,
  Product,
  Invoice,
};
