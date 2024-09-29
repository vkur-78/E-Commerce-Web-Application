import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleAddToCart,
    cartItems,
  } = useContext(ShoppingCartContext);

  async function fetchProductDetails() {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();

    if (result) {
      setProductDetails(result);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading)
    return (
      <h1 className="text-center text-2xl font-bold">
        Product details loading! Please wait...
      </h1>
    );

  const isProductInCart = cartItems.some(
    (item) => item.id === productDetails?.id
  );

  function handleAddToCartAndNavigate() {
    handleAddToCart(productDetails);
    navigate("/cart");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full dark:bg-gray-800">
        <div className="relative w-full">
          <img
            className="w-full h-auto object-contain"
            src={productDetails?.thumbnail}
            alt={productDetails?.title}
          />
        </div>
        <div className="p-6 flex flex-col lg:flex-row lg:items-start items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 mb-4 text-center lg:text-left">
              {productDetails?.title}
            </h2>
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-4 text-center lg:text-left">
              ${productDetails?.price}
            </p>
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={handleAddToCartAndNavigate}
                disabled={isProductInCart}
                className={`px-6 py-3 text-white font-semibold rounded-lg transition duration-300 ${
                  isProductInCart
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isProductInCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {productDetails?.images?.length
                ? productDetails.images.map((imageItem) => (
                    <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md" key={imageItem}>
                      <img
                        src={imageItem}
                        className="w-full h-full object-contain cursor-pointer"
                        alt="Product secondary image"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
