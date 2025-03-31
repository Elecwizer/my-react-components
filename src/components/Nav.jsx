// Nav.js
import React from 'react';
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home Page</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/reservation">Reservation</Link></li>
        <li><Link to="/order-online">Order online</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
