import React from 'react';

const CheckoutBox = ({ totalPrice, cartItems }) => {
  const handleCheckout = () => {
    // Logic to handle payment with the cartItems and totalPrice
    alert(`Total: $${totalPrice}. Proceeding to payment...`);
  };

  return (
    <div className="text-center p-4">
      <button
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CheckoutBox;
