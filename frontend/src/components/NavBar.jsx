import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiBox,
  FiMenu,
  FiHome,
  FiUser,
  FiX,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navItems = [
    { text: "Home", Icon: FiHome, path: "/" },
    { text: "Products", Icon: FiBox, path: "/products" },
    { text: "Cart", Icon: FiShoppingCart, path: "/cart" },
  ];

  return (
    <div className="fixed bottom-10 left-[50%] -translate-x-[50%]">
      <motion.nav
        animate={open ? "open" : "closed"}
        initial="closed"
        className="bg-white text-black shadow-lg flex items-center justify-between "
      >
        <div className="flex gap-10 px-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.text}
              text={item.text}
              Icon={item.Icon}
              path={item.path}
              navigate={navigate}
            />
          ))}
          <MenuButton setOpen={setOpen} open={open} />
        </div>

        <Menu />
      </motion.nav>
    </div>
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

const MenuLink = ({ text, url }) => {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(url);
  };
  return (
    <motion.button
      onClick={handleClick}
      variants={menuLinkVariants}
      className="text-sm hover:text-indigo-500 transition-colors flex items-center gap-2"
    >
      {text}
    </motion.button>
  );
};

const MenuButton = ({ open, setOpen }) => {
  return (
    <div
      onClick={() => setOpen((pv) => !pv)}
      className="text-xl font-bold h-full bg-white text-black"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-4 text-m w-12 hover:text-indigo-500 transition-colors flex flex-col gap-1 items-center text-black"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <div>
              <motion.span
                key="icon-1"
                className="block"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.125, ease: "linear" }}
              >
                <FiX />
              </motion.span>
            </div>
          ) : (
            <motion.span
              key="icon-2"
              className="block"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.125, ease: "linear" }}
            >
              <FiUser />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      <span className="text-sm font-Nunito font-bold m-0">Account</span>
    </div>
  );
};

export default NavBar;

const Menu = () => {
  return (
    <motion.div
      variants={menuVariants}
      style={{ transformOrigin: "bottom", x: "-50%" }}
      className="p-8 bg-white shadow-lg absolute bottom-[125%] left-[50%] flex w-[calc(100vw_-_48px)] max-w-lg"
    >
      <div className="flex flex-col gap-2 w-1/3">
        <SectionTitle text="Men" />
        <MenuLink text="Athletic" />
        <MenuLink text="Golf" />
        <MenuLink text="Basketball" />
        <MenuLink text="Running" />
      </div>
    </motion.div>
  );
};

const SectionTitle = ({ text }) => {
  return (
    <motion.h4
      variants={menuLinkVariants}
      className="text-sm mb-2 font-semibold"
    >
      {text}
    </motion.h4>
  );
};

const iconVariants = {
  initial: { rotate: 180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: -180, opacity: 0 },
};

const menuVariants = {
  open: {
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    scale: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -15,
    opacity: 0,
  },
};
