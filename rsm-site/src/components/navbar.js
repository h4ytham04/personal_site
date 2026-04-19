import "./navbar.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className="header">
        <Link to="/">
          <h1>Resume Site</h1>
        </Link>
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={20} style={{ color: "#fff" }}/>
          ) : (
            <FaBars size={20} style={{ color: "#fff" }}/>
          )}
        </div>
        <ul className={click ? "nav-links active" : "nav-links"}>
          <li>
            <Link to="/" onClick={() => setClick(false)}>Home</Link>
          </li>
          <li>
            <Link to="/projects" onClick={() => setClick(false)}>Projects</Link>
          </li>
          <li>
            <Link to="/extras" onClick={() => setClick(false)}>Extras</Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setClick(false)}>Contact</Link>
          </li>
        </ul>
    </div>
  )
}

export default Navbar