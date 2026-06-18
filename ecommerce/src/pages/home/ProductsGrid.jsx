import { Product } from "./Product";

export function ProductsGrid({
  products,
  loadCart,
  wishlistIds,
  isWishlistPage,
  loadWishlist,
}) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            product={product}
            loadCart={loadCart}
            wishlistIds={wishlistIds}
            isWishlistPage={isWishlistPage}
            loadWishlist={loadWishlist}
            
          />
        );
      })}
    </div>
  );
}
