import { CheckoutHeader } from "./CheckoutHeader";
import "./CheckoutPage.css";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { getAuthHeaders } from "../../utils/auth";
export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    document.title = "Checkout";
  }, []);
  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
    };
    fetchCheckoutData();
  }, []);
  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get(
  "/api/payment-summary",
  {
    headers: getAuthHeaders()
  }
);
      setPaymentSummary(response.data);
    };
    fetchPaymentSummary();
  }, [cart]);
  return (
    <>
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
