import styles from "../styles/MenuButton.module.css";

const MenuButton = () => {
  return (
    <div className={styles.background}>
      <img className={styles.icon} alt="" src="../../public/icons/Menu.svg" />
    </div>
  );
};

export default MenuButton;
