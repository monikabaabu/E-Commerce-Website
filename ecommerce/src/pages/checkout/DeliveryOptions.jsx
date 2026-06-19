import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import axios from "axios";
import { getAuthHeaders } from "../../utils/auth";
import PropTypes from "prop-types";
export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";
        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }
        const updateDeliveryOption = async () => {
          await axios.put(
            `/api/cart-items/${cartItem.productId}`,
            {
              deliveryOptionId: deliveryOption._id,
            },
            {
              headers: getAuthHeaders(),
            }
          );

          await loadCart();
        };

        return (
          <button
            key={deliveryOption._id}
            type="button"
            className="delivery-option"
            onClick={updateDeliveryOption}
          >
            <input
              type="radio"
              checked={
                deliveryOption._id ===
                cartItem.deliveryOptionId
              }
              onChange={() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />

            <div>
              <div className="delivery-option-date">
                {dayjs(
                  deliveryOption.estimatedDeliveryTimeMs
                ).format("dddd, MMMM D")}
              </div>

              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
DeliveryOptions.propTypes = {
  deliveryOptions: PropTypes.array.isRequired,
  cartItem: PropTypes.object.isRequired,
  loadCart: PropTypes.func.isRequired
};