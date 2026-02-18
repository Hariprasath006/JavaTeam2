import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getResources, createBooking } from "../../api/api";
import { getUser } from "../../utils/auth";

export default function StudentResources() {

  const user = getUser();
  const [resources, setResources] = useState([]);

  const loadResources = async () => {
    const res = await getResources();
    setResources(res.data);
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleBooking = async (resource) => {

    if (resource.status !== "AVAILABLE") {
      alert("Resource unavailable");
      return;
    }

    const bookingDate = prompt("Enter Date (YYYY-MM-DD)");
    const timeSlot = prompt("Enter Slot");

    if (!bookingDate || !timeSlot) return;

    try {
      await createBooking({
        userId: user.id,
        resourceId: resource.id,
        bookingDate,
        timeSlot
      });

      alert("Booking created");

    } catch {
      alert("Slot conflict");
    }
  };

  return (
    <Layout>
      <div className="grid">
        {resources.map(r => (
          <div key={r.id} className="card">
            <h3>{r.name}</h3>
            <p>{r.type}</p>
            <p>{r.status}</p>

            <button
              disabled={r.status !== "AVAILABLE"}
              onClick={() => handleBooking(r)}
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
