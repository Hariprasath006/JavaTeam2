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

  return (
    <Layout>
      <div className="card">
        <h2>All Bookings</h2>

        {bookings.map(b => {

          const isPending = b.status === "PENDING";
          const isCancelReq = b.status === "CANCELLATION_REQUESTED";

          return (
            <div key={b.id} className="list-item">

              {b.user?.name} – {b.resource?.name} – {b.status}

              {isPending && (
                <>
                  <button onClick={() => updateStatus(b.id, "APPROVED")}>
                    Approve
                  </button>

                  <button onClick={() => updateStatus(b.id, "REJECTED")}>
                    Reject
                  </button>
                </>
              )}

              {isCancelReq && (
                <>
                  <button onClick={() => updateStatus(b.id, "CANCELLED")}>
                    Approve Cancellation
                  </button>

                  <button onClick={() => updateStatus(b.id, "APPROVED")}>
                    Reject Cancellation
                  </button>
                </>
              )}

            </div>
          );
        })}

      </div>
    </Layout>
  );
}
