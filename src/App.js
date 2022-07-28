import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  const localuser = localStorage.getItem("user");
  const [user, setUser] = useState(null);
  const [myproducts, setMyproducts] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const login = (email, password) => {
    axios
      .post("/api/user/login", { email, password })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("token", res.data.token);
        console.log(res.data.user.name);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("User_email", res.data.user.email);
        localStorage.setItem("User_name", res.data.user.name);
        localStorage.setItem("User_name", res.data.user.name);
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

  const logout = (token) => {
    axios

      .post("/api/user/logout", { token })
      .then((res) => {
        console.log(res);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("User_email");
        localStorage.removeItem("User_name");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addProduct = (
    name,
    price,
    description,
    img,
    months,
    coverage,
    localuser
  ) => {
    axios
      .post("/api/product/addProduct", {
        name,
        description,
        price,
        img,
        months,
        coverage,
        localuser,
      })
      .then((res) => {
        setMyproducts(res.data);
        localStorage.setItem("myproducts", JSON.stringify(res.data));
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
        localStorage.setItem("allproducts", JSON.stringify(res.data));
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
      <Route
        path="/"
        element={
          !user && !localuser ? (
            <Login loginfunc={login} logoutfunc={logout} />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="/register"
        element={
          !user && !localuser ? (
            <Register registerfunc={register} />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="/home"
        element={
          <Home
            user={user}
            addProduct={addProduct}
            buyProduct={buyProduct}
            deleteProduct={deleteProduct}
            getAllProducts={getAllProducts}
          />
        }
      />
      <Route path="/productdetails" element={<ProductDetails />} />
    </Routes>
  );
};

export default App;
