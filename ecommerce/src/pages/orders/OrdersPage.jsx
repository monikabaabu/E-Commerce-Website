import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import "./OrdersPage.css";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";
export function OrdersPage({ cart , loadCart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
  document.title = "Orders";
}, []);
  useEffect(() => {
    const fetchOrdersData = async () => {
    const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    }
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
