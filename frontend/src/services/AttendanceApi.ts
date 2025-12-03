const API_URL = "http://localhost:5000/api";

export type StatusValue = "office" | "home" | "sick" | "vacation" | "offline";

export type AttendanceOverviewItem = {
    attendanceId: number;
    userId: number;
    name: string;
    role: string;
    status: StatusValue;
    lastUpdatedAt: string;
};

export const attendanceApi = {
    // PUT: update current user's status
    updateMyStatus: async (status: StatusValue): Promise<void> => {
        const response = await fetch(`${API_URL}/Attendance/my-status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Update attendance status failed:", errorText);
            throw new Error(errorText || "Failed to update attendance status");
        }
    },

    // GET: today's attendance overview (for admin page)
    getTodayAttendance: async (): Promise<AttendanceOverviewItem[]> => {
        const response = await fetch(`${API_URL}/Attendance/today`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Loading today's attendance failed:", errorText);
            throw new Error(errorText || "Failed to load today's attendance");
        }

        return response.json();
    },
};
