import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getBookings } from "../../api/api";
import { getUser } from "../../utils/auth";

export default function StudentBookings() {

  const user = getUser();
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const res = await getBookings();

    const myBookings = res.data.filter(
      b => b.user?.id === user.id   // ✅ CORRECT FILTER
    );

    setBookings(myBookings);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <Layout>
      <div className="card">
        <h2>My Applications 📋</h2>

        {bookings.map(b => (
          <div key={b.id} className="list-item">

            {b.resource?.name} – {b.bookingDate} – {b.timeSlot}

            <span className="status">
              {b.status}
            </span>

          </div>
        ))}
      </div>
    </Layout>
  );
}
