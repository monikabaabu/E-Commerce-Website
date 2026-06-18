import { Product } from "./Product";

export function ProductsGrid({
  products,
  loadCart,
  isWishlistPage,
  loadWishlist
}) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            product={product}
            loadCart={loadCart}
            isWishlistPage={isWishlistPage}
            loadWishlist={loadWishlist}
          />
        );
      })}
    </div>
  );
}