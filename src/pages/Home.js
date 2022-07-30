import React, { useState } from "react";
import SimpleSidebar from "../components/Navbar";
import MyProducts from "./MyProducts";
import Products from "./Products";

const Home = ({ addProduct }) => {
  const [nav, setNav] = useState(0);
  return (
    <div className="flex bg-gray-100">
      <SimpleSidebar setNav={setNav} />
      <div className="mt-3 mb-3 mr-3 bg-white w-full rounded-md p-3">
        {nav === 0 && <Products />}
        {nav === 2 && <MyProducts />}
      </div>
    </div>
  );
};

export default Home;
