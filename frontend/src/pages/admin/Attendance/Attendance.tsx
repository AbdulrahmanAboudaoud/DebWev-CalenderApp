import React, { useMemo, useState } from "react";
import "./Attendance.css";

type StatusValue = "office" | "home" | "sick" | "vacation" | "offline";

type UserAttendance = {
    id: number;
    name: string;
    role: string;
    status: StatusValue;
    lastUpdated: string;
    avatarColor: string;
};

const STATUS_LABELS: Record<
    StatusValue,
    { label: string; iconClass: string }
> = {
    office: { label: "Working at office", iconClass: "bi-building" },
    home: { label: "Working from home", iconClass: "bi-house-door" },
    sick: { label: "Sick", iconClass: "bi-emoji-frown" },
    vacation: { label: "On vacation", iconClass: "bi-airplane" },
    offline: { label: "Offline", iconClass: "bi-slash-circle" },
};

const FAKE_USERS: UserAttendance[] = [
    {
        id: 1,
        name: "John Doe",
        role: "Frontend Developer",
        status: "office",
        lastUpdated: "2 min ago",
        avatarColor: "#E75A7C",
    },
    {
        id: 2,
        name: "Sara Ahmed",
        role: "Backend Developer",
        status: "home",
        lastUpdated: "10 min ago",
        avatarColor: "#6C5CE7",
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Product Owner",
        status: "vacation",
        lastUpdated: "Today, 09:15",
        avatarColor: "#00B894",
    },
    {
        id: 4,
        name: "Emma Janssen",
        role: "UX Designer",
        status: "sick",
        lastUpdated: "Today, 08:40",
        avatarColor: "#0984E3",
    },
    {
        id: 5,
        name: "Liam Verhoeven",
        role: "QA Engineer",
        status: "offline",
        lastUpdated: "Yesterday, 17:30",
        avatarColor: "#FD9644",
    },
];

export default function Attendance() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusValue | "all">("all");

    const filteredUsers = useMemo(() => {
        return FAKE_USERS.filter((user) => {
            const matchesName =
                user.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === "all" ? true : user.status === statusFilter;
            return matchesName && matchesStatus;
        });
    }, [searchTerm, statusFilter]);

    return (
        <div className="page attendance-page">
            <div className="attendance-header">
                <div>
                    <h2>Team Attendance Overview</h2>
                    <p className="attendance-subtitle">
                        See where everyone is working today and filter by name or status.
                    </p>
                </div>

                <div className="attendance-controls">
                    <div className="attendance-search">
                        <i
                            className="bi bi-search attendance-search-icon"
                            aria-hidden="true"
                        ></i>
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className="attendance-filter"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value as StatusValue | "all")
                        }
                    >
                        <option value="all">All statuses</option>
                        <option value="office">Working at office</option>
                        <option value="home">Working from home</option>
                        <option value="sick">Sick</option>
                        <option value="vacation">On vacation</option>
                        <option value="offline">Offline</option>
                    </select>
                </div>
            </div>

            <div className="attendance-grid">
                {filteredUsers.map((user) => {
                    const statusMeta = STATUS_LABELS[user.status];

                    return (
                        <div key={user.id} className="attendance-card">
                            <div className="attendance-card-top">
                                <div className="attendance-user-main">
                                    <div
                                        className="attendance-avatar"
                                        style={{ backgroundColor: user.avatarColor }}
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="attendance-user-text">
                                        <div className="attendance-user-name">{user.name}</div>
                                        <div className="attendance-user-role">{user.role}</div>
                                    </div>
                                </div>

                                <div
                                    className={`attendance-status-pill status-${user.status}`}
                                >
                                    <i
                                        className={`bi ${statusMeta.iconClass} attendance-status-icon`}
                                        aria-hidden="true"
                                    ></i>
                                    <span>{statusMeta.label}</span>
                                </div>
                            </div>

                            <div className="attendance-card-footer">
                                <span className="attendance-updated">
                                    Last updated: {user.lastUpdated}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {filteredUsers.length === 0 && (
                    <div className="attendance-empty">
                        <p>No users found with this name / status.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
