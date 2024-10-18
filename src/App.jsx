import React from 'react';
import HomePage from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Store from './pages/Store';
import Card from './pages/Card';
import Recommend from './components/Recommend/Recommend'; // Import the Recommend page

function App() {
  return (
    <div className='max-width-[100%] font-serif'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/store" element={<Store />} />
          <Route path="/recommend" element={<Recommend />} /> {/* Add a route for Recommend */}
          <Route path="/store/card" element={<Card />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
