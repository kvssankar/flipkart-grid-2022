const express = require('express');
const mongoose = require('mongoose');

const app = express();


app.use(express.json());

URI = "mongodb+srv://thejin:NowCPZSSBnRfBRTg@cluster0.yagb57s.mongodb.net/?retryWrites=true&w=majority";
const connect = mongoose
  .connect(URI, { })
  .then(() => console.log("Mondo db connected...."))
  .catch((err) => console.log(err));


app.use('/login',require('./routes/login'));
app.use('/product',require('./routes/product'));

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Server started on port ${PORT}`));


