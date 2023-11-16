import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { RegistrationProvider } from "../contexts/RegistrationContext";

// STYLES
import styles from "../styles/global.modules.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faList,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// PAGES
import Login from "../views/Login";
import Register1 from "../views/registerPage1";
import Register2 from "../views/registerPage2";
import AccountPage from "../views/customer/accountPage.jsx";
import ForgotPassword from "../views/ForgotPasswordPage"; // TODO: delete this
import TestCustomerView from "../views/customer/testCustomerView.jsx";
import ProductsPage from "../views/customer/productsPage";
import LandingPage from "../views/customer/LandingPage";
import CartPage from "../views/customer/cartPage";
import ViewAllProducts from "../views/admin/ViewAllProducts";

library.add(faHome, faList, faShoppingCart, faUser);

function App() {
  return (
    <Router>
      <Routes>
        {/* USER */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/test" element={<TestCustomerView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<RegistrationProvider />}>
          <Route index element={<Navigate to="/register/1" />} />
          <Route path="1" element={<Register1 />} />
          <Route path="2" element={<Register2 />} />
        </Route>
        {/* ADMIN */}
        <Route path="/admin/products" element={<ViewAllProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
