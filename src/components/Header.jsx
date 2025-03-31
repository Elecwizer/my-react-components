import React from 'react';
import Nav from './Nav';

// Import the logo image from the images folder
import YellowLemonTitle from '../images/YellowLemonTitle.png';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={YellowLemonTitle} alt="Little Lemon Logo" />
      </div>
      <Nav />
    </header>
  );
}

export default Header;
