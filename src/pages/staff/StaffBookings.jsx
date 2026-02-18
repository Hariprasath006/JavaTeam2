import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getBookings } from "../../api/api";
import { getUser } from "../../utils/auth";

export default function StaffBookings() {

  const user = getUser();
  const [bookings, setBookings] = useState([]);

  const formatStatus = (status) => {
    if (status === "PENDING") return "APPLIED";
    return status;
  };

  const loadBookings = async () => {
    const res = await getBookings();

    const myBookings = res.data.filter(
      b => b.userId === user.id
    );

    setBookings(myBookings);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <Layout>
      <div className="card">
        <h2>My Bookings 📚</h2>

        {bookings.length === 0 ? (
          <p>No Bookings Found</p>
        ) : (
          bookings.map(b => (
            <div key={b.id} className="list-item">

              <div>
                <b>Resource:</b> {b.resourceName || b.resourceId}
              </div>

              <div>
                <b>Date:</b> {b.bookingDate}
              </div>

              <div>
                <b>Slot:</b> {b.timeSlot}
              </div>

              <div>
                <b>Status:</b> {formatStatus(b.status)}
              </div>

            </div>
          ))
        )}

      </div>
    </Layout>
  );
}
