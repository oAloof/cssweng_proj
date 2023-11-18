import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiShoppingCart,
  FiBox,
  FiSearch,
  FiHome,
  FiUser,
} from "react-icons/fi";

const NavBar = () => {
  const navigate = useNavigate();

  const navItems = [
    { text: "Home", Icon: FiHome, path: "/" },
    { text: "Products", Icon: FiBox, path: "/products" },
    { text: "Cart", Icon: FiShoppingCart, path: "/cart" },
    { text: "Account", Icon: FiUser, path: "/account" },
  ];

  return (
    <motion.nav
      initial="closed"
      className="bg-white text-black shadow-lg flex items-center justify-around  bottom-8 left-[50%] -translate-x-[50%] p-3 fixed rounded-xl"
    >
      <div className="flex justify-between gap-14 px-4">
        {navItems.map((item) => (
          <Link
            key={item.text}
            text={item.text}
            Icon={item.Icon}
            path={item.path}
            navigate={navigate}
          />
        ))}
      </div>
    </motion.nav>
  );
};

const Link = ({ text, Icon, path, navigate }) => {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="text-m w-12 hover:text-indigo-500 transition-colors flex flex-col gap-1 items-center text-black"
      whileHover={{ scale: 1.1 }}
    >
      <Icon />
      <span className="text-sm font-Nunito font-bold ">{text}</span>
    </motion.button>
  );
};

export default NavBar;
