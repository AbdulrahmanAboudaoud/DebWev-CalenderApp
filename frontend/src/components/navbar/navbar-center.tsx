import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBarStyle.css";

function NavbarCenter() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  const user = localStorage.getItem("user");
  const role = user ? JSON.parse(user).role : null;

  return (
    <ul className="links">
      <li>
        <NavLink to="/app/home" className={linkClass}>Home</NavLink>
      </li>

      <li>
        <NavLink to="/app/room-booking" className={linkClass}>Room Booking</NavLink>
      </li>

      <li>
        <NavLink to="/app/events" className={linkClass}>Events</NavLink>
      </li>

      {/* Admin-only */}
      {role === "Admin" && (
        <li>
          <NavLink to="/app/attendance" className={linkClass}>
            Attendance
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavbarCenter;
