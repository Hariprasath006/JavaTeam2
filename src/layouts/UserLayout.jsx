import { Outlet, Link } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h1 className="text-xl font-bold mb-6">User Panel</h1>
        <nav className="space-y-3">
          <Link to="/user" className="block hover:text-yellow-300">Dashboard</Link>
          <Link to="/user/resources" className="block hover:text-yellow-300">Resources</Link>
          <Link to="/user/bookings" className="block hover:text-yellow-300">My Bookings</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
