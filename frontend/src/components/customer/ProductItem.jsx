import React, { useCallback } from "react";
import AddToCartButton from "./AddToCartButton.jsx";
import styles from "../../styles/customer/ProductItem.module.css";

const ProductItem = ({ product }) => {
  const onProductItemClick = useCallback(() => {}, []);

  const discountedPrice = product.originalPrice * (1 - product.discount / 100);

  return (
    <div className={styles.container} onClick={onProductItemClick}>
      <div className={styles.productImageContainer}>
        <img
          className={styles.productImageIcon}
          alt={product.name}
          src={product.photoUrl || "/Product Photo Placeholder.png"}
        />
        {product.discount && (
          <div className={styles.discount}>
            <b className={styles.discountText}>{product.discount}% OFF!</b>
          </div>
        )}
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productBrand}>{product.brand}</div>
        <b className={styles.productName}>{product.name}</b>
      </div>
      <div className={styles.productSubdetails}>
        <div className={styles.prices}>
          <div className={styles.price}>₱{discountedPrice.toFixed(2)}</div>
          {product.discount && (
            <div className={styles.originalPrice}>
              from ₱{product.originalPrice.toFixed(2)}
            </div>
          )}
        </div>
        <AddToCartButton />
      </div>
    </div>
  );
};

export default ProductItem;
