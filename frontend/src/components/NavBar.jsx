import React, { useState, useCallback } from "react";
import styles from "../styles/NavBar.module.css";
import Button from "./NavbarBtn.jsx";

const NavBar = ({}) => {
  return (
    <div className={styles.navbar}>
      <Button label="Home" iconSrc={"/Home.svg"} />
      <Button label="All Products" iconSrc={"/List.svg"} />
      <Button label="Cart" iconSrc={"/Cart.svg"} />
      <Button label="Account" iconSrc={"/User.svg"} />
    </div>
  );
};

export default NavBar;
