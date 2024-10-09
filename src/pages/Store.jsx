import React from 'react';
import { useLocation } from 'react-router-dom';
import StoreCard from '../components/Store_Items/StoreCard'; // Adjust the import based on your file structure
import Navbar from '../components/Navbar/Navbar'
import About from '../components/About/About'
import Contact from "../components/Contact/Contact"
const Store = () => {
  const location = useLocation();
  const prediction = location.state?.prediction; // Retrieve the prediction from state

  return (
    <div className='overflow-x-none'> 
      <Navbar />
      <StoreCard prediction={prediction} /> {/* Pass the prediction as prop */}
      <About />
    </div>
  );
};

export default Store;
