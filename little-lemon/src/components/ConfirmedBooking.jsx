import React from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmedBooking() {
  const navigate = useNavigate();

  return (
    <section className="confirmed-booking">
      <h2>Booking Confirmed!</h2>
      <p>Your reservation has been successfully booked. We look forward to seeing you!</p>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </section>
  );
}

export default ConfirmedBooking;