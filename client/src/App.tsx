import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import { Header } from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import PrivecyPolicy from "./pages/PrivecyPolicy";
import ProfileEditPage from "./pages/Profile";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsAndCondition from "./pages/TrermsAndCondition";
import ProductList from "./pages/ProductList";
import ProductInfo from "./pages/ProductInfo";
import Address from "./pages/Address";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import AboutUsPage from "./pages/AboutUs";
import OrderDetails from "./pages/OrderDetails";
import ErrorPage from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy-policy" element={<PrivecyPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="/profile" element={<ProfileEditPage />} />
        <Route path="/address" element={<Address />} />
        <Route path="/category/:id" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
