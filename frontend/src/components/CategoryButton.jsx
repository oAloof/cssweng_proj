import styles from "../styles/CategoryButton.module.css";

const CategoryButton = () => {
  return (
    <button className={styles.button} style={buttonStyle}>
      <b className={styles.title}>"Category"</b>
    </button>
  );
};

export default CategoryButton;
