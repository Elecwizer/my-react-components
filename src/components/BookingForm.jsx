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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({}); // Track validation errors
  const navigate = useNavigate();

  // Reset time selection if availableTimes changes
  useEffect(() => {
    if (availableTimes.length > 0 && !availableTimes.includes(time)) {
      setTime(availableTimes[0]); // Set to the first available time
    }
  }, [availableTimes, time]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name || name.length < 4 || !/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name must be at least 4 characters and contain only letters.";
    }

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone validation
    if (!phone || !/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // Date validation
    if (!date) {
      newErrors.date = "Please select a date.";
    }

    // Time validation
    if (!time) {
      newErrors.time = "Please select a time.";
    }

    // Guests validation
    if (guests < 1 || guests > 10) {
      newErrors.guests = "Number of guests must be between 1 and 10.";
    }

    // Occasion validation
    if (!occasion) {
      newErrors.occasion = "Please select an occasion.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    const isValid = validateForm();
    if (!isValid) {
      return; // Stop submission if the form is invalid
    }

    // Prepare form data
    const formData = {
      name,
      email,
      phone,
      date,
      time,
      guests,
      occasion,
    };

    // Call the submitForm function
    const isSubmitted = submitAPI(formData);
    if (isSubmitted) {
      navigate("/booking-confirmed"); // Navigate to the confirmation page
    } else {
      console.error("Form submission failed!");
    }
  };

  // Handle date change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);

    if (dispatch) {
      dispatch({ type: "UPDATE_DATE", payload: selectedDate });
    } else {
      console.error("Dispatch function is undefined!");
    }

    // Clear date error
    setErrors((prevErrors) => ({ ...prevErrors, date: "" }));
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit} noValidate>
      {/* Name Field */}
      <label htmlFor="name">Full name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        }}
        required
        minLength={4}
        pattern="[A-Za-z\s]+"
      />
      {errors.name && <p className="error">{errors.name}</p>}

      {/* Email Field */}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        }}
        required
      />
      {errors.email && <p className="error">{errors.email}</p>}

      {/* Phone Field */}
      <label htmlFor="phone">Phone number</label>
      <input
        type="tel"
        id="phone"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
        }}
        required
        pattern="\d{10}"
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      {/* Date Field */}
      <label htmlFor="date">Choose date</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={handleDateChange}
        required
      />
      {errors.date && <p className="error">{errors.date}</p>}

      {/* Time Field */}
      <label htmlFor="time">Choose time</label>
      <select
        id="time"
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
          setErrors((prevErrors) => ({ ...prevErrors, time: "" }));
        }}
        required
      >
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
      {errors.time && <p className="error">{errors.time}</p>}

      {/* Guests Field */}
      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => {
          setGuests(Number(e.target.value));
          setErrors((prevErrors) => ({ ...prevErrors, guests: "" }));
        }}
        required
      />
      {errors.guests && <p className="error">{errors.guests}</p>}

      {/* Occasion Field */}
      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => {
          setOccasion(e.target.value);
          setErrors((prevErrors) => ({ ...prevErrors, occasion: "" }));
        }}
        required
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Graduation">Graduation</option>
        <option value="None">None</option>
      </select>
      {errors.occasion && <p className="error">{errors.occasion}</p>}

      {/* Submit Button */}
      <button type="submit">
        Make Your Reservation
      </button>
    </form>
  );
};

BookingForm.propTypes = {
  availableTimes: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

export default BookingForm;