import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css";

const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = () => {
    setIsActive(true);
  };

  const handleCancelClick = () => {
    setIsActive(false);
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={`${styles.searchBox} ${isActive ? styles.active : ""}`}>
      <input
        type="text"
        placeholder="Type to search.."
        className={`${styles.input} ${isActive ? styles.active : ""}`}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsActive(true)}
      />
      <div className={styles.searchIcon} onClick={handleSearchClick}>
        <i className="fas fa-search"></i>
      </div>
      {isActive && (
        <div className={styles.closeIcon} onClick={handleCancelClick}>
          <i className="fas fa-times"></i>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
