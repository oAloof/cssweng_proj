import { motion } from "framer-motion";
import { useState, useCallback, useContext } from "react";
import { FiMenu } from "react-icons/fi";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import MenuButton from "./customer/MenuBtn";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const TopNav = ({ setErrorMessage }) => {
  return (
    <nav className="bg-white p-4 border-b-[1px] border-gray-200 flex items-center justify-between fixed w-full top-0 right-0 left-0 z-50 h-[7vh] mb-0">
      <NavLeft />
      <div className="flex justify-center">
        <Logo name="topbar" />
      </div>
      <NavRight setErrorMessage={setErrorMessage} />
    </nav>
  );
};

const NavLeft = () => {
  return (
    <div className="flex items-center justify-start relative w-1/3">
      <MenuButton />
    </div>
  );
};

{
  /* TODO: Implement logout logic */
}

const NavRight = ({ setErrorMessage }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoadingAuth, setIsAuthenticated } = useContext(AuthenticationContext);

  const OnLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const OnSignUpClick = useCallback(() => {
    navigate("/register/1");
  }, [navigate]);

  const OnLogoutClick = useCallback(async () => {
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
          setErrorMessage("You are not logged in.");
          localStorage.clear();
          return;
        }
        console.log("Error logging out: ", response.status);
        localStorage.clear();
        return;
      }
      const responseData = await response.json();
      setIsAuthenticated(false);
      localStorage.clear();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (isLoadingAuth) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-end gap-4 w-1/3 text-sm">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-md whitespace-nowrap"
          onClick={OnLogoutClick}
        >
          Log Out
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-0 w-1/3 text-sm">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-medium rounded-md whitespace-nowrap"
        onClick={OnLoginClick}
      >
        Sign in
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-md whitespace-nowrap"
        onClick={OnSignUpClick}
      >
        Sign up
      </motion.button>
    </div>
  );
};

export default TopNav;
