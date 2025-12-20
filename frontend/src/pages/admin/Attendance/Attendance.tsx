import React, { useMemo, useState, useEffect } from "react";
import "./Attendance.css";
import {
    attendanceApi,
    AttendanceOverviewItem,
    StatusValue,
} from "../../../services/AttendanceApi";

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

// Random avatar colors for display
const COLORS = ["#E75A7C", "#6C5CE7", "#00B894", "#0984E3", "#FD9644"];

export default function Attendance() {
    const [users, setUsers] = useState<AttendanceOverviewItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusValue | "all">("all");

    // Load real data from backend API
    useEffect(() => {
        const loadAttendance = async () => {
            try {
                const data = await attendanceApi.getTodayAttendance();
                setUsers(data);
            } catch (err) {
                console.error("Error loading attendance", err);
            }
        };

        loadAttendance();
    }, []);

    // Convert ISO date → readable format
    const formatLastUpdated = (iso: string) => {
        const date = new Date(iso);
        return date.toLocaleString();
    };

    // Apply search + filter
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesName =
                user.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === "all" ? true : user.status === statusFilter;
            return matchesName && matchesStatus;
        });
    }, [users, searchTerm, statusFilter]);

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
                        <i className="bi bi-search attendance-search-icon"></i>
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
                {filteredUsers.map((user, index) => {
                    const statusMeta = STATUS_LABELS[user.status];
                    const avatarColor = COLORS[index % COLORS.length];

                    return (
                        <div key={user.attendanceId} className="attendance-card">
                            <div className="attendance-card-top">
                                <div className="attendance-user-main">
                                    <div
                                        className="attendance-avatar"
                                        style={{ backgroundColor: avatarColor }}
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
                                    ></i>
                                    <span>{statusMeta.label}</span>
                                </div>
                            </div>

                            <div className="attendance-card-footer">
                                <span className="attendance-updated">
                                    Last updated: {formatLastUpdated(user.lastUpdatedAt)}
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
