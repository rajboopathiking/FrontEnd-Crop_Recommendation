import React, { useState } from 'react';
import RetailStore from '../RetailStore/RetailStore';

const Checkout = () => {
  // State for cart items and total price
  const [cartItems, setCartItems] = useState(RetailStore((state) => state.cartItems));
  const [totalPrice, setTotalPrice] = useState(RetailStore((state) => state.totalPrice));

  // User details for the form fields
  const userDetails = [
    { id: 1, name: "Name", placeholder: "Enter your name" },
    { id: 2, name: "Occupation", placeholder: "Enter your occupation" },
    { id: 3, name: "Location", placeholder: "Enter your location" },
    { id: 4, name: "State", placeholder: "Enter your state" },
    { id: 5, name: "PinCode", placeholder: "Enter your pincode" },
  ];

  // Payment details for the form fields
  const paymentDetails = [
    { id: 1, name: "Card Number", placeholder: "Enter your card number" },
    { id: 2, name: "Expiry Date", placeholder: "MM/YY" },
    { id: 3, name: "CVV", placeholder: "Enter CVV" },
    { id: 4, name: "Cardholder Name", placeholder: "Enter name on card" },
  ];

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle payment with the cartItems and totalPrice
    alert(`Total: $${totalPrice}. Proceeding to payment...`);
    // Add further payment processing logic here
  };

  // Function to update items and price
  const updateCart = (newItems, newTotalPrice) => {
    setCartItems(newItems);
    setTotalPrice(newTotalPrice);
  };

  // Example usage of updateCart (this should be replaced with your actual logic)
  // You can call updateCart(newItems, newTotalPrice) when you want to update the cart.
  // For example:
  // updateCart([{ name: "New Item", price: "20" }], "20");

  return (
    <div className='relative'>
      {/* Header */}
      <h1 className='m-[10px] p-[5px] text-center font-bold text-[20px] bg-black text-white'>
        <span className='font-bold text-[30px] text-red-600'>Payment </span>
        <span className='text-[30px] text-green-600'>Details</span>
      </h1>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit}>
        {/* User Details Section */}
        <div className='p-4'>
          <h2 className='text-[20px] underline font-bold text-center'>User Details</h2>
          <div className='grid grid-cols-2 items-center gap-4 p-4 sm:grid-cols-1 md:grid-cols-1'>
            {userDetails.map((item) => (
              <div key={item.id} className='ml-10'>
                <label htmlFor={`user-input-${item.id}`} className='block font-bold text-[20px]'>
                  {item.name}:
                </label>
                <input
                  className='border border-black w-[80%] font-bold p-2 mt-1'
                  type="text"
                  id={`user-input-${item.id}`}
                  placeholder={item.placeholder}
                  required // Add required attribute
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Details Section */}
        <div className='p-4'>
          <h2 className='font-bold text-[20px] text-center'>Payment Details</h2>
          <div className='grid grid-cols-2 items-center gap-4 p-4 sm:grid-cols-1 md:grid-cols-1'>
            {paymentDetails.map((item) => (
              <div key={item.id} className='ml-10'>
                <label htmlFor={`payment-input-${item.id}`} className='block font-bold text-[20px]'>
                  {item.name}:
                </label>
                <input
                  className='border border-black w-[80%] font-bold p-2 mt-1'
                  type="text"
                  id={`payment-input-${item.id}`}
                  placeholder={item.placeholder}
                  required // Add required attribute
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cart Items Summary */}
        <div className='p-4'>
          <h2 className='font-bold text-[20px] text-center'>Your Cart</h2>
          <div className='p-4'>
            <ul className="list-disc list-style-none sm:hidden md:hidden list-inside">
              {cartItems.map((item, index) => (
                <li key={index} className='text-lg'>
                  {item.name} - {item.price}
                </li>
              ))}
            </ul>
            <h3 className='text-right font-bold mt-4 text-lg'>
              Total Price: {totalPrice}
            </h3>
          </div>
        </div>

        {/* Submit Button for Payment */}
        <div className='text-center p-4'>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Complete Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
