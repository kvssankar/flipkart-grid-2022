const express = require('express');
const router  = express.Router();
const verify  = require('../verify');
const {User,Product,Invoice,Warranty} = require('../models/models');

router.post('/addProduct',verify, async(req,res)=>{
    const {name,price,description,image} = req.body;
    const product = new Product({
        name,
        price,
        description,
        image,
        user:req.user._id
    });
    await product.save();
    res.send({msg : "Product added successfully"});
});


router.post('/deleteProduct',verify,async(req,res)=>{
    const {id} = req.body;
    await Product.findByIdAndDelete(id);
    res.send({msg : "Product deleted successfully"});
});

router.post('/buyProduct',verify,async(req,res)=>{
    const {id, year,month,coverage,description} = req.body;
    const invoice = new Invoice({
        user:req.user._id,
    });
    var expiryDate = new Date();

    var y = expiryDate.getFullYear();
    var m = expiryDate.getMonth();
    var day = expiryDate.getDate();

    var expiryDate = new Date(parseInt(year) + y, m + parseInt(month), day);
   
    const inoviceSaved = await invoice.save();
    const product=await Product.findByIdAndUpdate(id,{invoice:inoviceSaved._id});
    const warranty = new Warranty({
        coverage:coverage,
        issueDate:Date.now(),
        expiryDate:expiryDate,
        user:req.user._id,
        product:product._id,
    });
    await warranty.save();
    res.send({msg : "Product purchased successfully. Warranty and invoice generated"});
});


router.get('/allProducts',verify,async(req,res)=>{
    //get products where invoice is not null
    const products = await Product.find({invoice:{$ne:null}});
    res.send(products);
});

router.get('/myProducts',verify,async(req,res)=>{
    const products = await Product.find({user:req.user._id});
    res.send(products);
});

router.get('/myOrders', verify, async(req,res)=>{
    const invoices = await Invoice.find({user:req.user._id});
    res.send(invoices);
});

module.exports = router;
