import Countdown from "../../components/CountdownTimer.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";
import styles from "../../styles/customer/customerPage.module.css";
import Section from "../../components/customer/Section.jsx";

const LandingPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.pageContent}>
        <Countdown />
        <Section category="Big Discounts!" />
        <Section category="Selling Out Fast" />
        <Section category="Test" />
        <Section category="Test" />
        <Section category="Test" />
      </section>
      <NavBar />
      <Menu />
    </div>
  );
};

export default LandingPage;
