import "./footer.css";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='footerContainer'>
      <p className='footer_copy'>&copy; {currentYear} Haytham Zaami. All rights reserved.</p>
    </div>
  )
}

export default Footer