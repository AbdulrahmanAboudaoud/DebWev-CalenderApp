import React from "react";
import logo from "../../assets/cute-calendar-sticker-free-png-4225752480.png";
import "./NavBarStyle.css";
import notification from "../../assets/notification.png";
import { useNavigate } from 'react-router-dom';

function NavbarRightSide() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
<div className="nav-right">
        <p className={"UsersName"}>John Doe</p>
        <a href={"#"} className={"NotificationBell"}>
          <img className="bell" src={notification} alt="Notification Bell" />
        </a>
        <button className="logoutButton" onClick={handleLogout}>Log Out</button>
      </div>
  );
}

export default NavbarRightSide;
