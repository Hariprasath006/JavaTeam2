import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-3">
          <Link to="/admin" className="block hover:text-blue-400">Dashboard</Link>
          <Link to="/admin/users" className="block hover:text-blue-400">Users</Link>
          <Link to="/admin/resources" className="block hover:text-blue-400">Resources</Link>
          <Link to="/admin/bookings" className="block hover:text-blue-400">Bookings</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
