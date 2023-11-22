import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { RegistrationProvider } from "../contexts/RegistrationContext";
import "../index.css";

// STYLES
import styles from "../styles/global.modules.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faList,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// USER PAGES
import Login from "../views/login";
import Register1 from "../views/registerPage1";
import Register2 from "../views/registerPage2";
import AccountPage from "../views/customer/accountPage";
import ForgotPassword from "../views/ForgotPasswordPage";
import ProductsPage from "../views/customer/productsPage";
import LandingPage from "../views/customer/LandingPage";
import CartPage from "../views/customer/cartPage";
import OrderConfirmation from "../views/customer/orderConfirmation.jsx";
import Billing from "../views/customer/billing.jsx";
import Invoice from "../views/customer/invoice.jsx";

// ADMIN PAGES
import AdminDashboard from "../views/admin/adminHomepage";
import AdminProductPage from "../views/admin/productsPage.jsx";
import AdminSalesPage from "../views/admin/adminSalesPage.jsx";
import AdminOrdersPage from "../views/admin/adminOrdersPage.jsx";

// TESTING
import TestAdminComponent from "./admin/testAdminComponent.jsx";
import CategoryPage from "../views/customer/CategoryPage.jsx";

library.add(faHome, faList, faShoppingCart, faUser);

function App() {
  return (
    <Router>
      <Routes>
        {/* USER */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/confirm-order" element={<OrderConfirmation />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/register" element={<RegistrationProvider />}>
          <Route index element={<Navigate to="/register/1" />} />
          <Route path="1" element={<Register1 />} />
          <Route path="2" element={<Register2 />} />
        </Route>
        <Route path="/searchtest" element={<TestAdminComponent />} />

        {/* CATEGORY */}
        <Route path="/categorytest" element={<CategoryPage />} />

        {/* ADMIN PAGES */}
        <Route path="/admin">
          <Route path="home" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="sales" element={<AdminSalesPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
