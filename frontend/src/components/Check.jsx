import styles from "../styles/Check.module.css";

import React from "react";

const Check = ({ isValid }) => {
  return (
    <div className={styles.checkContainer}>
      {isValid ? (
        <img src="../../public/icons/checked.svg" alt="Valid" />
      ) : (
        <img src="../../public/icons/unchecked.svg" alt="Invalid" />
      )}
    </div>
  );
};

export default Check;
