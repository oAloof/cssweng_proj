import React from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import NavBarBtn from "./NavbarBtn.jsx";
import {
  faHome,
  faList,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: faHome },
    { label: "All Products", path: "/products", icon: faList },
    { label: "Cart", path: "/cart", icon: faShoppingCart },
    { label: "Account", path: "/account", icon: faUser },
  ];

  return (
    <div className={styles.navbar}>
      {navItems.map((item) => (
        <NavBarBtn
          key={item.label}
          label={item.label}
          active={location.pathname === item.path}
          path={item.path}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default NavBar;
