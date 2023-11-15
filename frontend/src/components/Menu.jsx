import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/customer/Menu.module.css";
import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const categories = [
  // TEMPORARY VALUES
  { title: "Appliances", href: "/" },
  { title: "Accessories", href: "/" },
  { title: "Aircons", href: "/" },
  { title: "Electronics", href: "/" },
  { title: "Sound Systems", href: "/" },
  { title: "Accessories", href: "/" },
  { title: "Aircons", href: "/" },
];
const Menu = () => {
  {
    /* TODO: Implement logout logic */
  }
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === 'true';

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  const handleLoginLogout = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.background} lg:hidden`} onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={faBars}
          className={styles.icon}
          style={{ color: "#ffffff" }}
        />
      </div>
      <Logo name="topbar" />
      <SearchBar />
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${styles.fullScreenMenu}`}
          >
            <div className={`${styles.menuContent}`}>
              <div className={`${styles.headerOpen}`}>
                <div className={styles.closeButton} onClick={toggleMenu}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.closeButton}
                    style={{ color: "#ffff" }}
                  />
                </div>
                <Logo name="white" />
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className={`${styles.linkContainer}`}
              >
                <div className={styles.categoriesWrapper}>
                  {categories.map((link, index) => (
                    <div key={index} className={`${styles.mobileNavLink}`}>
                      <MobileNavLink title={link.title} href={link.href} />
                    </div>
                  ))}
                </div>

                {/* TODO: Implement logout logic */}
                <div className={styles.mobileNavLink} onClick={toggleMenu}>
                  <BottomButton 
                    title={isAuthenticated ? "Logout" : "Login"}
                    onClick={handleLoginLogout} 
                    icon={isAuthenticated ? faRightFromBracket : faRightToBracket }
                    />
                </div>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Menu;
const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};
const MobileNavLink = ({ title, href }) => {
  return (
    <motion.div variants={mobileLinkVars}>
      <a href={href}>{title}</a>
    </motion.div>
  );
};

const BottomButton = ({ title, onClick, icon }) => {
  return (
    <motion.div variants={mobileLinkVars} className={styles.bottomButtons} onClick={onClick}>
      <FontAwesomeIcon
        icon={icon}
        className={styles.icon}
        style={{ color: "#ffff" }}
      />
      <span>{title}</span>
    </motion.div>
  );
};
