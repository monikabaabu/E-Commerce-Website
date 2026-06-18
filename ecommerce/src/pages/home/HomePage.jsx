import axios from "axios";
import "./HomePage.css";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { useSearchParams } from "react-router";
import { getAuthHeaders } from "../../utils/auth";
export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [wishlistIds, setWishlistIds] = useState([]);
  const search = searchParams.get("search");
  useEffect(() => {
    document.title = "Shoppie";
  }, []);
useEffect(() => {
  const getHomeData = async () => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    const urlPath = search
      ? `/api/products?search=${search}`
      : "/api/products";

    const requests = [
      axios.get(urlPath)
    ];

    if (user) {
      requests.push(
        axios.get(
          `http://localhost:3000/api/wishlist/${user.id}`,
          {
            headers: getAuthHeaders()
          }
        )
      );
    }

    const responses = await Promise.all(requests);

    setProducts(responses[0].data);

    if (user) {
      setWishlistIds(
        responses[1].data.map(
          item => item.productId
        )
      );
    }
  };

  getHomeData();
}, [search]);

  return (
    <>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid
  products={products}
  loadCart={loadCart}
  wishlistIds={wishlistIds}
/>
      </div>
    </>
  );
}
