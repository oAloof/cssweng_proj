import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styles from "../styles/NavbarBtn.module.css";
import {
  faHome,
  faList,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const iconMapping = {
  Home: faHome,
  "All Products": faList,
  Cart: faShoppingCart,
  Account: faUser,
};

const NavBarBtn = ({ label, active, path, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  const iconClasses = `${styles.icon} ${
    active ? styles.iconActive : styles.iconInactive
  }`;
  const labelClasses = `${styles.label} ${
    active ? styles.labelActive : styles.labelInactive
  }`;

  return (
    <div className={styles.button} onClick={handleClick}>
      <FontAwesomeIcon icon={icon} className={iconClasses} />
      <div className={labelClasses}>{label}</div>
    </div>
  );
};

export default NavBarBtn;
