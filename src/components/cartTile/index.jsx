import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";

function CartTile({ singleCartItem }) {
  const { handleRemoveFromCart, handleAddToCart } = useContext(ShoppingCartContext);

  if (!singleCartItem) return null; // Handle case where singleCartItem might be undefined

  return (
    <Fragment>
      <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img
              src={singleCartItem?.thumbnail}
              className="w-full h-full object-contain"
              alt={singleCartItem?.title}
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {singleCartItem?.title}
            </h3>
            <button
              onClick={() => handleRemoveFromCart(singleCartItem.id, true)}
              className="text-sm px-4 py-3 bg-black text-white font-extrabold"
            >
              REMOVE
            </button>
          </div>
        </div>
        <div className="ml-auto flex flex-col justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            ${singleCartItem?.totalPrice ? singleCartItem.totalPrice.toFixed(2) : '0.00'}
          </h3>
          <p className="mt-2 mb-3 font-bold text-[16px]">
            Quantity: {singleCartItem?.quantity}
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleRemoveFromCart(singleCartItem.id, false)}
              className="disabled:opacity-65 border border-[#000] px-3 py-1"
              disabled={singleCartItem?.quantity === 1}
            >
              -
            </button>
            <button
              onClick={() => handleAddToCart(singleCartItem)}
              className="border border-[#000] px-3 py-1"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-500" />
    </Fragment>
  );
}

export default CartTile;
