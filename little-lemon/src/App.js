import './styles.css';

import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import BookingForm from './components/BookingForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <Header/>
        <Routes>

          {/* Home page route */}
          <Route path="/" element={<><Main/> <Footer/></>} />

          {/* About route */}
          <Route path="/about" element={<></>} />

          {/* Menu route */}
          <Route path="/menu" element={<></>} />

          {/* Reservations route */}
          <Route path="/reservation" element={<><BookingForm/></>} />

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
