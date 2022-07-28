import React, { useState } from "react";
import SimpleSidebar from "../components/Navbar";
import MyProducts from "./MyProducts";
import Products from "./Products";
import Footer from "../components/Footer.js";
import ProductDetails from "./ProductDetails";

const Home = ({
  user,
  addProduct,
  buyProduct,
  deleteProduct,
  getAllProducts,
}) => {
  console.log(user);
  console.log("HI");
  getAllProducts();
  var allproducts = localStorage.getItem("allproducts");
  allproducts = JSON.parse(allproducts);
  const [userr, setUserr] = useState(null);
  const [nav, setNav] = useState(0);
  return (
    <div>
      <div className="flex bg-gray-100">
        <SimpleSidebar setNav={setNav} />
        <div className="mt-md-3 mb-md-3 mr-md-3  bg-white w-full rounded-md p-3">
          {nav === 0 && <Products user={user} allproducts={allproducts} />}
          {nav === 2 && <MyProducts addProduct={addProduct} user={user} />}
          {nav === 1 && <ProductDetails addProduct={addProduct} user={user} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
