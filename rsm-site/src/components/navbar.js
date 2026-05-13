import "./navbar.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  const [click, setClick] = useState(false);

  return (
    <div className="header">
        <Link to="/">
          <img src={require('../assets/jsr_hz.png')} alt="logo" className="logo"/>
        </Link>
        <ul className={click ? "nav-links active" : "nav-links"}>
          <li>
            <NavLink to="/" onClick={() => setClick(false)} className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/projects" onClick={() => setClick(false)} className={({ isActive }) => isActive ? "active" : ""}>Projects</NavLink>
          </li>
          <li>
            <NavLink to="/extras" onClick={() => setClick(false)} className={({ isActive }) => isActive ? "active" : ""}>Extras</NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setClick(false)} className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
          </li>
        </ul>
    </div>
  )
}

export default Navbar