import styles from "../../styles/customer/OrderSummary.module.css";
import Button from "../Button";

const OrderSummary = ({ subtotal, delivery, discountsSaved, total }) => {
  return (
    <div className={styles.orderSummary}>
      <div className={styles.wrapper}>
        <b className={styles.title}>Order Summary</b>
        <div className={styles.contents}>
          <div className={styles.details}>
            <b className={styles.category}>Subtotal</b>
            <b className={styles.b}>{subtotal}</b>
          </div>
          <div className={styles.details}>
            <b className={styles.category}>Delivery</b>
            <b className={styles.b}>{delivery}</b>
          </div>
          <div className={styles.details}>
            <b className={styles.category}>Total Saved from Discounts</b>
            <b className={styles.b}>{discountsSaved}</b>
          </div>
          <div className={styles.grandTotal}>
            <b className={styles.category}>Grand Total</b>
            <b className={styles.b}>{total}</b>
          </div>
        </div>
        <Button buttonText="Check Out" buttonClass="blue" />
      </div>
    </div>
  );
};

export default OrderSummary;
