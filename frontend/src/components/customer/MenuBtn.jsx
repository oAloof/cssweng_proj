import { useState, useCallback, useEffect } from "react";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <motion.button
        whileHover={{ rotate: "180deg" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="text-2xl bg-white text-indigo-700 hover:text-indigo-500 transition-colors items-center justify-center"
      >
        <FiMenu />
      </motion.button>
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Nav = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [ProductCategories, setProductCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    const fetchProductCategories = async () => {
      try {
        const data = await getProductCategories();
  
        setProductCategories(data)
        setIsLoading(false);
        
      } catch (error) {
        console.error('Error fetching sales: ', error);
      }
    }
    
    fetchProductCategories();
  }, []);

  const getProductCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/categories", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          console.error("Failed to fetch product Categories: ", response.status);
        }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  var categories = []
  for (var i = 0 ; i < ProductCategories.length; i++) {
    categories.push({ text: capitalizeFirstLetter(ProductCategories[i]), path: "/" +  ProductCategories[i]})
  }

  return (
    <motion.nav
      className="fixed top-0 bottom-0 left-0 w-screen bg-white z-50 overflow-auto"
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
      initial="closed"
    >
      <motion.button
        className="text-3xl bg-white text-black hover:text-indigo-500 border-[1px] border-transparent hover:border-indigo-500 transition-colors p-4 rounded-full absolute top-8 right-8"
        whileHover={{ rotate: "180deg" }}
        onClick={() => setIsOpen(false)}
        whileTap={{ scale: 0.9 }}
      >
        <FiX />
      </motion.button>
      <motion.div
        variants={linkWrapperVariants}
        className="flex flex-col gap-2 absolute bottom-8 left-8"
      >
        {categories.map((link, index) => (
          <NavLink key={index} text={link.text} url={link.path} />
        ))}
      </motion.div>
    </motion.nav>
  );
};

const NavLink = ({ text, url }) => {
  const navigate = useNavigate();
  const OnLinkClick = useCallback(() => {
    navigate({ url });
  }, [navigate]);

  return (
    <motion.h2
      className="inline-block z-10 text-slate-800 w-fit font-black text-4xl hover:text-indigo-500 transition-colors cursor-pointer"
      variants={navLinkVariants}
      transition={{
        type: "spring",
        damping: 10,
      }}
      whileHover={{
        scale: 1.05,
      }}
      onClick={OnLinkClick}
    >
      {text}
    </motion.h2>
  );
};

export default MenuButton;

const navVariants = {
  open: {
    x: "0%",
    borderTopLeftRadius: "0vw",
    borderBottomLeftRadius: "0vw",
    opacity: 1,
  },
  closed: {
    x: "100%",
    borderTopLeftRadius: "50vw",
    borderBottomLeftRadius: "50vw",
    opacity: 0,
  },
};

const linkWrapperVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navLinkVariants = {
  open: { x: 0 },
  closed: { x: 25 },
};
