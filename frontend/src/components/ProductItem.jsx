import { useCallback } from "react";
import AddToCartButton from "./AddToCartButton";
import styles from "../styles/ProductItem.module.css";

const ProductItem = () => {
  const onProductItemClick = useCallback(() => {
    // goes to a product's respective page
  }, []);

  return (
    <div className={styles.container} onClick={onProductItemClick}>
      <div className={styles.productImageContainer}>
        <img
          className={styles.productImageIcon}
          alt=""
          src="/Product Photo Placeholder.png"
        />
        <div className={styles.discount}>
          <b className={styles.discountText}>40% OFF!</b>
        </div>
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productBrand}>Union</div>
        <b className={styles.productName}>Union Aircon</b>
      </div>
      <div className={styles.productSubdetails}>
        <div className={styles.prices}>
          <div className={styles.price}>$99,999.99</div>
          <div className={styles.originalPrice}>from $111,111.11</div>
        </div>
        <AddToCartButton />
      </div>
    </div>
  );
};

export default ProductItem;
