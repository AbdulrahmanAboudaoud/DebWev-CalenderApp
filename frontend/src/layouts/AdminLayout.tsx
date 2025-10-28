// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/navbar/navbar-complete";

export default function AdminLayout() {
    return (
        <div>
            <AdminNavBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
