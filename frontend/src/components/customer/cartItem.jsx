import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/customer/CartItem.module.css";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const CartItem = () => {
  return (
    <div className={styles.cartItem}>
      <img
        className={styles.productImage}
        alt=""
        src="../../../public/Product Photo Placeholder.png"
      />
      <div className={styles.productDetails}>
        <div className={styles.top}>
          <div className={styles.nameAndBrand}>
            <b className={styles.productName}>Union Aircon</b>
            <div className={styles.brand}>Union</div>
          </div>
          <button className={styles.deleteButtonWrapper}>
            <FontAwesomeIcon
              icon={faTrashCan}
              style={{ color: "var(--gray-5)" }}
              className={styles.trashIcon}
            />
          </button>
        </div>
        <div className={styles.priceAndQuantity}>
          <div className={styles.price}>$99,999.99</div>
          <input
            className={styles.quantity}
            id="Quantity"
            placeholder="0"
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
