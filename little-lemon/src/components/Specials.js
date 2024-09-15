import React from 'react';

// Import the images from the images folder
import GreekSalad from '../images/GreekSalad.jpg';
import Bruschetta from '../images/Bruschetta.jpg';
import LemonDessert from '../images/LemonDessert.jpg';

function Specials() {
  return (
    <section className="specials">
      <h2>This Week's Specials!</h2>
      <button>Online Menu</button>

      <article className="special-item">
        <img src={GreekSalad} alt="Greek Salad" />
        <h3>Greek Salad</h3>
        <p>$12.99</p>
        <p>The famous salad of crispy lettuce, peppers, olives, and our Chicago-style feta cheese.</p>
        <button>Order a Delivery</button>
      </article>

      <article className="special-item">
        <img src={Bruschetta} alt="Bruschetta" />
        <h3>Bruschetta</h3>
        <p>$5.99</p>
        <p>Grilled bread with garlic, tomatoes, and olive oil.</p>
        <button>Order a Delivery</button>
      </article>

      <article className="special-item">
        <img src={LemonDessert} alt="Lemon Dessert" />
        <h3>Lemon Dessert</h3>
        <p>$5.00</p>
        <p>This comes straight from Grandma's recipe book.</p>
        <button>Order a Delivery</button>
      </article>
    </section>
  );
}

export default Specials;
