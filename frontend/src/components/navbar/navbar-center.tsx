import React from "react";
import logo from "../../assets/cute-calendar-sticker-free-png-4225752480.png";
import "./NavBarStyle.css";
import notification from "../../assets/notification.png";

function NavbarCenter() {
  return (
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
  );
}

export default NavbarCenter;
