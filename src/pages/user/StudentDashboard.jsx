import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getBookings } from "../../api/api";
import { getUser } from "../../utils/auth";

export default function StudentDashboard() {

  const user = getUser();

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getBookings();

      const myBookings = res.data.filter(
        b => b.userId === user.id
      );

      const approved = myBookings.filter(
        b => b.status === "APPROVED"
      ).length;

      const pending = myBookings.filter(
        b => b.status === "PENDING"
      ).length;

      const rejected = myBookings.filter(
        b => b.status === "REJECTED"
      ).length;

      setStats({
        total: myBookings.length,
        approved,
        pending,
        rejected
      });

    } catch {
      console.log("Failed to load stats");
    }
  };

  return (
    <Layout>

      <div className="card">
        <h2>Student Dashboard 🎓</h2>
        <p>Welcome, <b>{user?.name}</b></p>
      </div>

      <div className="grid">

        <div className="card stat">
          <h3>Total Bookings</h3>
          <p>{stats.total}</p>
        </div>

        <div className="card stat green">
          <h3>Approved</h3>
          <p>{stats.approved}</p>
        </div>

        <div className="card stat orange">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="card stat red">
          <h3>Rejected</h3>
          <p>{stats.rejected}</p>
        </div>

      </div>

      <div className="card">
        <h3>Quick Actions</h3>

        <div className="actions">
          <button onClick={() => window.location.href="/student/resources"}>
            Book Resource
          </button>

          <button onClick={() => window.location.href="/student/bookings"}>
            My Bookings
          </button>
        </div>
      </div>

    </Layout>
  );
}
