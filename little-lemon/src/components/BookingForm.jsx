import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Declare submitAPI as a global variable to satisfy ESLint
/* global submitAPI */

const BookingForm = ({ availableTimes = [], dispatch, submitForm }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("None");
  const navigate = useNavigate();

  // Reset time selection if availableTimes changes
  useEffect(() => {
    if (availableTimes.length > 0 && !availableTimes.includes(time)) {
      setTime(availableTimes[0]); // Set to the first available time
    }
  }, [availableTimes, time]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      date,
      time,
      guests,
      occasion,
    };

    // Call the submitForm function
    submitForm(formData);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);

    if (dispatch) {
      dispatch({ type: "UPDATE_DATE", payload: selectedDate });
    } else {
      console.error("Dispatch function is undefined!");
    }
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Full name</label>
      <input type="text" id="name" required />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" required />

      <label htmlFor="phone">Phone number</label>
      <input type="tel" id="phone" required />

      <label htmlFor="date">Choose date</label>
      <input type="date" id="date" value={date} onChange={handleDateChange} required />

      <label htmlFor="time">Choose time</label>
      <select id="time" value={time} onChange={(e) => setTime(e.target.value)} required>
        {availableTimes.length > 0 ? (
          availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))
        ) : (
          <option value="">No available times</option>
        )}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        required
      />

      <label htmlFor="occasion">Occasion</label>
      <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} required>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Graduation">Graduation</option>
        <option value="None">None</option>
      </select>

      <button type="submit">Make Your Reservation</button>
    </form>
  );
};

BookingForm.propTypes = {
  availableTimes: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

export default BookingForm;