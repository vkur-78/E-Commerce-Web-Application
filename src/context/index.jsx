import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const navigate = useNavigate();

  async function fetchListOfProducts() {
    try {
      const apiResponse = await fetch("https://dummyjson.com/products");
      const result = await apiResponse.json();
      if (result && result.products) {
        setListOfProducts(result.products);
        setLoading(false);
      } else {
        console.error("Failed to retrieve products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function handleAddToCart(getProductDetails) {
    let updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.id === getProductDetails.id
    );

    if (existingItemIndex > -1) {
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        quantity: updatedCartItems[existingItemIndex].quantity + 1,
        totalPrice:
          (updatedCartItems[existingItemIndex].quantity + 1) * getProductDetails.price,
      };
    } else {
      updatedCartItems.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails.price,
      });
    }

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    navigate("/cart");
  }

  function handleRemoveFromCart(productId, isFullyRemoveFromCart) {
    let updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(item => item.id === productId);

    if (isFullyRemoveFromCart) {
      updatedCartItems.splice(itemIndex, 1);
    } else {
      updatedCartItems[itemIndex] = {
        ...updatedCartItems[itemIndex],
        quantity: updatedCartItems[itemIndex].quantity - 1,
        totalPrice:
          (updatedCartItems[itemIndex].quantity - 1) * updatedCartItems[itemIndex].price,
      };
    }

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  }

  useEffect(() => {
    fetchListOfProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <ShoppingCartContext.Provider
      value={{
        listOfProducts,
        loading,
        productDetails,
        setProductDetails,
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
