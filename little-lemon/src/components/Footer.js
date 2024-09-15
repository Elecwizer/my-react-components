import React from 'react';

// Import the secondary logo image from the images folder
import GreenLittle from '../images/GreenLittle.png';

function Footer() {
  return (
    <footer>
      <div className="logo-secondary">
        {/* Use the imported secondary logo image */}
        <img src={GreenLittle} alt="Secondary Little Lemon Logo" />
      </div>

      <section className="footer-navigation">
        <nav>
          <h3>Doormat Navigation</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#reservations">Reservations</a></li>
            <li><a href="#order-online">Order Online</a></li>
            <li><a href="#login">Login</a></li>
          </ul>
        </nav>
      </section>

      <section className="contact">
        <h3>Contact</h3>
        <p>Address</p>
        <p>Phone number</p>
        <p>Email</p>
      </section>

      <section className="social-media">
        <h3>Social Media Links</h3>
        <p>Address</p>
        <p>Phone number</p>
        <p>Email</p>
      </section>
    </footer>
  );
}

export default Footer;
