import { Product } from "./Product";
import PropTypes from "prop-types";
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
ProductsGrid.propTypes = {
  products: PropTypes.array.isRequired,
  loadCart: PropTypes.func.isRequired,
  wishlistIds: PropTypes.array,
  isWishlistPage: PropTypes.bool,
  loadWishlist: PropTypes.func
};