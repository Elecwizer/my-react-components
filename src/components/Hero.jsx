import React from 'react';

// Import the image from the images folder
import RestaurantFood from '../images/RestaurantFood.jpg';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are a family-owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <button>Reserve a Table</button>
      </div>
      <img src={RestaurantFood} alt="Restaurant Dish" />
    </section>
  );
}

export default Hero;
