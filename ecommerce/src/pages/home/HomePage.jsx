import axios from "axios";
import "./HomePage.css";
import { useEffect,useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
}, []);

  return (
    <>
      <title>Ecommerce</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart} />
      <div className="home-page">
      <ProductsGrid products={products} />
      </div>
    </>
  );
}

