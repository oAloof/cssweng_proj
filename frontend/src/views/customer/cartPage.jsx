import styles from "../../styles/customer/customerPage.module.css";
import Menu from "../../components/Menu.jsx";
import OrderSummary from "../../components/customer/orderSummary";
import Header from "../../components/customer/header.jsx";
import CartItem from "../../components/customer/cartItem.jsx";
import NavBar from "../../components/NavBar.jsx";

// TODO: Implement backend logic for ordersummary

const CartPage = () => {
  return (
    <div className={styles.page}>
      <Menu />
      <main className={styles.pageContent}>
        <Header title="Cart" />
        <div className={styles.cartItems}>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <OrderSummary
          subtotal="$900.99"
          delivery="$9.99"
          discountsSaved="-$100.00"
          total="$809.99"
        />
      </main>
      <NavBar />
    </div>
  );
};

export default CartPage;
