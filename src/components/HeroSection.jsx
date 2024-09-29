// src/components/HeroSection.jsx
import React from "react";

function HeroSection() {
  return (
    <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Discover Amazing Products</h1>
        <p className="mb-6">Shop the latest trends and exclusive collections</p>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
