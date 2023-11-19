import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";

const ProductPage = () => {
  return (
    <div>
      <div className="mt-[7vh] pb-[15vh]">
        <Menu />
        <section className="overflow-auto "></section>
      </div>
      <NavBar />
    </div>
  );
};

export default ProductPage;
