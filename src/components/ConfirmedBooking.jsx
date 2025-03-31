import React from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmedBooking() {
  const navigate = useNavigate();

  return (
    <section className="confirmed-booking">
      <h1>Booking Confirmed!</h1>
      <h2>Your reservation has been successfully booked. We look forward to seeing you!</h2>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </section>
  );
}

export default ConfirmedBooking;