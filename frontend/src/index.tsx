// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public
import Login from "./pages/Login/Login";

// User pages
import Home from "./pages/user/Home/Home";
import Events from "./pages/user/Events/Events";
import EventDetail from "./pages/user/Events/EventDetail";
import RoomBooking from "./pages/user/RoomBooking/RoomBooking";
import TestPage from "./pages/test_page/TestPage";

// Admin pages
import AdminHome from "./pages/admin/Home/AdminHome";
import AdminEvents from "./pages/admin/Events/AdminEvents";
import AdminEventDetail from "./pages/admin/Events/AdminEventDetail";
import AdminRoomBooking from "./pages/admin/Rooms/AdminRoomBooking";
import Attendance from "./pages/admin/Attendance/Attendance";
import Users from "./pages/admin/Users/Users";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Auth / public */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* User app */}
        <Route path="/app" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:eventId" element={<EventDetail />} />
          <Route path="room-booking" element={<RoomBooking />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="testpage" element={<TestPage />} />

        </Route>

        {/* Admin app */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/:eventId" element={<AdminEventDetail />} />
          <Route path="room-booking" element={<AdminRoomBooking />} />
          <Route path="users" element={<Users />} />
          <Route path="testpage" element={<TestPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 24 }}>404 — Page not found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
