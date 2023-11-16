import styles from "../styles/Button.module.css";

const Button = ({ buttonText, buttonClass, onBtnClick }) => {
  const btnClass = `${styles[buttonClass]}`;

  return (
    <button className={btnClass} onClick={onBtnClick}>
      <b className={styles.btnText}>{buttonText}</b>
    </button>
  );
};

export default Button;
