import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getBookings, updateBookingStatus } from "../../api/api";

export default function AdminBookings() {

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

  const facultyApproved = bookings.filter(
    b => b.status === "FACULTY_APPROVED"
  );

  return (
    <Layout>
      <div className="card">
        <h2>Faculty Approved Requests 🏛</h2>

        {facultyApproved.length === 0 ? (
          <p>No Requests</p>
        ) : (
          facultyApproved.map(b => (
            <div key={b.id} className="list-item">

              {b.user?.name} – {b.resource?.name}

              <button onClick={() =>
                updateStatus(b.id, "ADMIN_APPROVED")
              }>
                Final Approve
              </button>

              <button onClick={() =>
                updateStatus(b.id, "ADMIN_REJECTED")
              }>
                Final Reject
              </button>

            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
