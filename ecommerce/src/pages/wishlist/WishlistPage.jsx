import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { ProductsGrid } from "../home/ProductsGrid";
import { getAuthHeaders } from "../../utils/auth";
export function WishlistPage({ cart, loadCart }) {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

 const wishlistResponse = await axios.get(
  `http://localhost:3000/api/wishlist/${user.id}`,
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
          item => item.productId === product.id
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