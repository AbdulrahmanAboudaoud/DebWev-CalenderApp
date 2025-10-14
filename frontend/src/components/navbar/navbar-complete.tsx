import React from "react";
import logo from "../../assets/cute-calendar-sticker-free-png-4225752480.png";
import "./NavBarStyle.css";
import notification from "../../assets/notification.png";
import NavbarLeftSide from "./navbar-left-side";
import NavbarRightSide from "./navbar-right-side";
import NavbarCenter from "./navbar-center";

function Navbar() {
  return (
    <nav className="NavBar">
      <div className="nav-left">
        <NavbarLeftSide/>
      </div>
      <div className="nav-center">
        <NavbarCenter/>
      </div>
      <div className="nav-right">
        <NavbarRightSide/>
      </div>
    </nav>
  );
}

export default Navbar;
