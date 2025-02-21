import React from "react";
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a href="/aboutus">About Us</a>
        <a href="/terms">Terms & Conditions</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
      <p className="footer-motto">"Connecting People, Growing Together"</p>
      <p className="footer-rights">© 2025 All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
