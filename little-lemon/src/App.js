import React, { useReducer, useEffect, useState } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import BookingForm from './components/BookingForm';
import ConfirmedBooking from './components/ConfirmedBooking';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // Add useNavigate here

// Declare fetchAPI and submitAPI as global variables to satisfy ESLint
/* global fetchAPI, submitAPI */

// Mock API functions (fallback if the script doesn't load)
if (typeof fetchAPI === "undefined" || typeof submitAPI === "undefined") {
  console.warn("API functions are not defined. Using mock functions.");
  global.fetchAPI = function (date) {
    const day = date.getDate(); // Get the day of the month
    let result = [];
    for (let i = 17; i <= 23; i++) {
      if (day % 2 === 0) { // Even days have more times
        result.push(i + ":00");
        result.push(i + ":30");
      } else { // Odd days have fewer times
        if (i % 2 === 0) {
          result.push(i + ":00");
        }
      }
    }
    return result;
  };

  global.submitAPI = function (formData) {
    console.log("Mock submitAPI called with data:", formData);
    return true; // Mock success response
  };
}

// Initialize available times for today's date
const initializeTimes = async () => {
  const today = new Date(); // Get today's date
  const availableTimes = fetchAPI(today); // Fetch available times
  return availableTimes;
};

// Reducer function to handle updates
const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATE":
      const selectedDate = new Date(action.payload); // Get the selected date
      const availableTimes = fetchAPI(selectedDate); // Fetch available times
      return availableTimes; // Return the fetched times
    case "REMOVE_TIME":
      return state.filter((time) => time !== action.payload); // Remove the reserved time
    default:
      return state;
  }
};

// Wrapper component for BookingForm to provide required props
const BookingFormWrapper = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, []);
  const [reservedTimes, setReservedTimes] = useState([]); // Track reserved times
  const navigate = useNavigate(); // useNavigate is now inside a child component of <Router>

  // Initialize available times when the component mounts
  useEffect(() => {
    const initialize = async () => {
      const times = await initializeTimes();
      dispatch({ type: "INITIALIZE_TIMES", payload: times });
    };
    initialize();
  }, []);

  // Function to handle form submission
  const submitForm = async (formData) => {
    const isSubmitted = submitAPI(formData);
    if (isSubmitted) {
      // Add the reserved time to the list of reserved times
      setReservedTimes((prev) => [...prev, formData.time]);
      // Remove the reserved time from available times
      dispatch({ type: "REMOVE_TIME", payload: formData.time });
      navigate("/booking-confirmed"); // Navigate to the confirmation page
    } else {
      console.error("Form submission failed!");
    }
  };

  return <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />;
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<><Main /><Footer /></>} />

        {/* Reservations route */}
        <Route
          path="/reservation"
          element={
            <>
              <BookingFormWrapper />
              <Footer />
            </>
          }
        />

        {/* Booking confirmation route */}
        <Route path="/booking-confirmed" element={<><ConfirmedBooking /><Footer /></>} />

        {/* Other routes */}
        <Route path="/about" element={<></>} />
        <Route path="/menu" element={<></>} />
        <Route path="/order-online" element={<></>} />
        <Route path="/login" element={<></>} />
      </Routes>
    </Router>
  );
}

export default App;