import React from 'react';
import Navbar from '../components/Navbar/Navbar'; // Import Navbar if needed
import Checkout from '../components/Checkout/Checkout';
import About from '../components/About/About';

const Card = () => {
  return (
    <div className="flex flex-col justify-between h-screen md:h-auto"> {/* Full height on larger screens */}
      <div className="flex-1"> {/* Take up available space for Checkout */}
        <Checkout />
      </div>
      <div className="mt-auto sm:mt-4 md:mt-0"> {/* Margin adjustments for different screen sizes */}
        <About />
      </div>
    </div>
  );
};

export default Card;
