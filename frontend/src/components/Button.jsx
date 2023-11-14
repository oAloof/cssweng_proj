import styles from "../styles/Button.module.css";

const Button = ({ buttonText, buttonClass, onBtnClick }) => {
  const stateDefaultStyle = {
    alignSelf: "stretch",
  };

  const btnClass = `${styles[buttonClass]}`;

  return (
    <button className={btnClass} style={stateDefaultStyle} onClick={onBtnClick}>
      <b className={styles.btnText}>{buttonText}</b>
    </button>
  );
};

export default Button;
