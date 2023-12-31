import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/customer/Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.back} onClick={handleBackClick}>
      <FontAwesomeIcon icon={faArrowLeft} className={styles.backBtn} />
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default Header;
