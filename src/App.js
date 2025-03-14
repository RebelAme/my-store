import React, { useState, useEffect } from "react";

const App = () => {
  const [mainImage, setMainImage] = useState("product-image-1.jpg");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load PayPal script dynamically
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=sb"; // Change client-id for production
    script.onload = () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: "120.00" } }],
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

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="flex justify-center items-center py-16">
      <div className="max-w-6xl w-full flex gap-8">
        {/* Left Column (Product Image) */}
        <div className="flex-1">
          <img
            src={mainImage}
            alt="Product"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Column (Product Details) */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Yankees Chainstitch Pocket Tee
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Classic baseball tee with chainstitch detail, crafted with high-quality materials.
          </p>

          <p className="text-2xl font-semibold text-gray-900 mb-4">$120.00</p>

          <label htmlFor="size" className="block text-lg text-gray-800 mb-2">
            Size
          </label>
          <select id="size" className="w-full p-3 border border-gray-300 rounded-lg mb-6">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">XL</option>
          </select>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Add to Cart
          </button>

          {/* PayPal Button */}
          <div id="paypal-button" className="mt-6"></div>
        </div>
      </div>

      {/* Product Image Thumbnails */}
      <div className="flex gap-4 mt-6">
        <img
          src="/product-thumbnail-1.jpg"
          alt="Product Thumbnail 1"
          className="w-20 h-20 object-cover cursor-pointer"
          onClick={() => setMainImage("product-image-1.jpg")}
        />
        <img
          src="/product-thumbnail-2.jpg"
          alt="Product Thumbnail 2"
          className="w-20 h-20 object-cover cursor-pointer"
          onClick={() => setMainImage("product-image-2.jpg")}
        />
        <img
          src="/product-thumbnail-3.jpg"
          alt="Product Thumbnail 3"
          className="w-20 h-20 object-cover cursor-pointer"
          onClick={() => setMainImage("product-image-3.jpg")}
        />
      </div>
    </div>
  );
};

export default App;
