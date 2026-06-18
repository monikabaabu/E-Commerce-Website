import { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersPage.css";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";
import { getAuthHeaders } from "../../utils/auth";
import PropTypes from "prop-types";
export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    document.title = "Orders";
  }, []);
  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get(
  "/api/orders?expand=products",
  {
    headers: getAuthHeaders()
  }
);
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []); 
  return (
    <>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}
OrdersPage.propTypes = {
  cart: PropTypes.array.isRequired,
  loadCart: PropTypes.func.isRequired
};