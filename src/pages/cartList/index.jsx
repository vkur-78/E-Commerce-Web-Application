import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import CartTile from "../../components/cartTile";
import { useNavigate } from "react-router-dom";

function CartListPage() {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const total = cartItems
    .reduce((acc, curr) => acc + curr.totalPrice, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 text-center mb-12">
        My Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          {cartItems.length ? (
            cartItems.map((singleCartItem) => (
              <CartTile key={singleCartItem.id} singleCartItem={singleCartItem} />
            ))
          ) : (
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 text-center">
              Your cart is empty! Add some items.
            </h2>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 border-b pb-4">
            Order Summary
          </h3>
          <div className="mt-6 flex justify-between text-xl font-semibold text-gray-900 dark:text-gray-200">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <button
              disabled={cartItems.length === 0}
              className="disabled:opacity-50 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded hover:shadow-lg transition transform hover:scale-105"
            >
              Grab Your Favorites!
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-white border border-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded hover:bg-gray-100 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartListPage;
