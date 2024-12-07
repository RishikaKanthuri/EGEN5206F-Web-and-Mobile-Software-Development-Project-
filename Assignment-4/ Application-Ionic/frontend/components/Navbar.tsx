'use client'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import Link  from 'next/link';

const Navbar: React.FC=() => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-lightstyle={{ backgroundColor: 'rgba(232, 184, 232, 0.3)' }}">
      <div className="container-fluid">
        <img
          src="/photos/logo.jpg"
          id="logo"
          alt="logo"
          width="120"
          height="80"
          className="d-inline-block align-text-top"
        />
        <a className="navbar-brand" href="#">Smart Talent Hire</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/interview">View Jobs</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#candidateLogin">Candidate</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#panelistLogin">Panelist</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/admin">Hiring Manager</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Help
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#contact">Contact Us</a></li>
                 
              </ul>
            </li>
             
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
