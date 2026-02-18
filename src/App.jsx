import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";


/* STUDENT */
import StudentDashboard from "./pages/user/StudentDashboard";
import StudentResources from "./pages/user/StudentResources";
import StudentBookings from "./pages/user/StudentBookings";

/* STAFF */
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffResources from "./pages/staff/StaffResources";
import StaffBookings from "./pages/staff/StaffBookings";

/* ADMIN */
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Resources from "./pages/admin/Resources";
import AdminBookings from "./pages/admin/AdminBookings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />
        {/*Signup*/}
        <Route path="/signup" element={<Signup />} />


        {/* ✅ STUDENT ROUTES 🔥 */}
        <Route path="/user" element={<StudentDashboard />} />
        <Route path="/user/resources" element={<StudentResources />} />
        <Route path="/user/bookings" element={<StudentBookings />} />

        {/* STAFF */}
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/resources" element={<StaffResources />} />
        <Route path="/staff/bookings" element={<StaffBookings />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/resources" element={<Resources />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />

      </Routes>
    </BrowserRouter>
  );
}
