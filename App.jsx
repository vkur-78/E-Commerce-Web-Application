import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';  // Ensure this path is correct
import ProductList from "./pages/productList";  // Update path
import ProductDetailsPage from "./pages/productDetails";  // Update path
import CartListPage from "./pages/cartList";  // Update path

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartListPage />} />
      </Routes>
    
  );
}

export default App;
