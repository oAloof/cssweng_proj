import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import styles from "../../styles/customer/customerPage.module.css";
import Section from "../../components/customer/Section.jsx";

const ProductsPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.pageContent}>
        <Countdown />
        <Section category="Category" />
        <Section category="Category" />
        <Section category="Category" />
        <Section category="Category" />
        <Section category="Category" />
      </section>
      <NavBar />
      <Menu />
    </div>
  );
};

export default ProductsPage;
