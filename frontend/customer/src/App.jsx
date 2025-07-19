import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthLayout from "./components/AuthLayout";
import PopularShops from "./components/PopularShops";
import TermsAndConditions from "./components/TermsAndConditions.jsx";
import AccountPage from "./userAccount/AccountPage";
import Profile from "./userAccount/Profile";
import Orders from "./userAccount/MyOrders.jsx";
import Addresses from "./userAccount/Addresses";
import Favorites from "./userAccount/Favorites";
import PaymentMethods from "./userAccount/PaymentMethods";
import Settings from "./userAccount/Settings.jsx";
import AddToCartPage from "./components/AddToCartPage";
import CheckoutPage from "./components/CheckoutPage";
import ForgotPassword from "./components/ForgotPassword";
import BillSummary from "./components/BillSummary";
import SearchResultsPage from "./components/SearchResultsPage";
import CategoryProductsPage from "./components/CategoryProductsPage";
import ShopDetail from "./components/ShopDetail";
import Shops from "./components/Shops.jsx";
import Map from "./components/Map.jsx";
import About from "./components/About";
import AllCategories from "./components/AllCategories";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./contexts/ProtectedRoute";
import API from "@/api/client";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthLayout defaultTab={0} />} />
        <Route path="/signup" element={<AuthLayout defaultTab={1} />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/auth" element={<AuthLayout />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/account/*" element={<ProtectedRoute><AccountPage /></ProtectedRoute>}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="payment" element={<PaymentMethods />} />
           <Route path="settings" element={<Settings />} />  {/* ✅ CORRECT */}
        </Route>

        <Route path="/cart" element={<AddToCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/BillSummary" element={<BillSummary />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/categories/:slug" element={<CategoryProductsPage />} />
        <Route path="/shop/:id" element={<ShopDetail />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<AllCategories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
