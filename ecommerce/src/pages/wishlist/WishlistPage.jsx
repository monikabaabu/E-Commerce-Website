import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { ProductsGrid } from "../home/ProductsGrid";
import { getAuthHeaders } from "../../utils/auth";
import PropTypes from "prop-types";
export function WishlistPage({ cart, loadCart }) {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {


  const wishlistResponse = await axios.get(
    "http://localhost:3000/api/wishlist",
    {
      headers: getAuthHeaders()
    }
  );
    const productsResponse = await axios.get(
      "/api/products"
    );

    const filteredProducts =
      productsResponse.data.filter(product =>
        wishlistResponse.data.some(
          item => item.productId === product._id
        )
      );
    

    setWishlistProducts(filteredProducts);
  };

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid
          products={wishlistProducts}
          loadCart={loadCart}
          isWishlistPage={true}
          loadWishlist={loadWishlist}
        />
      </div>
    </>
  );
}

WishlistPage.propTypes = {
  cart: PropTypes.array.isRequired,
  loadCart: PropTypes.func.isRequired
};
