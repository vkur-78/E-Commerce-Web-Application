import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../components/productTile";

function ProductListPage() {
  const { listOfProducts, loading, handleAddToCart } = useContext(ShoppingCartContext);

  if (loading) {
    return (
      <h1 className="text-center text-2xl font-bold">Loading products...</h1>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 mb-12">
          Discover Your Perfect Style
        </h2>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {listOfProducts.length > 0 ? (
            listOfProducts.map((product) => (
              <ProductTile
                key={product.id}
                singleProductTile={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))
          ) : (
            <p className="text-center text-xl text-gray-700 dark:text-gray-400">
              No products available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductListPage;
