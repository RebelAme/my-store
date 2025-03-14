import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  useEffect(() => {
    // Load PayPal script dynamically
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=sb";
    script.onload = () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: "19.99" } }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        },
      }).render("#paypal-button");
    };
    document.body.appendChild(script);

    // Cleanup the script after component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 font-sans">
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center p-6 bg-white shadow-md fixed top-0 left-0">
        <h1 className="text-2xl font-semibold">Rebel Ame Store</h1>
        <p className="text-gray-600">Cart: {cartCount}</p>
      </nav>

      {/* Hero Section */}
      <header className="w-full flex flex-col items-center justify-center pt-28 pb-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Premium Products, Minimal Design</h2>
        <p className="text-gray-600 max-w-lg">Discover high-quality products with a seamless shopping experience.</p>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 w-full max-w-6xl">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform">
            <img
              src={`/product-image-1.jpg`} // Corrected image path
              alt="Product"
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Awesome Product {item}</h3>
            <p className="text-gray-600">Price: $19.99</p>
            <button
              onClick={addToCart}
              className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Shopping Cart */}
      <div className="mt-6 p-6 w-full max-w-md bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
        <p className="text-gray-600">Items in cart: {cartCount}</p>
        <div id="paypal-button" className="mt-4"></div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 mt-12 bg-gray-100 text-gray-600">
        © 2025 Rebel Ame Store. All rights reserved.
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
