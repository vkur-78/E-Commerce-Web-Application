import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductTile({ singleProductTile }) {
  const navigate = useNavigate();
  const { handleAddToCart } = useContext(ShoppingCartContext);

  function handleNavigateToProductDetailsPage(getCurrentProductId) {
    navigate(`/product-details/${getCurrentProductId}`);
  }

  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={singleProductTile?.thumbnail}
          alt={singleProductTile?.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {singleProductTile?.title}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">
          ${singleProductTile?.price}
        </p>
      </div>
      <div className="mt-5 flex flex-col space-y-2">
        <button
          onClick={() => handleAddToCart(singleProductTile)}
          className="px-5 py-2 rounded-lg bg-green-500 text-white font-bold text-lg transition duration-200 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
          Add to Cart
        </button>
        <button
          onClick={() => handleNavigateToProductDetailsPage(singleProductTile?.id)}
          className="px-5 py-2 rounded-lg bg-black text-white font-bold text-lg transition duration-200 hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProductTile;
