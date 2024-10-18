import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import StoreCard from '../components/Store_Items/StoreCard'; // Import StoreCard
import Navbar from '../components/Navbar/Navbar';
import About from '../components/About/About';

const Store = () => {
  const location = useLocation(); // Get location object
  const { prediction } = location.state || {}; // Destructure prediction from state

  return (
    <div >
      <Navbar />
      <div >
        {/* Render StoreCard and pass prediction */}
        {prediction ? (
          <StoreCard prediction={prediction} />
        ) : (
          <StoreCard /> // Handle case when there's no prediction
        )}

      </div>

    </div>
  );
};

export default Store;
