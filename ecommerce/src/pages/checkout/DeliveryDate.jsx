import dayjs from "dayjs";
import PropTypes from "prop-types";

export function DeliveryDate({
  cartItem,
  deliveryOptions,
}) {
  const selectedDeliveryOption =
    deliveryOptions.find(
      deliveryOption =>
        (deliveryOption._id || deliveryOption.id) ===
        cartItem.deliveryOptionId
    );

  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {dayjs(
        selectedDeliveryOption.estimatedDeliveryTimeMs
      ).format("dddd, MMMM D")}
    </div>
  );
}

DeliveryDate.propTypes = {
  cartItem: PropTypes.object.isRequired,
  deliveryOptions: PropTypes.array.isRequired
};