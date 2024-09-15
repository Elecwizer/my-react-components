import React from 'react';

// Import the images from the images folder
import Restaurant from '../images/Restaurant.jpg';
import MarioAndAdrian from '../images/MarioandAdrian.jpg';

function About() {
  return (
    <section className="about">
      {/* Left side: Text content */}
      <div className="about-text">
        <h2>Little Lemon</h2>
        <h3>Chicago</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut lectus purus. Nulla facilisi.</p>
      </div>

      {/* Right side: Stacked images */}
      <div className="about-images">
        <img src={Restaurant} alt="Restaurant Interior" />
        <img src={MarioAndAdrian} alt="Chefs in Action" />
      </div>
    </section>
  );
}

export default About;
