import React, { useState, useCallback } from "react";
import styles from "../styles/NavBar.module.css";
import Button from "./NavbarBtn.jsx";

const NavBar = ({}) => {
  return (
    <div className={styles.navbar}>
      <Button label="Home" iconSrc={"/icons/Home.svg"} />
      <Button label="All Products" iconSrc={"/icons/List.svg"} />
      <Button label="Cart" iconSrc={"/icons/Cart.svg"} />
      <Button label="Account" iconSrc={"/icons/User.svg"} />
    </div>
  );
};

export default NavBar;
