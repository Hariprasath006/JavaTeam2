import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getBookings, updateBookingStatus } from "../../api/api";

export default function StaffBookings() {

  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const res = await getBookings();
    setBookings(res.data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await updateBookingStatus(id, status);
    loadBookings();
  };

  const pendingRequests = bookings.filter(b => b.status === "PENDING");

  return (
    <Layout>
      <div className="card">
        <h2>Student Requests 🎓</h2>

        {pendingRequests.length === 0 ? (
          <p>No Pending Requests</p>
        ) : (
          pendingRequests.map(b => (
            <div key={b.id} className="list-item">

              {b.user?.name} – {b.resource?.name}

              <button onClick={() =>
                updateStatus(b.id, "FACULTY_APPROVED")
              }>
                Approve
              </button>

              <button onClick={() =>
                updateStatus(b.id, "FACULTY_REJECTED")
              }>
                Reject
              </button>

            </div>
          ))
        )}
      </div>

      <div className="card">
        <h2>My Decisions ✔</h2>

        {bookings
          .filter(b =>
            b.status === "FACULTY_APPROVED" ||
            b.status === "FACULTY_REJECTED"
          )
          .map(b => (
            <div key={b.id} className="list-item">
              {b.resource?.name} – {b.status}
            </div>
          ))
        }
      </div>
    </Layout>
  );
}
