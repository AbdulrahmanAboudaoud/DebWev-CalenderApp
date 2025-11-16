import React, { useState } from "react";
import logo from "../../assets/cute-calendar-sticker-free-png-4225752480.png";
import "./NavBarStyle.css";
import notification from "../../assets/notification.png";
import { useNavigate } from 'react-router-dom';

type StatusValue = "office" | "home" | "sick" | "vacation" | "offline";

const STATUS_OPTIONS: { value: StatusValue; label: string; iconClass: string }[] = [
  { value: "office", label: "Working at office", iconClass: "bi-building" },
  { value: "home", label: "Working from home", iconClass: "bi-house-door" },
  { value: "sick", label: "Sick", iconClass: "bi-emoji-frown" },
  { value: "vacation", label: "On vacation", iconClass: "bi-airplane" },
  { value: "offline", label: "Offline", iconClass: "bi-slash-circle" },
];

function NavbarRightSide() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<StatusValue>("office");

  const currentStatus =
    STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];

  const handleLogout = () => {
    navigate("/login");
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as StatusValue;
    setStatus(newStatus);

    // TODO: later send to backend:
    // await api.updateStatus(newStatus);
  };

  return (
    <div className="nav-right">
      <p className="UsersName">John Doe</p>

      {/* NEW STATUS DROPDOWN */}
      <div className="status-selector">
        <i
          className={`bi ${currentStatus.iconClass} status-icon`}
          aria-hidden="true"
        ></i>
        <select
          className="status-select"
          value={status}
          onChange={handleStatusChange}
          aria-label="Change your status"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <a href={"#"} className={"NotificationBell"}>
        <img className="bell" src={notification} alt="Notification Bell" />
      </a>
      <button className="logoutButton" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default NavbarRightSide;
