import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getResources } from "../../api/api";

export default function StaffResources() {

  const [resources, setResources] = useState([]);

  useEffect(() => {
    getResources().then(res => setResources(res.data));
  }, []);

  return (
    <Layout>
      <h2>Resources 🏫</h2>

      {resources.map(r => (
        <div key={r.id} className="card">
          {r.name} – {r.status}
        </div>
      ))}
    </Layout>
  );
}
