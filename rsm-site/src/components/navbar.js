import "./navbar.css";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li className="Haytham Zaami"><Link to="/">Haytham Zaami</Link></li>
          <li><Link to="/career">Career</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/extras">extras</Link></li>
        </ul>
      </nav>
      <div className="hamburger">☰</div>
    </header>
  );
};

export default Navbar;
