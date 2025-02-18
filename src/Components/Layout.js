// Layout.js
import React from 'react';
import Navbar from './Navbar';
import './layout.css'; // Import Layout CSS

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
