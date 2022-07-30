import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";
import Register from "./pages/Register";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [invoices, setInvoices] = useState(
    JSON.parse(localStorage.getItem("invoices"))
  );

  const login = (email, password) => {
    axios
      .post("/api/user/login", { email, password })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("auth-token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
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
        localStorage.setItem("auth-token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buyProduct = (id) => {
    axios
      .post("/api/product/buyProduct", { id })
      .then((res) => {
        localStorage.setItem("myproducts", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteProduct = (id) => {
    axios
      .post("/api/product/deleteProduct/", { id })
      .then((res) => {
        localStorage.setItem("myproducts", JSON.stringify(res.data));
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
        localStorage.setItem("invoices", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Routes>
      <Route path="/" element={<Login login={login} />} />
      <Route path="/register" element={<Register register={register} />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
