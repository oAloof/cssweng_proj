import styles from "../styles/Check.module.css";

import React from "react";

const checkIcon = ({ isValid }) => {
  return (
    <div className={styles.checkContainer}>
      {isValid ? (
        <img src="/checked.svg" alt="Valid" />
      ) : (
        <img src="/unchecked.svg" alt="Invalid" />
      )}
    </div>
  );
};

export default checkIcon;
