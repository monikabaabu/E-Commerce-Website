import { useState, useEffect } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";
import { getAuthHeaders } from "../../utils/auth";
import CheckmarkIcon from "../../assets/images/icons/checkmark.png";
export function Product({ product, loadCart, wishlistIds = [], isWishlistPage, loadWishlist }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
const [isWishlisted, setIsWishlisted] = useState(
  wishlistIds?.includes(product.id) || false
);
  const user = JSON.parse(localStorage.getItem("user") || "null");

useEffect(() => {
  setIsWishlisted(
    wishlistIds?.includes(product.id) || false
  );
}, [wishlistIds, product.id]);

  const addToCart = async () => {
    await axios.post(
      "/api/cart-items",
      {
        productId: product.id,
        quantity,
      },
      {
        headers: getAuthHeaders(),
      },
    );

    await loadCart();

    setShowAddedMessage(true);

    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };
  const toggleWishlist = async () => {
    if (!user) return;
    try {
      if (isWishlisted) {
        await axios.delete("http://localhost:3000/api/wishlist", {
          data: {
            productId: product.id,
          },
          headers: getAuthHeaders(),
        });

        setIsWishlisted(false);
      } else {
        await axios.post(
          "http://localhost:3000/api/wishlist",
          {
            productId: product.id,
          },
          {
            headers: getAuthHeaders(),
          },
        );

        setIsWishlisted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const removeFromWishlist = async () => {
    if (!user) return;
    await axios.delete("http://localhost:3000/api/wishlist", {
      data: {
        productId: product.id,
      },
      headers: getAuthHeaders(),
    });

    if (loadWishlist) {
      loadWishlist();
    }
  };

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };
  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div
        className="added-to-cart"
        style={{ opacity: showAddedMessage ? 1 : 0 }}
      >
        <img src={CheckmarkIcon} />
        Added
      </div>

      <div className="product-actions">
        <button
          className="add-to-cart-button button-primary"
          data-testid="add-to-cart-button"
          onClick={addToCart}
        >
          Add to Cart
        </button>

        {isWishlistPage ? (
          <button className="remove-button" onClick={removeFromWishlist}>
            Remove
          </button>
        ) : (
          <button className="wishlist-icon-button" onClick={toggleWishlist}>
            {isWishlisted ? "💚" : "♡"}
          </button>
        )}
      </div>
    </div>
  );
}
