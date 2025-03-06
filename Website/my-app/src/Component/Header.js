import React from 'react';

// Header component that takes onNavigate as a prop
const Header = ({ onNavigate }) => {
  return (
    <header>
      <nav>
        {/* Use onNavigate prop to change pages */}
        <button onClick={() => onNavigate('Dashboard')}>Dashboard</button>
        <button onClick={() => onNavigate('OrderHist')}>OrderHist</button>
      </nav>
    </header>
  );
};

export default Header;
