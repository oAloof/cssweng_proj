import styles from "../styles/NavbarBtn.module.css";

const NavBarBtn = ({ iconSrc, label }) => {
  return (
    <div className={styles.button}>
      <img className={styles.icon} alt={label} src={iconSrc} />
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default NavBarBtn;
