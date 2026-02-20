import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getBookings } from "../../api/api";
import { getUser } from "../../utils/auth";

export default function StaffDashboard() {

  const user = getUser();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getBookings();

      const bookings = res.data;

      const pending = bookings.filter(
        b => b.status === "PENDING"
      ).length;

      const approved = bookings.filter(
        b => b.status === "APPROVED_BY_STAFF"
      ).length;

      const rejected = bookings.filter(
        b => b.status === "REJECTED_BY_STAFF"
      ).length;

      setStats({
        total: bookings.length,
        pending,
        approved,
        rejected
      });

    } catch {
      console.log("Failed to load stats");
    }
  };

  return (
    <Layout>

      <div className="card">
        <h2>Staff Dashboard 👨‍🏫</h2>
        <p>Welcome, <b>{user?.name}</b></p>
      </div>

      <div className="grid">

        <div className="card stat">
          <h3>Total Requests</h3>
          <p>{stats.total}</p>
        </div>

        <div className="card stat orange">
          <h3>Pending Approvals</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="card stat green">
          <h3>Approved by Staff</h3>
          <p>{stats.approved}</p>
        </div>

        <div className="card stat red">
          <h3>Rejected by Staff</h3>
          <p>{stats.rejected}</p>
        </div>

      </div>

      <div className="card">
        <h3>Quick Actions</h3>

        <div className="actions">
          <button onClick={() => window.location.href="/staff/bookings"}>
            Review Requests
          </button>

          <button onClick={() => window.location.href="/staff/resources"}>
            View Resources
          </button>
        </div>
      </div>

    </Layout>
  );
}
