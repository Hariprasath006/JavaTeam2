import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Resources from "./pages/admin/Resources";
import Bookings from "./pages/admin/Bookings";

import UserDashboard from "./pages/user/Dashboard";
import UserResources from "./pages/user/Resources";
import MyBookings from "./pages/user/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="resources" element={<Resources />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="USER">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="resources" element={<UserResources />} />
          <Route path="bookings" element={<MyBookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
