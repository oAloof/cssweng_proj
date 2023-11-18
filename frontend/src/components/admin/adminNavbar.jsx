import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiArrowRight, FiSearch } from "react-icons/fi";
import Logo from "../Logo.jsx";

const adminNavbar = () => {
  return (
    <div className="bg-gray-50">
      <FlipNav />
    </div>
  );
};

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white p-4 border-b-[1px] border-gray-200 flex items-center justify-between relative z-10">
      <NavLeft setIsOpen={setIsOpen} />
      <NavRight />
      <NavMenu isOpen={isOpen} />
    </nav>
  );
};

const NavLeft = ({ setIsOpen }) => {
  return (
    <div className="flex items-center gap-6 relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-gray-950 text-2xl"
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <FiMenu />
      </motion.button>
      <Logo name="admin" />
      <NavLink text="Home" />
      <NavLink text="Products">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-20 bg-white shadow-lg rounded-md py-2 px-4"
        >
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-indigo-600">
              Add a Product
            </a>
            <a href="#" className="hover:text-indigo-600">
              View all Products
            </a>
          </div>
        </motion.div>
      </NavLink>
      <NavLink text="Sales">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-20 bg-white shadow-lg rounded-md py-2 px-4"
        >
          <div className="flex flex-col gap-2"></div>
        </motion.div>
      </NavLink>
      <NavLink text="Orders" />
    </div>
  );
};

const NavLink = ({ text, children, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="#"
      rel="nofollow"
      className="hidden lg:block h-[30px] overflow-hidden font-medium relative"
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-indigo-600">
          {text}
        </span>
      </motion.div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 w-full bg-white shadow-lg py-2 z-10"
        >
          <ul className="flex flex-col gap-2 px-4">
            <li>
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                Option 1
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                Option 2
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                Option 3
              </a>
            </li>
          </ul>
        </motion.div>
      )}
      {children}
    </a>
  );
};

import { useNavigate } from "react-router-dom";

const NavRight = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <FiSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-md whitespace-nowrap"
        onClick={handleLogout}
      >
        Log Out
      </motion.button>
    </div>
  );
};

const NavMenu = ({ isOpen }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 bg-white shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4 z-20 overflow-y-visible"
    >
      <MenuLink text="Home" />
      <MenuLink text="Products" />
      <MenuLink text="Sales" />
      <MenuLink text="Orders" />
    </motion.div>
  );
};

const MenuLink = ({ text }) => {
  return (
    <motion.a
      variants={menuLinkVariants}
      rel="nofollow"
      href="#"
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-gray-950" />
      </motion.span>
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-indigo-600">
          {text}
        </span>
      </motion.div>
    </motion.a>
  );
};

export default adminNavbar;

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};
