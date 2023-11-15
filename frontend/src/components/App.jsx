import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../views/login";
import Register1 from "../views/registerPage1";
import Register2 from "../views/registerPage2";
import ForgotPassword from "../views/forgotPasswordPage";
import styles from "../styles/global.modules.css";
import TestCustomerView from "../views/customer/testCustomerView.jsx";
import { RegistrationProvider } from "../contexts/RegistrationContext";
import LandingPage from "../views/customer/LandingPage";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faList,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faList, faShoppingCart, faUser);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/test" element={<TestCustomerView />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<RegistrationProvider />}>
          <Route index element={<Navigate to="/register/1" />} />
          <Route path="1" element={<Register1 />} />
          <Route path="2" element={<Register2 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
