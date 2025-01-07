// filepath: /e:/SynesisIT/syn-blog/src/Components/Navbar.js
import React, { useState } from 'react';
import './Navbar.css'; // Import the custom CSS file
import { TbBellRinging } from "react-icons/tb";

function Navbar() {
  // State to hold the notification count
  const [notificationCount] = useState(3); // Example count

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          className="logo"
        />
      </div>
      
      <div className="navbar-actions">
        <div className="notification-bell">
          <span className="bell-text">Bell Counter</span>
          <TbBellRinging className="bell-icon" />
          {notificationCount > 0 && (
            <span className="notification-counter">{notificationCount}</span>
          )}
        </div>
        <button className="btn sign-in">Sign In</button>
        <button className="btn register">Register</button>
      </div>
    </nav>
  );
}

export default Navbar;
