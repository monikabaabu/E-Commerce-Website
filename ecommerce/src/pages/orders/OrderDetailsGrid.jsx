import dayjs from "dayjs";
import { Fragment } from "react";
import { Link } from "react-router";
import { getAuthHeaders } from "../../utils/auth";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";
import axios from "axios";
import PropTypes from "prop-types";
export function OrderDetailsGrid({ order, loadCart }) {
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        const addToCart = async () => {
          await axios.post(
            "/api/cart-items",
            {
              productId: orderProduct.product._id,
              quantity: 1,
            },
            {
              headers: getAuthHeaders(),
            },
          );
          await loadCart();
        };
        return (
          <Fragment key={orderProduct.product._id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} alt={orderProduct.product.name} />
            </div>

            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button
                className="buy-again-button button-primary"
                onClick={addToCart}
              >
                <img className="buy-again-icon" src={BuyAgainIcon} alt="Buy Again" />
                <span className="buy-again-message">Buy Again</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order._id}/${orderProduct.product._id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
OrderDetailsGrid.propTypes = {
  order: PropTypes.object.isRequired,
  loadCart: PropTypes.func.isRequired
};