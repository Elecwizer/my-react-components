import React, { useReducer, useEffect } from "react";
import Hero from "./Hero";
import Specials from "./Specials";
import Testimonials from "./Testimonials";
import About from "./About";
import BookingForm from "./BookingForm";

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

const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, []);

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
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitAPI={submitAPI} />
    </main>
  );
};

export default Main;