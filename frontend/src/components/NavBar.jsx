import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiShoppingCart, FiSearch, FiHome, FiUser } from "react-icons/fi";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
    <button
      onClick={handleClick}
      className="text-m w-12 hover:text-indigo-500 transition-colors flex flex-col gap-1 items-center text-black"
    >
      <Icon />
      <span className="text-sm">{text}</span>
    </button>
  );
};

export default NavBar;

const iconVariants = {
  initial: { rotate: 180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: -180, opacity: 0 },
};
