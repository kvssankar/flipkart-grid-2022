import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [myproducts, setMyproducts] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const login = (email, password) => {
    axios
      .post("/api/user/login", { email, password })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const register = (name, email, password) => {
    axios

      .post("/api/user/register", { name, email, password })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addProduct = (name, description, price, img, months, coverage) => {
    axios
      .post("/api/product/addProduct", {
        name,
        description,
        price,
        img,
        months,
        coverage,
      })
      .then((res) => {
        setMyproducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const buyProduct = (id) => {
    axios
      .post("/api/product/buyProduct", { id })
      .then((res) => {
        setMyproducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteProduct = (id) => {
    axios
      .post("/api/product/deleteProduct/", { id })
      .then((res) => {
        setMyproducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMyProducts = () => {
    axios
      .get("/api/product/myProducts")
      .then((res) => {
        setMyproducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllProducts = () => {
    axios
      .get("/api/product/allProducts")
      .then((res) => {
        setAllproducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getInvoices = () => {
    axios
      .get("/api/product/myOrders")
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Routes>
      <Route path="/" element={<Login login={login} />} />
      <Route path="/register" element={<Login login={login} />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
