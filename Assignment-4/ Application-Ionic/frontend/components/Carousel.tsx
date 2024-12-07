'use client'; // Mark this as a client component

import React from 'react';

const Carousel: React.FC = () => {
  return (
    <div className="background-image">
      <div className="container">
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/logo.jpg" className="d-block w-100" alt="..." />
              <div className="content">
                <h2>Welcome to Smart Talent Hire</h2>
                <p>We bridge the gap between skilled professionals and innovative companies...</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/images/equality.png" className="d-block w-100" alt="..." />
              <div className="content">
                <h2>Equity, Diversity, and Inclusion</h2>
                <p>We prioritize unbiased recruitment...</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/images/job_search.jpeg" className="d-block w-100" alt="..." />
              <div className="content">
                <h2>Join Us Today!</h2>
                <p>Sign up for free and start connecting with top talent...</p>
                <a href="/interview" className="btn btn-primary">View Jobs</a>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
