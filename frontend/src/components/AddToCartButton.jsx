import styles from "../styles/AddToCartButton.module.css";

const AddToCartButton = () => {
  return (
    <button className={styles.addToCartButton}>
      <i className="fas fa-shopping-cart"></i>
    </button>
  );
};

export default AddToCartButton;
