import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

/* Landing Page */

function LandingPage() {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/products");
  };

  return (

    <div className="landing-page">

      <div className="overlay">

        <div className="welcome-content">

          <h1>Paradise Nursery</h1>

          <h2>Bring Nature Into Your Home</h2>

          <p>
            Paradise Nursery offers a beautiful collection of indoor and
            outdoor plants to brighten your home, office, and garden.
            Discover healthy plants, exceptional quality, and outstanding
            customer service all in one place.
          </p>

          <button
            className="get-started-btn"
            onClick={handleGetStarted}
          >
            Get Started
          </button>

        </div>

      </div>

    </div>

  );

}

/* Main Application */

function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/about" element={<AboutUs />} />

        <Route path="/products" element={<ProductList />} />

        <Route path="/cart" element={<Cart />} />

      </Routes>

    </Router>

  );

}

export default App;
