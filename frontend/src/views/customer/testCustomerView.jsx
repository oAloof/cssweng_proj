import { useNavigate } from "react-router-dom";
import styles from "../../styles/Page.module.css";
import Menu from "../../components/Menu.jsx";

const ForgotPasswordPage = () => {
  return (
    <div className={styles.page}>
      <Menu />
    </div>
  );
};

export default ForgotPasswordPage;
