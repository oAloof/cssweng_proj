import styles from "../../styles/Page.module.css";
import Logo from "../../components/Logo";
import NavBar from "../../components/NavBar";
import Menu from "../../components/Menu.jsx";

const CartPage = () => {
  return (
    <div className={styles.page}>
      <Logo name="default"></Logo>
      <main className={styles.pageContent} id="Page Content">
        <header className={styles.header}>
          <h1>CART PAGE TEST</h1>
        </header>
        sksksksks i like chimken
      </main>
      <NavBar />
      <Menu />
    </div>
  );
};

export default CartPage;
