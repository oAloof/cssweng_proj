import { motion } from "framer-motion";
import SearchBar from "../SearchBar.jsx";
import { useState, useContext } from "react";
import { FiMenu, FiArrowRight, FiSearch } from "react-icons/fi";
import Logo from "../Logo.jsx";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../contexts/AuthenticationContext.jsx";

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
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/admin/${text.toLowerCase()}`);
  };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      rel="nofollow"
      className="hidden lg:block h-[30px] overflow-hidden font-Proxima text-lg relative cursor-pointer"
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigation}
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
        ></motion.div>
      )}
      {children}
    </div>
  );
};

const NavRight = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsAdmin } = useContext(AuthenticationContext);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/logout", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const responseData = await response.json();
        if (responseData.message === "User is not logged in.") {
          setIsAuthenticated(false);
          setIsAdmin(false);
          navigate("/login");
          localStorage.clear();
          return;
        }
        console.log("Error logging out: ", response.status);
        return;
      }
      const responseData = await response.json();
      setIsAuthenticated(false);
      setIsAdmin(false);
      navigate("/login");
      localStorage.clear();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <SearchBar />
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
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/admin/${text.toLowerCase()}`);
  };
  return (
    <motion.a
      variants={menuLinkVariants}
      rel="nofollow"
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
      onClick={handleNavigation}
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
