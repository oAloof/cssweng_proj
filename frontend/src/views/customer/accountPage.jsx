import styles from "../../styles/Page.module.css";
import Logo from "../../components/Logo.jsx";
import NavBar from "../../components/NavBar.jsx";
import Menu from "../../components/Menu.jsx";

const accountPage = () => {
  return (
    <div className={styles.page}>
      <Logo name="default"></Logo>
      <main className={styles.pageContent} id="Page Content">
        <header className={styles.header}>
          <h1>Account Page</h1>
        </header>
        sksksksks i like chimken
      </main>
      <NavBar />
      <Menu />
    </div>
  );
};

export default accountPage;
