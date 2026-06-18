import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SignIn } from "./pages/auth/SignIn";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { SignUp } from "./pages/auth/SignUp";
import { LandingPage } from "./pages/LandingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { WishlistPage } from "./pages/wishlist/WishlistPage";
import { getAuthHeaders } from "./utils/auth";
window.axios = axios;
function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product", {
      headers: getAuthHeaders(),
    });

    setCart(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage cart={cart} loadCart={loadCart} />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <WishlistPage cart={cart} loadCart={loadCart} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage cart={cart} loadCart={loadCart} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage cart={cart} loadCart={loadCart} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tracking/:orderId/:productId"
        element={
          <ProtectedRoute>
            <TrackingPage cart={cart} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
}

export default App;
