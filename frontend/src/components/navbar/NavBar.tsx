import React from "react";
import logo from "../../assets/cute-calendar-sticker-free-png-4225752480.png";
import "./NavBarStyle.css";
import notification from "../../assets/notification.png";

function NavBar() {
  return (
    <nav className="NavBar">
      <div className="nav-left">
        <img className="logo" src={logo} alt="Calendar Logo" />
        <a href={"/"} className={"site-title"}>
          Calendify
        </a>
      </div>

      <div className="nav-center">
        <ul className="links">
          <li>
            <a href={"/home"}>Home</a>
          </li>
          <li>
            <a href={"/booking"}>Room Booking</a>
          </li>
          <li>
            <a href={"/events"}>Events</a>
          </li>
          <li>
            <a href={"/attendance"}>Attendance</a>
          </li>
        </ul>
      </div>

      <div className="nav-right">
        <p className={"UsersName"}>John Doe</p>
        <a href={"#"} className={"NotificationBell"}>
          <img className="bell" src={notification} alt="Notification Bell" />
        </a>
        <button className="logoutButton">Log Out</button>
      </div>
    </nav>
  );
}

export default NavBar;
