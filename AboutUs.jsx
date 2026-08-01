import React from "react";
import "./AboutUs.css";

function AboutUs({ onGetStarted }) {
  return (
    <div className="about-us-container">

      <div className="about-us-content">

        <h1>Welcome to Paradise Nursery</h1>

        <h2>Your One-Stop Shop for Beautiful House Plants</h2>

        <p>
          At <strong>Paradise Nursery</strong>, we believe that every home
          deserves the beauty and freshness of nature. We specialize in offering
          a carefully selected collection of high-quality indoor and outdoor
          plants that bring life, color, and clean air into your living space.
        </p>

        <p>
          Our mission is to make plant shopping simple, enjoyable, and
          accessible for everyone. Whether you are a first-time plant owner or
          an experienced gardening enthusiast, we provide healthy plants,
          affordable prices, and excellent customer service to help you build
          your own green paradise.
        </p>

        <p>
          Browse our wide selection of flowering plants, succulents, tropical
          plants, herbs, and decorative houseplants. Every plant is chosen with
          care to ensure freshness and long-lasting quality. Thank you for
          choosing Paradise Nursery as your trusted plant store.
        </p>

        <button
          className="get-started-button"
          onClick={onGetStarted}
        >
          Get Started
        </button>

      </div>

    </div>
  );
}

export default AboutUs;
