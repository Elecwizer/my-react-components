import './styles.css';
import React, { useReducer } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import BookingForm from './components/BookingForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Initialize available times
const initializeTimes = () => {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
};

// Reducer function to handle updates
const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATE":
      return initializeTimes(); // Mock behavior for now
    default:
      return state;
  }
};

// Wrapper component for BookingForm to provide required props
const BookingFormWrapper = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return <BookingForm availableTimes={availableTimes} dispatch={dispatch} />;
};

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<><Main /> <Footer /></>} />

          {/* About route */}
          <Route path="/about" element={<></>} />

          {/* Menu route */}
          <Route path="/menu" element={<></>} />

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

          {/* Order online route */}
          <Route path="/order-online" element={<></>} />

          {/* Login route */}
          <Route path="/login" element={<></>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;