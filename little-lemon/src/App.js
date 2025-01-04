import "./styles.css";
import React, { useReducer, useEffect } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import BookingForm from './components/BookingForm'; // Import BookingForm
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Mock API functions (fallback if the script doesn't load)
if (typeof fetchAPI === "undefined" || typeof submitAPI === "undefined") {
  console.warn("API functions are not defined. Using mock functions.");
  global.fetchAPI = function (date) {
    let result = [];
    let random = Math.random(); // Use a simple random function for mocking
    for (let i = 17; i <= 23; i++) {
      if (random < 0.5) {
        result.push(i + ":00");
      }
      if (random < 0.5) {
        result.push(i + ":30");
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
    default:
      return state;
  }
};

// Wrapper component for BookingForm to provide required props
const BookingFormWrapper = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, []);

  // Initialize available times when the component mounts
  useEffect(() => {
    const initialize = async () => {
      const times = await initializeTimes();
      dispatch({ type: "INITIALIZE_TIMES", payload: times });
    };
    initialize();
  }, []);

  return <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitAPI={submitAPI} />;
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