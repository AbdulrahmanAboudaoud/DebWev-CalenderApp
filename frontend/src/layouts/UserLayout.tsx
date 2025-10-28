// src/layouts/UserLayout.tsx
import { Outlet } from "react-router-dom";
import UserNavBar from "../components/navbar/navbar-complete";

export default function UserLayout() {
    return (
        <div>
            <UserNavBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
