const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({ // create a new schema for the user 
    name: { type: String, required: true },     
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
})

const productSchema = new Schema({ // create a new schema for the product
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    image : { type: String, required: true },
    invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' },
});

const invoiceSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    price : { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const warrantySchema = new Schema({ // create a new schema for the warranty
    coverage: { type: Number, required: true },
    issueDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product : { type: Schema.Types.ObjectId, ref: 'Product' },
});


const User = mongoose.model("User", userSchema);
const Product = mongoose.model("product", productSchema);
const Invoice = mongoose.model("Invoice", invoiceSchema);
const Warranty = mongoose.model("Warranty", warrantySchema);

module.exports = {
    User,
    Product,
    Invoice,
    Warranty
}




