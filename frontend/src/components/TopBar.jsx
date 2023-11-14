import React, { useState } from "react";
import styles from "../styles/TopBar.module.css";
import Logo from "./Logo";
import MenuButton from "./MenuButton";
import SearchBar from "./SearchBar";

const TopBar = () => {
  return (
    <>
      <div name="topbar">
        <div className={styles.menu} onClick={toggleMenu}>
          <MenuButton />
        </div>
        <Logo name="topbar" />
        <SearchBar></SearchBar>
      </div>
      {isMenuOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={toggleMenu}
        >
          <Menu onClose={toggleMenu} />
        </PortalPopup>
      )}
    </>
  );
};

export default TopBar;
