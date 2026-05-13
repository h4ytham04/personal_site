import "./footer.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='footerContainer'>
      <p className='footer_copy'>&copy; {currentYear} Haytham Zaami. All rights reserved.</p>
    </div>
  )
}

export default Footer