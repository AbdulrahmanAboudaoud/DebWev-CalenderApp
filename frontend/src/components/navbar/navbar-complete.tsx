import React, { useState } from "react";
import logo from "../../assets/cute-calendar-sticker-free-png-4225752480.png";
import "./NavBarStyle.css";
import notification from "../../assets/notification.png";
import NavbarLeftSide from "./navbar-left-side";
import NavbarRightSide from "./navbar-right-side";
import NavbarCenter from "./navbar-center";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="NavBar">
      <div className="nav-left">
        <NavbarLeftSide/>
      </div>
      <div className="nav-center desktop-only">
        <NavbarCenter/>
      </div>
      <div className="nav-right desktop-only">
        <NavbarRightSide/>
      </div>
      <button className="hamburger mobile-only" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i className="bi bi-list"></i>
      </button>
      {isMenuOpen && (
        <div className="mobile-menu">
          <NavbarCenter />
          <NavbarRightSide />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
