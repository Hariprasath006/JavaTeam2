import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getResources, createBooking } from "../../api/api";
import { getUser } from "../../utils/auth";

export default function StaffResources() {

  const user = getUser();
  const [resources, setResources] = useState([]);

  const loadResources = async () => {
    try {
      const res = await getResources();
      setResources(res.data);
    } catch {
      alert("Failed to load resources");
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleBooking = async (resource) => {

    if (resource.status !== "AVAILABLE") {
      alert("❌ Resource is unavailable");
      return;
    }

    const bookingDate = prompt("Enter Booking Date (YYYY-MM-DD)");
    const timeSlot = prompt("Enter Time Slot (10AM-11AM)");

    if (!bookingDate || !timeSlot) {
      alert("Booking cancelled");
      return;
    }

    try {
      await createBooking({
        userId: user.id,
        resourceId: resource.id,
        bookingDate,
        timeSlot
      });

      alert("✅ Booking Created");

      loadResources(); // refresh UI
    } catch {
      alert("❌ Slot already booked!");
    }
  };

  return (
    <Layout>

      <h2>Resources 🏫</h2>

      <div className="grid">

        {resources.map(r => (
          <div key={r.id} className="card">

            <h3>{r.name}</h3>

            <p>Type: {r.type}</p>
            <p>Capacity: {r.capacity}</p>

            <p>
              Status:
              <span className={
                r.status === "AVAILABLE"
                  ? "badge green"
                  : "badge red"
              }>
                {r.status}
              </span>
            </p>

            <button
              disabled={r.status !== "AVAILABLE"}
              onClick={() => handleBooking(r)}
            >
              {r.status === "AVAILABLE"
                ? "Book Resource"
                : "Unavailable"}
            </button>

          </div>
        ))}

      </div>

    </Layout>
  );
}
