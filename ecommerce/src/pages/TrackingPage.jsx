import { useParams,Link } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./TrackingPage.css";
import { Header } from "../components/Header";
import { getAuthHeaders } from "../utils/auth";
import PropTypes from "prop-types";
export function TrackingPage({ cart }) {
  useEffect(() => {
    document.title = "TrackingPage";
  }, []);
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
        {
          headers: getAuthHeaders()
        }
      );
      setOrder(response.data);
    };
    fetchTrackingData();
  }, [orderId]);
  if (!order) {
    return null;
  }
  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });
  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }
  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;
  return (
    <>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

      <div className="delivery-date">
        {deliveryPercent >= 100
          ? `Delivered on ${dayjs(
              orderProduct.estimatedDeliveryTimeMs
            ).format("dddd, MMMM D")}`
          : `Arriving on ${dayjs(
              orderProduct.estimatedDeliveryTimeMs
            ).format("dddd, MMMM D")}`}
      </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={`/${orderProduct.product.image}`}
            alt={orderProduct.product.name}
          />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
TrackingPage.propTypes = {
  cart: PropTypes.array.isRequired
};
