import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/BackButton.module.css";
import { useNavigate } from "react-router-dom";

const BackButton = ({ title }) => {
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

export default BackButton;
