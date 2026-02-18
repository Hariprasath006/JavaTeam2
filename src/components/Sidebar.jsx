import { useNavigate } from "react-router-dom";

export default function Sidebar({ role }) {

  const navigate = useNavigate();   // CRITICAL FIX

  const menu = {
    ADMIN: [
      { label: "Dashboard", path: "/admin" },
      { label: "Users", path: "/admin/users" },
      { label: "Resources", path: "/admin/resources" },
      { label: "Bookings", path: "/admin/bookings" }
    ],
    STAFF: [
      { label: "Dashboard", path: "/staff" },
      { label: "Resources", path: "/staff/resources" },
      { label: "Bookings", path: "/staff/bookings" }
    ],
    STUDENT: [
      { label: "Dashboard", path: "/user" },
      { label: "Resources", path: "/user/resources" },
      { label: "My Bookings", path: "/user/bookings" }
    ]
  };

  return (
    <div className="sidebar">
      <h3>Campus RMS</h3>

      {menu[role]?.map(item => (
        <div
          key={item.path}
          className="menu-item"
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
