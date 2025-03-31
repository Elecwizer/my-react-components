import React, { useReducer, useEffect, useState } from "react";
import Hero from "./Hero";
import Specials from "./Specials";
import Testimonials from "./Testimonials";
import About from "./About";
import { useNavigate } from "react-router-dom";

// Declare fetchAPI and submitAPI as global variables to satisfy ESLint
/* global fetchAPI, submitAPI */

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

const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, []);
  const [reservedTimes, setReservedTimes] = useState([]); // Track reserved times
  const navigate = useNavigate();

  // Initialize available times when the component mounts
  useEffect(() => {
    const initialize = async () => {
      const times = await initializeTimes();
      dispatch({ type: "INITIALIZE_TIMES", payload: times });
    };
    initialize();
  }, []);

  return (
    <main>
      <Hero />
      <Specials />
      <Testimonials />
      <About />
    </main>
  );
};

export default Main;