'use client'; // Mark this as a client component

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact">
      <div className="contact-heading">Contact Us</div>
      <div className="contact-info">
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <span>Email: info@example.com</span>
        </div>
        <div className="contact-item">
          <i className="fas fa-phone"></i>
          <span>Phone: +1 234 567 890</span>
        </div>
        <div className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>Address: 123 Example St, City, Country</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
