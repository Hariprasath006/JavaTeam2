export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">Total Users</div>
        <div className="bg-white p-6 rounded shadow">Total Resources</div>
        <div className="bg-white p-6 rounded shadow">Total Bookings</div>
      </div>
    </div>
  );
}
