import React, { useState } from "react";
import logo from "../../assets/cute-calendar-sticker-free-png-4225752480.png";
import "./NavBarStyle.css";
import notification from "../../assets/notification.png";
import { useNavigate } from "react-router-dom";
import { attendanceApi, StatusValue } from "../../services/AttendanceApi";

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

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as StatusValue;
    setStatus(newStatus);

    console.log("Changing status to:", newStatus);

    try {
      await attendanceApi.updateMyStatus(newStatus);
      console.log("Status updated successfully");
    } catch (err) {
      console.error("Error updating status", err);
      // TODO: show toast or revert status if you want
    }
  };

  return (
    <div className="nav-right">
      <p className="UsersName">John Doe</p>

      {/* STATUS DROPDOWN */}
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
