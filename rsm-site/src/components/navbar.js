import "./navbar.css";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <div className="header">
        <Link to="/">
          <h1>Resume Site</h1>
        </Link>
        <ul className="nav-links">
          <Link to="/projects">
            <li>Projects</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
        </ul>
    </div>
  )
}

export default Navbar