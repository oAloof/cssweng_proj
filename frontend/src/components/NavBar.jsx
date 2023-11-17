import React from "react";
import { useLocation } from "react-router-dom";
//import styles from "../styles/NavBar.module.css";
import NavBarBtn from "./NavbarBtn.jsx";
import {
  faHome,
  faList,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

/* const NavBar = () => {
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

export default NavBar; */

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiShoppingCart, FiSearch, FiHome, FiUser } from "react-icons/fi";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { text: "Home", Icon: FiHome, path: "/" },
    { text: "Products", Icon: FiSearch, path: "/products" },
    { text: "Cart", Icon: FiShoppingCart, path: "/cart" },
    { text: "Account", Icon: FiUser, path: "/account" },
  ];

  return (
    <motion.nav
      animate={open ? "open" : "closed"}
      initial="closed"
      className="bg-white text-black shadow-lg flex items-center justify-around absolute bottom-8 left-[50%] -translate-x-[50%] p-3"
    >
      <div className="flex justify-between gap-14 px-4">
        {navItems.map((item) => (
          <Link
            key={item.text}
            text={item.text}
            Icon={item.Icon}
            path={item.path}
          />
        ))}
      </div>
    </motion.nav>
  );
};

const Link = ({ text, Icon, path }) => {
  return (
    <a
      href={path}
      rel="nofollow"
      className="text-m w-12 hover:text-indigo-500 transition-colors flex flex-col gap-1 items-center text-black"
    >
      <Icon />
      <span className="text-sm">{text}</span>
    </a>
  );
};

export default NavBar;

const iconVariants = {
  initial: { rotate: 180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: -180, opacity: 0 },
};
