import React from 'react';
import pizza from '../Resource/pizza.png'

// Header component that takes onNavigate as a prop
const Header = ({ onNavigate }) => {
  return (
    <header>
      <h1>
        Dashboard
        <img src={pizza} className='App-logo'></img>
      </h1>
      <nav>
        {/* Use onNavigate prop to change pages */}
        <button className='dbButton' onClick={() => onNavigate('Dashboard')}>Dashboard</button>
        <button onClick={() => onNavigate('OrderHist')}>OrderHistory</button>
        <button onClick={() => onNavigate('OrderLog') }>OrderLog</button>
      </nav>
    </header>
  );
};

export default Header;
